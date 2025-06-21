<script setup lang="ts">
import ProjectTag from '@/components/ProjectTag.vue'
import type { HexColor } from '@/types'

defineProps<{
  data: {
    color: HexColor
    label: string
  }
}>()
</script>

<template>
  <li class="list-row flex items-center group relative">
    <input type="checkbox" class="checkbox checkbox-primary" />
    <ProjectTag :color="data.color" :label="data.label" />
  </li>
</template>
