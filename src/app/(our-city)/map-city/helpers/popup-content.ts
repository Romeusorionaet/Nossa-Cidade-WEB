interface Props {
  name: string
  status: string
  id: string
}

export function popupContent({ name, status, id }: Props) {
  const popupContent = document.createElement('div')
  popupContent.classList.add('popup-container')

  const textElement = document.createElement('p')
  textElement.textContent = `${name} - ${status}`
  textElement.classList.add('text-black', 'text-xs')

  const button = document.createElement('button')
  button.textContent = '➕'
  button.classList.add('text-black')

  const destinationUrl = `/business-point/details/${id}`
  button.addEventListener('click', () => {
    window.location.href = destinationUrl
  })

  popupContent.appendChild(textElement)
  popupContent.appendChild(button)

  return popupContent
}
