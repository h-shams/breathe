const ASSETS_LIST = self.__WB_MANIFEST // eslint-disable-line
const CACHE_NAME = 'breathe-app-main-cache' // eslint-disable-line

self.addEventListener('install', event => {
  console.log('SW: install')
})

self.addEventListener('activate', event => {
  console.log('SW: active')
})

self.addEventListener('fetch', event => {
  console.log('SW: fetch')
  event.respondWith(fetch(event.request))
})
