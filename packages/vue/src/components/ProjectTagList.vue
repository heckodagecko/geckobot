<script setup lang="ts">
import ProjectTagListItem from '@/components/ProjectTagListItem.vue'
import { useProjectTagsStore } from '@/stores/project-tags'

const projectTagsStore = useProjectTagsStore()
</script>

<template>
  <ul class="list">
    <li class="p-4 pb-2 text-sm font-bold opacity-60 tracking-wide">Tags</li>
    <li v-if="projectTagsStore.loading" class="list-row">
      <div class="text-center">
        <span class="loading loading-ring loading-lg"></span>
      </div>
    </li>
    <li v-else-if="projectTagsStore.items.length === 0" class="list-row">No tags found.</li>
    <template v-else>
      <ProjectTagListItem
        v-for="({ name: label, color }, index) in projectTagsStore.items"
        :data="{ label, color }"
        :key="index"
      />
    </template>
  </ul>
</template>
