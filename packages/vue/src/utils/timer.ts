export class Timer {
  readonly callback: () => unknown
  readonly delay: number

  timerId: number | null
  started: number
  remaining: number

  constructor(callback: () => unknown, delay: number) {
    this.timerId = null
    this.started = performance.now()
    this.callback = callback
    this.remaining = this.delay = delay
  }

  resume() {
    if (this.timerId) return

    this.started = performance.now()

    this.timerId = setTimeout(() => {
      this.callback()
      this.timerId = null
      this.remaining = this.delay
    }, this.remaining)
  }

  pause() {
    if (!this.timerId) return

    clearTimeout(this.timerId)
    this.timerId = null

    this.remaining -= performance.now() - this.started
  }
}
