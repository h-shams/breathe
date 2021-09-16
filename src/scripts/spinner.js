import statesData from './states-data.js'
const spinner = document.querySelector('.spinner')
const spots = document.querySelectorAll('.spinner__spot')
const textContainer = document.querySelector('.spinner__content-inner')
const oldText = document.querySelector('.spinner__content-text--old')
const newText = document.querySelector('.spinner__content-text--new')

let state = null
let data = null
let inside, hold, out, all
export function setState (newState) {
  if (!statesData[newState]) {
    state = null
    setText('choose a state')
    return null
  }
  if (state === newState) {
    return
  }
  endRotate()
  state = newState
  data = statesData[newState]
  inside = data.times.in
  hold = data.times.hold
  out = data.times.out
  all = inside + hold + out
}

export function setSpinner () {
  // set spots position
  const angles = [
    0,
    (inside / all) * 360,
    ((inside + hold) / all) * 360
  ]
  spots.forEach((spot, i) => {
    const rotate = `rotate(${angles[i]}deg)`
    let transform
    if (!spot.style.transform) {
      transform = getComputedStyle(spot).transform + rotate
    } else {
      const test = /rotate\(-?\d{1,3}(\.\d+)?deg\)/
      transform = spot.style.transform.replace(test, rotate)
    }
    spot.style.transform = transform
  })

  spinner.style.setProperty('--rotate-time', all + 's')
  spinner.style.setProperty('--grow-time', Math.min(inside, out) * 0.93 + 's')

  setText('start')
}

function setText (text) {
  if (oldText.innerHTML === text) {
    return
  }
  newText.innerHTML = text
  textContainer.classList.add('spinner__content-inner--text-change')
  setTimeout(() => {
    oldText.innerHTML = text
    textContainer.classList.remove('spinner__content-inner--text-change')
  }, 250)
}

let rotateState = false
export function toggleRotate () {
  if (!data) {
    return
  }
  if (!rotateState) {
    startRotate()
  } else {
    endRotate()
  }
}

let animationFrameId = null
function startRotate () {
  let start; let count = 1
  rotateState = true
  spinner.classList.add('spinner--spin')
  function step (timestamp) {
    if (start === undefined) { start = timestamp }
    const time = (timestamp - start) / 1000
    if (time > 0 && time < inside) {
      spinner.style.setProperty('--grow-time', inside * 0.93 + 's')
      setText('breathe in')
      grow()
    } else if (inside < time && time < inside + hold) {
      setText('hold')
    } else {
      spinner.style.setProperty('--grow-time', out * 0.93 + 's')
      setText('breathe out')
      shrink()
    }
    if (time >= all) {
      start = timestamp
      count++
    }
    if (count > data.count) endRotate()
    if (rotateState) animationFrameId = requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

function endRotate () {
  cancelAnimationFrame(animationFrameId)
  spinner.style.setProperty('--grow-time', '1.5s')
  spinner.classList.remove('spinner--spin')
  rotateState = false
  shrink()
  setText('start')
}

function grow () {
  spinner.classList.add('spinner--grow')
}

function shrink () {
  spinner.classList.remove('spinner--grow')
}
