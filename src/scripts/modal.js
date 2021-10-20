const overlay = document.querySelector('.overlay')

export function openModal (modal) {
  const btn = modal.querySelector('.modal__button')
  const modalOverlay = modal.querySelector('.modal__overlay')
  const body = modal.querySelector('.modal__body')
  btn.addEventListener('click', btnClickHandler)
  body.addEventListener('scroll', scrollHandler)
  setModalShadow(modalOverlay, body)
  modal.classList.add('modal--open')
  overlay.classList.add('overlay--open')
}

function closeModal (modal) {
  const btn = modal.querySelector('.modal__button')
  const body = modal.querySelector('.modal__body')
  btn.removeEventListener('click', btnClickHandler)
  body.removeEventListener('scroll', scrollHandler)
  modal.classList.remove('modal--open')
  overlay.classList.remove('overlay--open')
}

function btnClickHandler (event) {
  const modal = event.target.parentElement.parentElement
  closeModal(modal)
}

function scrollHandler (event) {
  const body = event.target
  const overlay = body.parentElement
  setModalShadow(overlay, body)
}

function setModalShadow (overlay, body) {
  const scrollMax = body.scrollHeight - body.clientHeight
  const scroll = body.scrollTop
  const offset = scrollMax < 50 ? scrollMax / 2 : 50
  const style = overlay.style

  if (scrollMax === 0) {
    return
  }

  if (scroll < offset) {
    style.setProperty('--top-opacity', scroll / offset)
    if (style.getPropertyValue('--bottom-opacity') !== '1') {
      style.setProperty('--bottom-opacity', 1)
    }
  } else if (scroll > scrollMax - offset) {
    style.setProperty('--bottom-opacity', (-scroll + scrollMax) / offset)
    if (style.getPropertyValue('--top-opacity') !== '1') {
      style.setProperty('--top-opacity', 1)
    }
  } else {
    if (style.getPropertyValue('--bottom-opacity') !== '1') {
      style.setProperty('--bottom-opacity', 1)
    }
    if (style.getPropertyValue('--top-opacity') !== '1') {
      style.setProperty('--top-opacity', 1)
    }
  }
}
