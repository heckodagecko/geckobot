<script setup lang="tsx">
import { RouterView } from 'vue-router'

import AppNotification from '@/components/AppNotification.vue'
import { useNotifyStore } from '@/stores/notify'

const notifyStore = useNotifyStore()
</script>

<template>
  <RouterView />
  <div class="toast z-50">
    <AppNotification
      v-for="(notification, index) in notifyStore.notifications"
      :type="notification.data.type"
      :closable="true"
      :key="index"
      @close="notifyStore.removeNotification(index)"
      @mouseenter="notification.timer?.pause()"
      @mouseleave="notification.timer?.resume()"
    >
      {{ notification.data.message }}
    </AppNotification>
  </div>
</template>
