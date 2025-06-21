<script setup lang="ts">
import { faker } from '@faker-js/faker'

import ProjectTagListItem from '@/components/ProjectTagListItem.vue'
import type { HexColor } from '@/types'

function randomColor() {
  return faker.color.rgb()
}

function randomLabel() {
  return faker.lorem.word()
}
</script>

<template>
  <ul class="list">
    <li class="p-4 pb-2 text-sm font-bold opacity-60 tracking-wide">Tags</li>
    <ProjectTagListItem
      v-for="index in 10"
      :data="{ color: randomColor() as HexColor, label: randomLabel() }"
      :key="index"
    />
  </ul>
</template>
