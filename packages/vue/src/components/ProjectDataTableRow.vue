<script setup lang="ts">
import { UseTimeAgo } from '@vueuse/components'
import type { Project } from '@geckobot/types'

defineProps<{
  modelValue: boolean
  data: Project
}>()
</script>

<template>
  <tr :class="{ 'bg-base-300': modelValue, 'hover:bg-base-300': !modelValue }">
    <td>
      <input
        type="checkbox"
        class="checkbox checkbox-primary"
        :checked="modelValue"
        @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      />
    </td>
    <td>{{ data.name }}</td>
    <td>
      <UseTimeAgo
        v-if="data.startedAt != null"
        v-slot="{ timeAgo }"
        :time="new Date(data.startedAt)"
      >
        {{ timeAgo }}
      </UseTimeAgo>
    </td>
    <td>
      <UseTimeAgo
        v-if="data.createdAt != null"
        v-slot="{ timeAgo }"
        :time="new Date(data.createdAt)"
      >
        {{ timeAgo }}
      </UseTimeAgo>
    </td>
    <td>
      <UseTimeAgo
        v-if="data.updatedAt != null"
        v-slot="{ timeAgo }"
        :time="new Date(data.updatedAt)"
      >
        {{ timeAgo }}
      </UseTimeAgo>
    </td>
    <td v-if="$slots.default">
      <slot></slot>
    </td>
  </tr>
</template>
