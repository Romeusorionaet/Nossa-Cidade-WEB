const markers = {
  click: '📍',
  store: '🏬',
  user: '👤',
  greenPoint: '🟢',
}

const sizes = {
  small: '15px',
  medium: '25px',
  big: '30px',
}

const createCustomMarker = ({ icon, size }: { icon: string; size: string }) => {
  const markerElement = document.createElement('div')
  markerElement.style.fontSize = size.toString()
  markerElement.textContent = icon
  markerElement.style.cursor = 'pointer'
  markerElement.style.textAlign = 'center'
  markerElement.style.lineHeight = '25px'
  return markerElement
}

export function getMarkerElement({
  icon,
  size,
}: {
  icon: keyof typeof markers
  size: keyof typeof sizes
}) {
  return createCustomMarker({ icon: markers[icon], size: sizes[size] })
}
