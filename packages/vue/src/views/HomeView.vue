<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBoxArchive, faPlus } from '@fortawesome/free-solid-svg-icons'
import { onMounted, ref } from 'vue'
import type { CreateProject, Project, UpdateProject } from '@geckobot/types'

import AppModal from '@/components/AppModal.vue'
import ProjectDataTable from '@/components/ProjectDataTable.vue'
import ProjectForm from '@/components/ProjectForm.vue'
import { useProjectsStore } from '@/stores/projects'
import { DataFormMode } from '@/types'

const projectsStore = useProjectsStore()

const datatable = ref<InstanceType<typeof ProjectDataTable> | null>(null)

const formModal = ref<InstanceType<typeof AppModal> | null>(null)

const form = ref<InstanceType<typeof ProjectForm> | null>(null)
const formProject = ref<CreateProject | UpdateProject>(formDefault())
const formMode = ref<DataFormMode>(DataFormMode.Create)

function setCreate() {
  form.value?.reset()
  formProject.value = formDefault()
  formMode.value = DataFormMode.Create
}

function setEdit(data: Project) {
  form.value?.reset()
  formProject.value = JSON.parse(JSON.stringify(data))
  formMode.value = DataFormMode.Update
}

function handleEdit(data: Project) {
  if (data.startedAt) {
    data.startedAt = data.startedAt.slice(0, 16)
  }

  setEdit(data)
  formModal.value?.show()
}

onMounted(() => {
  projectsStore.loadItems()
})
</script>

<script lang="ts">
const formDefault: () => CreateProject = () => ({
  name: 'Untitled',
  startedAt: new Date().toISOString().slice(0, 16),
})
</script>

<template>
  <div class="container mx-auto px-4">
    <div class="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
      <button class="btn btn-primary" @click="() => formModal?.show()">
        <FontAwesomeIcon :icon="faPlus" class="h-5 w-5" />
        Create project
      </button>
      <button class="btn btn-error" disabled @click="() => formModal?.show()">
        <FontAwesomeIcon :icon="faBoxArchive" class="h-5 w-5" />
        Archive selected
      </button>
    </div>
    <div class="mt-4">
      <ProjectDataTable @edit="handleEdit" ref="datatable" />
    </div>
  </div>
  <AppModal @close="setCreate" ref="formModal">
    <div class="modal-box">
      <div class="p-4">
        <ProjectForm v-model="formProject" :mode="formMode" />
        <div class="flex sm:flex-row sm:space-x-2 sm:justify-end flex-col space-y-2 pt-2">
          <button class="btn" @click="formModal?.hide()">Cancel</button>
          <button
            class="btn"
            :class="[formMode === DataFormMode.Create ? 'btn-primary' : 'btn-secondary']"
          >
            {{ formMode }}
          </button>
        </div>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>Close</button>
    </form>
  </AppModal>
</template>
