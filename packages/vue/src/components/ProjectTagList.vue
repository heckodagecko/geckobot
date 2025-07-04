<script setup lang="ts">
import ProjectTagListItem from '@/components/ProjectTagListItem.vue'
import { useProjectsStore } from '@/stores/projects'
import { useProjectTagsStore } from '@/stores/project-tags'
import type { ProjectTag } from '@geckobot/datasource'

const projectsStore = useProjectsStore()
const projectTagsStore = useProjectTagsStore()

function handleSelected(tagId: ProjectTag['id'], value: boolean) {
  if (value) {
    projectsStore.addTag(tagId)
  } else {
    projectsStore.removeTag(tagId)
  }
}
</script>

<template>
  <ul class="list">
    <li class="p-4 pb-2 text-sm font-bold opacity-60 tracking-wide">Tags</li>
    <li v-if="projectTagsStore.loading" class="list-row">
      <div class="text-center">
        <span class="loading loading-ring loading-lg"></span>
      </div>
    </li>
    <li v-else-if="projectTagsStore.items.length === 0" class="list-row">No tags.</li>
    <template v-else>
      <ProjectTagListItem
        v-for="({ id, name, color }, index) in projectTagsStore.items"
        :selected="projectsStore.hasTags.includes(id)"
        :data="{ name, color }"
        :key="index"
        @update:selected="(value) => handleSelected(id, value)"
      />
    </template>
  </ul>
</template>
