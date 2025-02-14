export function checkBusinessStatus(
  openingHours: Record<
    string,
    { abertura: string | null; fechamento: string | null }
  >,
) {
  const weekdays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab']
  const currentDayIndex = new Date().getDay()
  const currentDay = weekdays[currentDayIndex]

  const currentTime = new Date()
  const currentHours = currentTime.getHours()
  const currentMinutes = currentTime.getMinutes()

  const currentFormattedTime = `${currentHours.toString().padStart(2, '0')}:${currentMinutes.toString().padStart(2, '0')}`

  const dayHours = openingHours[currentDay]

  if (!dayHours || !dayHours.abertura || !dayHours.fechamento) {
    console.log('Ponto fechado hoje')
    return 'Fechado'
  }

  const { abertura, fechamento } = dayHours

  if (!abertura || !fechamento) {
    console.log('Sem horário definido para hoje')
    return 'Fechado'
  }

  const isOpen =
    currentFormattedTime >= abertura && currentFormattedTime <= fechamento

  return isOpen ? 'Aberto' : 'Fechado'
}
