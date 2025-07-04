<script setup lang="ts">
import type { ProjectTag as ProjectTagType } from '@geckobot/datasource'

import ProjectTag from '@/components/ProjectTag.vue'

interface ProjectTagListItemProps {
  selected?: boolean
  data: Pick<ProjectTagType, 'name' | 'color'>
}

interface ProjectTagListItemEvents {
  (e: 'update:selected', value: boolean): void
}

defineProps<ProjectTagListItemProps>()
defineEmits<ProjectTagListItemEvents>()
</script>

<template>
  <li class="list-row flex items-center group relative">
    <input
      type="checkbox"
      class="checkbox checkbox-primary"
      :checked="selected"
      @change="(e) => $emit('update:selected', (e.target as HTMLInputElement).checked)"
    />
    <ProjectTag :color="data.color" :label="data.name" />
  </li>
</template>
