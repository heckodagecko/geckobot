<script setup lang="ts">
import {
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
  faTriangleExclamation,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed } from 'vue'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

import { NotificationType } from '@/types'

interface AppNotificationProps {
  closable?: boolean
  progress?: number
  type?: NotificationType
}

interface AppNotificationEvents {
  (event: 'close'): void
  (event: 'mouseenter'): void
  (event: 'mouseleave'): void
}

const props = defineProps<AppNotificationProps>()

defineEmits<AppNotificationEvents>()

interface StyleMap {
  icon: IconDefinition | null
  alert: string
}

const stylesMap: Record<NotificationType, StyleMap> = {
  [NotificationType.Default]: {
    icon: null,
    alert: '',
  },
  [NotificationType.Error]: {
    icon: faCircleXmark,
    alert: 'alert-error',
  },
  [NotificationType.Info]: {
    icon: faCircleInfo,
    alert: 'alert-info',
  },
  [NotificationType.Success]: {
    icon: faCircleCheck,
    alert: 'alert-success',
  },
  [NotificationType.Warning]: {
    icon: faTriangleExclamation,
    alert: 'alert-warning',
  },
}

const icon = computed(() => {
  if (!props.type) return null
  return stylesMap[props.type].icon
})

const alertStyle = computed(() => {
  if (!props.type) return ''
  return stylesMap[props.type].alert
})
</script>

<template>
  <div
    role="alert"
    class="alert alert-vertical sm:alert-horizontal overflow-clip opacity-75 hover:opacity-100 transition ease-in-out"
    :class="[alertStyle]"
    @mouseenter="$emit('mouseenter')"
    @mouseleave="$emit('mouseleave')"
  >
    <FontAwesomeIcon v-if="icon" :icon="icon" class="stroke-info h-6 w-6 shrink-0" />
    <div>
      <slot></slot>
    </div>
    <button v-if="closable" class="btn btn-xs btn-ghost btn-circle" @click="$emit('close')">
      <FontAwesomeIcon :icon="faXmark" />
    </button>
  </div>
</template>
