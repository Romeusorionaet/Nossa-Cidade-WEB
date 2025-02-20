import { markers } from '@/constants/markers'

const sizes = {
  large: '25px',
  medium: '20px',
  small: '8px',
}

const createCustomMarker = ({
  icon,
  size,
  name,
}: {
  icon: string
  size: string
  name: string
}) => {
  const markerElement = document.createElement('div')
  markerElement.style.fontSize = size.toString()
  markerElement.style.cursor = 'pointer'
  markerElement.style.textAlign = 'center'
  markerElement.style.lineHeight = '25px'

  const iconElement = document.createElement('div')
  iconElement.textContent = icon
  markerElement.appendChild(iconElement)

  const nameElement = document.createElement('span')
  nameElement.textContent = name
  nameElement.style.color = '#4a4a4a'
  markerElement.appendChild(nameElement)

  return markerElement
}

export function getMarkerElement({
  icon,
  size,
  name,
}: {
  icon: keyof typeof markers
  size: keyof typeof sizes
  name: string
}) {
  return createCustomMarker({ icon: markers[icon], size: sizes[size], name })
}
