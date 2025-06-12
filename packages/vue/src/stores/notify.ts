import { defineStore } from 'pinia'
import { reactive, readonly } from 'vue'

import { Timer } from '@/utils'
import type { Notification } from '@/types'

interface TimedNotification {
  timer?: Timer
  data: Notification
}

export const useNotifyStore = defineStore('notify', () => {
  const notifications = reactive<TimedNotification[]>([])

  function notify(what: Notification, interval: number = 5000) {
    const index = notifications.push({ data: what }) - 1
    const timer = new Timer(() => remove(index), interval)
    notifications[index].timer = timer
    timer.resume()
  }

  function pause(index: number) {
    notifications[index].timer?.pause()
  }

  function resume(index: number) {
    notifications[index].timer?.resume()
  }

  function remove(index: number) {
    notifications.splice(index, 1)
  }

  return {
    notifications: readonly(notifications),
    notify,
    pause,
    resume,
    remove,
  }
})
