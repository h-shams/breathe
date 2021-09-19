import '../styles/main.scss'
import { setState, setSpinner, startRotate, endRotate } from './spinner.js'

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

const stateButtons = [...document.querySelectorAll('.state')]
stateButtons.forEach(state => {
  state.addEventListener('click', stateClickHandler)
})

let currentState = null
function stateClickHandler (event) {
  const value = event.target.dataset.value
  currentState = value
  event.target.classList.add('state--active')

  stateButtons.forEach(state => {
    if (state.dataset.value !== value) {
      state.classList.remove('state--active')
    }
  })

  setState(currentState)
  setSpinner()
}

const spinnerStartButton = document.querySelector('.spinner__content-inner')
spinnerStartButton.addEventListener('click', () => {
  startRotate()
})

const spinnerEndButton = document.querySelector('.spinner-button')
spinnerEndButton.addEventListener('click', () => {
  endRotate()
})
