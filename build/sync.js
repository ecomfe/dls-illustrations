import https from 'https'

const PACKAGES = [
  'dls-graphics',
  'dls-illustrations-react',
  'dls-illustrations-vue',
  'dls-illustrations-vue-3'
]

async function syncPackage (name) {
  const options = {
    hostname: 'npmmirror.com',
    path: `/sync/${name}/?sync_upstream=true`,
    method: 'PUT'
  }

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.on('data', () => {})
      res.on('end', () => {
        resolve()
      })
    })
    req.on('error', (e) => {
      reject(e)
    })
    req.end()
  })
}

Promise.all(PACKAGES.map(syncPackage)).then(() => {
  console.log('Sync request sent for all packages.')
}).catch((e) => {
  console.error(e)
})
