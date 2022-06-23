import buildData from './data'
import buildVendors from './vendors'

async function build() {
  const start = Date.now()

  await buildData()
  await buildVendors()

  console.log(`Build complete in ${Date.now() - start}ms.`)
}

build()
