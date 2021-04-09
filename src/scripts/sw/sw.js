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
  const requestURL = event.request.url === ENV.baseUrl
    ? ENV.baseUrl + 'index.html'
    : event.request.url

  if (ENV.isDev === true) {
    event.respondWith(fetch(requestURL))
  } else {
    event.respondWith(responseFromCache(requestURL, CACHE_NAME, ASSETS_LIST))
  }
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
  const urlsList = assetsList.map(asset => asset.url)

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

function urlSplit (url) {
  return url.slice(ENV.baseUrl.length)
}

function responseFromCache (requestURL, cacheName, assetsList) {
  return caches.open(cacheName).then(cache => {
    return cache.match(requestURL).then(response => {
      return response || fetch(requestURL).then(response => {
        // if response status was OK, and request url was in assets list,
        // then cache response
        if (response.status.toString().match(/2\d{2}/)) {
          const urlsList = assetsList.map(asset => asset.url)
          if (urlsList.includes(urlSplit(requestURL))) {
            cache.put(requestURL, response.clone())
          }
        }
        return response
      })
    })
  })
}
