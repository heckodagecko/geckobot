<script setup lang="ts">
import type { HexColor } from '@geckobot/datasource'

import ProjectTag from '@/components/ProjectTag.vue'

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
