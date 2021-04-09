const ASSETS_LIST = self.__WB_MANIFEST // eslint-disable-line
const CACHE_NAME = 'breathe-app-main-cache' // eslint-disable-line
const ENV = __ENV__

self.addEventListener('install', event => {
  console.log('SW: install')
  event.waitUntil(precache(ASSETS_LIST, CACHE_NAME))
})

self.addEventListener('activate', event => {
  console.log('SW: activate')
  event.waitUntil(deleteOldAssets(ASSETS_LIST, CACHE_NAME))
})

self.addEventListener('fetch', event => {
  console.log('SW: fetch')
  event.respondWith(fetch(event.request))
})

function precache (assetsList, cacheName) {
  return caches.open(cacheName).then(cache => {
    const urlsList = assetsList.map(asset => {
      return asset.url
    })

    return cache.addAll(urlsList)
      .then(value => {
        console.log(`SW: precache ${urlsList.length} entries in "${cacheName}"`)
      })
      .catch(error => console.log(error))
  })
}

function deleteOldAssets (assetsList, cacheName) {
  const urlsList = assetsList.map(asset => {
    return asset.url
  })

  return caches.open(cacheName).then(cache => {
    return cache.keys().then(assetsList => {
      return Promise.all(
        assetsList.map(asset => {
          const relativeUrl = urlSplit(asset.url)
          if (!urlsList.includes(relativeUrl)) {
            console.log(`SW: delete "${relativeUrl}"`)
            return cache.delete(relativeUrl)
          }
          return false
        })
      )
    })
  })
}

