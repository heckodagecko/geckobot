<script setup lang="ts">
import type { HexColor } from '@geckobot/datasource'

interface ProjectTagProps {
  color: HexColor
  label: string
}

defineProps<ProjectTagProps>()
</script>

<template>
  <div class="badge badge-soft overflow-hidden">
    <div class="status" :style="{ backgroundColor: color }"></div>
    <div class="truncate">{{ label }}</div>
  </div>
</template>
