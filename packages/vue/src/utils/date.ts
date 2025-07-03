export function getLocalTimezoneOffset(date = new Date()) {
  const offset = date.getTimezoneOffset()
  const sign = offset > 0 ? '-' : '+'
  const absOffset = Math.abs(offset)
  const hours = String(Math.floor(absOffset / 60)).padStart(2, '0')
  const minutes = String(absOffset % 60).padStart(2, '0')

  return `${sign}${hours}:${minutes}`
}

export function getLocalISODateTime(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0')
  const tzOffset = getLocalTimezoneOffset(date)

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${tzOffset}`
}
