export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.substring(1)
}

export function toReadable(name: string) {
  var words = (name.match(/[A-Za-z][a-z]*/g) as string[]) || []

  words[0] = capitalize(words[0])

  for (let i = 1; i < words.length; i++) {
    words[i] = words[i].toLowerCase()
  }

  return words.join(' ')
}

export function middleSequence(middle: number, count: number, min: number, max: number) {
  const sequence = []
  for (let i = middle - count; i <= middle + count; i++) {
    if (i >= min && i <= max) {
      sequence.push(i)
    }
  }
  return sequence
}
