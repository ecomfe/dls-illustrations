import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'
import rimraf from 'rimraf'
import { compile } from 'ejs'
import { camelCase, upperFirst } from '../utils'
import commentMark from 'comment-mark'

const { readdir } = fs.promises

const SVG_PATTERN = /^(.+)\.svg$/
const BASE_PREVIEW_URL =
  'https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/'

const COMPONENT_TPL = fs.readFileSync(
  path.resolve(__dirname, './component.ejs'),
  'utf8'
)
const EXPORT_TPL = fs.readFileSync(
  path.resolve(__dirname, './export.ejs'),
  'utf8'
)
const renderComponent = compile(COMPONENT_TPL)
const renderExport = compile(EXPORT_TPL)

const VENDOR_PACKS = [
  'dls-illustrations-react',
  'dls-illustrations-vue',
  'dls-illustrations-vue-3',
]

function getPackDir(name, ...rest) {
  return path.resolve(__dirname, `../../packages/${name}`, ...rest)
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
    const illustrationDir = path.join(getPackDir(pack), 'src/illustrations')
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
        const illustrationDir = path.join(getPackDir(pack), 'src/illustrations')
        fs.writeFileSync(
          path.join(illustrationDir, `${Name}.js`),
          componentCode,
          'utf8'
        )
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
    fs.writeFileSync(path.join(packDir, 'src/index.js'), index, 'utf8')

    const readmeFile = getPackDir(pack, 'README.md')
    const readme = fs.readFileSync(readmeFile, 'utf8')
    fs.writeFileSync(readmeFile, commentMark(readme, { assets }))
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
                ? `<td align="center"><img src="${
                    BASE_PREVIEW_URL + item.slug + '.svg'
                  }"/><br/><sub>Illustration${item.Name}</sub></td>`
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
