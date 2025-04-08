<script setup lang="ts">
import { onMounted } from "vue";

import { useProjectsStore } from "@/stores/projects";
import ProjectDataTable from "@/components/ProjectDataTable.vue";

const projectsStore = useProjectsStore();

onMounted(() => {
  projectsStore.fetchItems();
})
</script>

<template>
  <ProjectDataTable />
</template>
