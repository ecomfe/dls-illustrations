import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'
import rimraf from 'rimraf'
import { compile } from 'ejs'
import { camelCase, upperFirst } from '../utils'
import commentMark from 'comment-mark'

function readFile(...parts) {
  return fs.readFileSync(path.resolve(__dirname, ...parts), 'utf-8')
}

function writeFile(content, ...parts) {
  return fs.writeFileSync(path.resolve(__dirname, ...parts), content, 'utf-8')
}

const { readdir } = fs.promises

const SVG_PATTERN = /^(.+)\.svg$/
const BASE_PREVIEW_URL =
  'https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw'

const COMPONENT_TPL = readFile('./component.ejs')
const EXPORT_TPL = readFile('./export.ejs')

const renderComponent = compile(COMPONENT_TPL)
const renderExport = compile(EXPORT_TPL)

const VENDOR_PACKS = [
  'dls-illustrations-react',
  'dls-illustrations-vue',
  'dls-illustrations-vue-3',
]

const TYPES_REACT_INDEX_TPL = readFile('./react-type-index.ejs')
const TYPES_REACT_TPL = readFile('./react-type.ejs')
const TYPES_VUE_INDEX_TPL = readFile('./vue-type-index.ejs')
const TYPES_VUE_TPL = readFile('./vue-type.ejs')

const TYPINGS_TPL_MAP = {
  'dls-illustrations-react': [TYPES_REACT_INDEX_TPL, TYPES_REACT_TPL],
  'dls-illustrations-vue': [TYPES_VUE_INDEX_TPL, TYPES_VUE_TPL],
  'dls-illustrations-vue-3': [TYPES_VUE_INDEX_TPL, TYPES_VUE_TPL],
}

function getPackDir(...parts) {
  return path.resolve(__dirname, '../../packages', ...parts)
}

const RAW_DIR = path.resolve(__dirname, '../../raw')

function clearDir(dir) {
  rimraf.sync(dir)
  mkdirp.sync(dir)
}

async function getIllustrations() {
  const categories = await readdir(RAW_DIR)
  const illustrations = await Promise.all(
    categories
      .filter((category) => !category.startsWith('.'))
      .map(async (category) => {
        const categoryDir = path.join(RAW_DIR, category)
        const svgs = await readdir(categoryDir)
        return svgs
          .filter((svg) => SVG_PATTERN.test(svg))
          .map((svg) => ({
            slug: svg.replace(SVG_PATTERN, '$1'),
            category,
          }))
      })
  )

  return illustrations.flat()
}

async function build() {
  VENDOR_PACKS.forEach((pack) => {
    const illustrationDir = getPackDir(pack, 'src/illustrations')
    clearDir(illustrationDir)
  })

  const illustrations = await Promise.all(
    (
      await getIllustrations()
    ).map(async ({ slug, category }) => {
      const name = camelCase(slug)
      const Name = upperFirst(name)

      const tplData = {
        name,
        Name,
      }

      const componentCode = renderComponent(tplData)

      VENDOR_PACKS.forEach((pack) => {
        const illustrationDir = getPackDir(pack, 'src/illustrations')
        writeFile(componentCode, illustrationDir, `${Name}.js`)
      })

      return { slug, name, Name, category }
    })
  )

  const index =
    illustrations.map((data) => renderExport(data)).join('') +
    `export { createSVG } from './core'\n`

  const assets = toDoc(illustrations)

  VENDOR_PACKS.forEach((pack) => {
    const packDir = getPackDir(pack)
    writeFile(index, packDir, 'src/index.js')

    const [typesIndexTpl, typesTpl] = TYPINGS_TPL_MAP[pack]
    const renderTypesIndex = compile(typesIndexTpl)
    const renderTypes = compile(typesTpl)
    const types = illustrations
      .map(({ Name, category }) =>
        renderTypes({
          Name,
          annotations: category === 'deprecated' ? '/** @deprecated */\n' : '',
        })
      )
      .join('')
    const typesIndex = renderTypesIndex({ exports: types })
    writeFile(typesIndex, packDir, 'dist/index.d.ts')

    const readmeFile = getPackDir(pack, 'README.md')
    const readme = fs.readFileSync(readmeFile, 'utf8')
    writeFile(commentMark(readme, { assets }), readmeFile)
  })

  console.log('Build vendors complete.')
}

function toDoc(illustrations) {
  const cols = 3

  const categories = {
    hero: [],
    spot: [],
    misc: [],
    deprecated: [],
  }

  illustrations.forEach((illustration) => {
    const { category } = illustration
    if (!categories[category]) {
      categories[category] = []
    }
    categories[category].push(illustration)
  })

  return Object.keys(categories)
    .map((category) => {
      const illustrations = categories[category]

      const items = illustrations.sort((a, b) => (a.Name >= b.Name ? 1 : -1))

      const rows = Array.from({ length: Math.ceil(items.length / cols) })
        .map((_, i) => {
          return Array.from({ length: cols })
            .map((_, j) => items[i * cols + j])
            .map((item) =>
              item
                ? `<td align="center"><img src="${`${BASE_PREVIEW_URL}/${item.category}/${item.slug}.svg`}"/><br/><sub>Illustration${
                    item.Name
                  }</sub></td>`
                : i > 0
                ? '<td></td>'
                : ''
            )
            .join('')
        })
        .map((row) => `<tr>${row}</tr>`)
        .join('')

      return `### ${upperFirst(camelCase(category))}\n\n<table>${rows}</table>`
    })
    .join('\n\n')
}

export default build
