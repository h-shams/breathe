const overlay = document.querySelector('.overlay')

export function openModal (modal) {
  const btn = modal.querySelector('.modal__button')
  const body = modal.querySelector('.modal__body')
  btn.addEventListener('click', btnClickHandler)
  modal.classList.add('modal--open')
  overlay.classList.add('overlay--open')
}

function closeModal (modal) {
  const btn = modal.querySelector('.modal__button')
  const body = modal.querySelector('.modal__body')
  btn.removeEventListener('click', btnClickHandler)
  modal.classList.remove('modal--open')
  overlay.classList.remove('overlay--open')
}

function btnClickHandler (event) {
  const modal = event.target.parentElement.parentElement
  closeModal(modal)
}

