import fs from 'fs'
import { resolve, basename, extname } from 'path'
import mkdirp from 'mkdirp'
import rimraf from 'rimraf'
import { compile } from 'ejs'
import stringify from 'stringify-object'
import commentMark from 'comment-mark'
import { process } from './svg'
import { camelCase, upperFirst } from '../utils'

const { readdir, readFile, writeFile } = fs.promises

const RAW_DIR = resolve(__dirname, '../../raw')
const DATA_PACKAGE_DIST_DIR = resolve(
  __dirname,
  '../../packages/dls-graphics/dist'
)
const DATA_PACKAGE_DIST_SEPARATE_DIR = resolve(
  __dirname,
  '../../packages/dls-graphics/dist/separate'
)
const README_PATH = resolve(__dirname, '../../packages/dls-graphics/README.md')
const ENTRY_MODULE = resolve(DATA_PACKAGE_DIST_DIR, 'index.js')
const TYPE_ENTRY_MODULE = resolve(DATA_PACKAGE_DIST_DIR, 'index.d.ts')
const EXPORT_TPL = resolve(__dirname, './export.ejs')
const TYPE_EXPORT_TPL = resolve(__dirname, './type-export.ejs')
const TTPE_INDEX_TPL = resolve(__dirname, './type-index.ejs')
const BASE_PREVIEW_URL =
  'https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw'

function clearDir(dir) {
  rimraf.sync(dir)
  mkdirp.sync(dir)
}

async function build() {
  clearDir(DATA_PACKAGE_DIST_DIR)
  clearDir(DATA_PACKAGE_DIST_SEPARATE_DIR)

  const exportStatements = []
  const typeExportStatements = []
  const graphs = []
  const renderExport = compile(await readFile(EXPORT_TPL, 'utf8'))
  const renderTypeExport = compile(await readFile(TYPE_EXPORT_TPL, 'utf8'))
  const renderTypeIndex = compile(await readFile(TTPE_INDEX_TPL, 'utf8'))
  const categories = (await readdir(RAW_DIR)).filter((c) => !c.startsWith('.'))

  const files = await Promise.all(
    categories.map(async (category) => {
      const svgs = await readdir(resolve(RAW_DIR, category))
      return svgs
        .filter((svg) => !svg.startsWith('.'))
        .map((svg) => ({
          file: resolve(RAW_DIR, category, svg),
          category,
        }))
    })
  )

  await Promise.all(
    files.flat().map(async ({ file, category }) => {
      const content = await readFile(file, 'utf8')

      const { data: dataSingle } = await processContent(file, content, {
        extractCss: false,
      })
      const { data: dataSeparate, css } = await processContent(file, content, {
        extractCss: true,
      })

      const variable = toVar(file)
      graphs.push({
        file,
        fileName: basename(file),
        variable,
        category,
      })
      exportStatements.push(
        renderExport({
          variable,
          all: stringify(dataSingle),
          data: stringify(dataSeparate),
          css: stringify(css || ''),
        })
      )
      typeExportStatements.push(renderTypeExport({ variable }))
    })
  )

  assertUnique(graphs)

  await writeFile(ENTRY_MODULE, exportStatements.join('\n'), 'utf8')
  await writeFile(
    TYPE_ENTRY_MODULE,
    renderTypeIndex({
      exports: typeExportStatements.join('\n'),
    }),
    'utf8'
  )

  const readme = await readFile(README_PATH, 'utf8')
  await writeFile(
    README_PATH,
    commentMark(readme, {
      assets: `\n${toDoc(graphs)}\n`,
    })
  )

  console.log('Build data complete.')
}

async function processContent(file, content, { extractCss }) {
  const result = await process(content, { extractCss })
  const { svg, css } = result
  const base = basename(file, extname(file))
  const outputDir = extractCss
    ? DATA_PACKAGE_DIST_SEPARATE_DIR
    : DATA_PACKAGE_DIST_DIR
  const outputSvgFile = resolve(outputDir, `${base}.svg`)
  const outputCssFile = resolve(outputDir, `${base}.css`)
  await writeFile(outputSvgFile, svg, 'utf8')
  if (extractCss) {
    await writeFile(outputCssFile, css || '', 'utf8')
  }

  return result
}

function toVar(file) {
  return camelCase(basename(file, extname(file)))
}

function toDoc(graphs) {
  const categories = {
    hero: [],
    spot: [],
    misc: [],
    deprecated: [],
  }

  graphs.forEach((graph) => {
    const { category } = graph
    categories[category].push(graph)
  })

  return Object.keys(categories)
    .map((category) => {
      const graphs = categories[category]
      const graphContents = graphs
        .sort((a, b) => (a.file >= b.file ? 1 : -1))
        .map(
          ({ fileName, variable }) => `* **\`${variable}\`** (${fileName})

  ![${variable}](${`${BASE_PREVIEW_URL}/${category}/${fileName}`})
`
        )
        .join('\n')

      return `#### ${upperFirst(camelCase(category))}\n\n${graphContents}`
    })
    .join('\n')
}

function assertUnique(graphs) {
  const map = new Map()
  graphs.forEach(({ file }) => {
    const name = basename(file)
    if (map.has(name)) {
      throw new Error(`Duplicate file:\n- ${file}\n- ${map.get(name)}`)
    }
    map.set(name, file)
  })
}

export default build
