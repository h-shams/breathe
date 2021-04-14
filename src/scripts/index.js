import '../styles/main.scss'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.bundle.js').then(registration => {
    console.log('service worker successfully registred')
  }).catch(error => {
    console.log('error while regitering service worker')
    console.log(error)
  })
} else {
  console.log('service worker is not available')
}

console.log('INDEX.JS')
