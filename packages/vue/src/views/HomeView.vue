<script setup lang="ts">
import { onMounted } from 'vue'

import { useProjectsStore } from '@/stores/projects'
import ProjectDataTable from '@/components/ProjectDataTable.vue'

const projectsStore = useProjectsStore()

onMounted(() => {
  projectsStore.fetchItems()
})
</script>

<template>
  <div class="container mx-auto px-4">
    <ProjectDataTable />
  </div>
</template>
