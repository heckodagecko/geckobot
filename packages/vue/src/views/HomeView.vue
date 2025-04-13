<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { onMounted, ref } from 'vue'

import AppModal from '@/components/AppModal.vue'
import ProjectDataTable from '@/components/ProjectDataTable.vue'
import ProjectForm from '@/components/ProjectForm.vue'
import { useProjectsStore } from '@/stores/projects'

const projectsStore = useProjectsStore()

const formModal = ref<InstanceType<typeof AppModal> | null>(null)

onMounted(() => {
  projectsStore.loadItems()
})
</script>

<template>
  <div class="container mx-auto px-4">
    <div>
      <button class="btn btn-primary" @click="() => formModal?.show()">
        <FontAwesomeIcon :icon="faPlus" class="mr-2" />
        Create project
      </button>
    </div>
    <div class="mt-4">
      <ProjectDataTable />
    </div>
  </div>
  <AppModal ref="formModal">
    <div class="modal-box">
      <div class="p-4">
        <ProjectForm />
      </div>
    </div>
  </AppModal>
</template>
