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

const overlay = document.querySelector('.overlay')
const modlasList = overlay.querySelectorAll('.modal')
modlasList.forEach(modal => {
  const btn = modal.querySelector('.modal__button')
  btn.addEventListener('click', () => modalToggle(modal, 'close'))
})

function modalToggle (modal, state) {
  switch (state) {
    case 'open':
      console.log('open')
      modal.classList.add('modal--open')
      overlay.classList.add('overlay--open')
      break
    case 'close':
      modal.classList.remove('modal--open')
      overlay.classList.remove('overlay--open')
      break
  }
}
