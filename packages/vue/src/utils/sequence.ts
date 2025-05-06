export function middleSequence(middle: number, count: number, min: number, max: number) {
  const sequence = []
  for (let i = middle - count; i <= middle + count; i++) {
    if (i >= min && i <= max) {
      sequence.push(i)
    }
  }
  return sequence
}
