import fs from 'fs'
import { resolve, basename, extname } from 'path'
import mkdirp from 'mkdirp'
import rimraf from 'rimraf'
import { compile } from 'ejs'
import stringify from 'stringify-object'
import commentMark from 'comment-mark'
import { process } from './svg'
import { camelCase } from '../utils'

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
const EXPORT_TPL = resolve(__dirname, './export.ejs')
const BASE_PREVIEW_URL =
  'https://raw.githubusercontent.com/ecomfe/dls-illustrations/master/raw/'

function clearDir(dir) {
  rimraf.sync(dir)
  mkdirp.sync(dir)
}

async function build() {
  clearDir(DATA_PACKAGE_DIST_DIR)
  clearDir(DATA_PACKAGE_DIST_SEPARATE_DIR)

  const exportStatements = []
  const graphs = []
  const renderExport = compile(await readFile(EXPORT_TPL, 'utf8'))
  const files = await readdir(RAW_DIR)

  await Promise.all(
    files.map(async (file) => {
      const inputFile = resolve(RAW_DIR, file)
      const content = await readFile(inputFile, 'utf8')

      const { data: dataSingle } = await processContent(file, content, {
        extractCss: false,
      })
      const { data: dataSeparate, css } = await processContent(file, content, {
        extractCss: true,
      })

      const variable = toVar(file)
      graphs.push({
        file,
        variable,
      })
      exportStatements.push(
        renderExport({
          variable,
          all: stringify(dataSingle),
          data: stringify(dataSeparate),
          css: stringify(css || ''),
        })
      )
    })
  )

  await writeFile(ENTRY_MODULE, exportStatements.join('\n'), 'utf8')

  const readme = await readFile(README_PATH, 'utf8')
  await writeFile(
    README_PATH,
    commentMark(readme, {
      assets: `\n${toDoc(graphs)}\n`
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
  return graphs
    .sort((a, b) => (a.file >= b.file ? 1 : -1))
    .map(
      ({ file, variable }) => `* **\`${variable}\`** (${file})

  ![${variable}](${BASE_PREVIEW_URL + file})
`
    )
    .join('\n')
}

export default build
