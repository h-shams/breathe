import statesData from './states-data.js'
const spinner = document.querySelector('.spinner')
const spots = document.querySelectorAll('.spinner__spot')
const textContainer = document.querySelector('.spinner__content-inner')
const oldText = document.querySelector('.spinner__content-text--old')
const newText = document.querySelector('.spinner__content-text--new')
const timer = document.querySelector('.timer')
const buttonWrapper = document.querySelector('.spinner-button-wrapper')
const statesSection = document.querySelector('.states-section')

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

  const previusAngles = [
    0,
    Number.parseFloat(spinner.style.getPropertyValue('--spot1-angle')),
    Number.parseFloat(spinner.style.getPropertyValue('--spot2-angle'))
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

  // change border gradient
  const isAnglesUnchanged =
    previusAngles.every((prevAngle, i) => prevAngle === angles[i])

  if (!isAnglesUnchanged) {
    setBoarderGradients(angles)
  }

  spinner.style.setProperty('--rotate-time', all + 's')
  spinner.style.setProperty('--grow-time', Math.min(inside, out) * 0.93 + 's')

  setText('start')
  setTimer(all * data.count)
}

function setBoarderGradients (angles) {
  spinner.classList.add('spinner--border-animation')
  setTimeout(() => {
    spinner.style.setProperty('--spot1-angle', angles[1] + 'deg')
    spinner.style.setProperty('--spot2-angle', angles[2] + 'deg')
    setTimeout(() => {
      spinner.classList.remove('spinner--border-animation')
    }, 500)
  }, 500)
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

function setTimer (timeInSeconds) {
  let minutes = Math.floor(timeInSeconds / 60)
  if (minutes < 10) minutes = '0' + minutes
  let seconds = Math.floor(timeInSeconds) % 60
  if (seconds < 10) seconds = '0' + seconds
  const timeString = `PT${minutes}M${seconds}S`
  timer.setAttribute('datetime', timeString)
  timer.innerHTML = `${minutes}:${seconds}`
}

let rotateState = false
let animationFrameId = null
export function startRotate () {
  if (!data) return
  if (rotateState) return
  let loopStart
  let start
  let count = 1
  rotateState = true
  spinner.classList.add('spinner--spin')
  // setTimer(all * data.count)
  bottonWrapperControl('open')
  statesSectionControl('hidden')

  function step (timestamp) {
    if (loopStart === undefined) { loopStart = timestamp }
    if (start === undefined) { start = timestamp }
    const time = (timestamp - loopStart) / 1000
    const totalTime = Math.floor((timestamp - start) / 1000)
    const remainingTime = Math.floor(all * data.count - totalTime)
    setTimer(remainingTime)
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
      loopStart = timestamp
      count++
    }
    if (count > data.count) endRotate()
    if (rotateState) animationFrameId = requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export function endRotate () {
  cancelAnimationFrame(animationFrameId)
  spinner.style.setProperty('--grow-time', '1.5s')
  spinner.classList.remove('spinner--spin')
  rotateState = false
  shrink()
  setText('start')
  bottonWrapperControl('close')
  statesSectionControl('visible')
}

function grow () {
  spinner.classList.add('spinner--grow')
}

function shrink () {
  spinner.classList.remove('spinner--grow')
}

function bottonWrapperControl (state) {
  switch (state) {
    case 'open':
      buttonWrapper.classList.add('spinner-button-wrapper--expand')
      break
    case 'close':
      buttonWrapper.classList.remove('spinner-button-wrapper--expand')
      break
  }
}

function statesSectionControl (state) {
  switch (state) {
    case 'hidden':
      statesSection.classList.add('states-section--hidden')
      break
    case 'visible':
      statesSection.classList.remove('states-section--hidden')
      break
  }
}
