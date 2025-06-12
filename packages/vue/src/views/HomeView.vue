<script lang="ts">
const formDefault: () => CreateProject = () => ({
  name: 'Untitled',
  startedAt: new Date().toISOString().slice(0, 16),
})
</script>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBoxArchive, faPlus } from '@fortawesome/free-solid-svg-icons'
import { onMounted, ref } from 'vue'
import type { CreateResult, UpdateResult } from '@geckobot/datasource'
import type { CreateProject, Project, UpdateProject } from '@geckobot/types'

import AppModal from '@/components/AppModal.vue'
import ProjectDataTable from '@/components/ProjectDataTable.vue'
import ProjectForm from '@/components/ProjectForm.vue'
import Datasource from '@/services'
import { useNotifyStore } from '@/stores/notify'
import { useProjectsStore } from '@/stores/projects'
import { DataFormMode, NotificationType } from '@/types'

const projectsStore = useProjectsStore()
const notifyStore = useNotifyStore()

const datatable = ref<InstanceType<typeof ProjectDataTable> | null>(null)

const form = ref<InstanceType<typeof ProjectForm> | null>(null)
const formModal = ref<InstanceType<typeof AppModal> | null>(null)
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
  if (data.startedAt) data.startedAt = data.startedAt.slice(0, 16)
  setEdit(data)
  formModal.value?.show()
}

const submitLoading = ref(false)

async function handleSubmit() {
  submitLoading.value = true

  try {
    let response: CreateResult<Project> | UpdateResult<Project> | undefined

    if (formMode.value == DataFormMode.Create) {
      response = await Datasource.projects.create(formProject.value as CreateProject)
    } else if (formMode.value == DataFormMode.Update) {
      const id = (formProject.value as Project).id
      response = await Datasource.projects.update(id, formProject.value)
    }

    if (!response) throw new Error('Unknown error')

    formModal.value?.hide()
    projectsStore.loadItems()
    notifyStore.notify({ type: NotificationType.Success, message: response.message })
  } catch (error: any) {
    notifyStore.notify({
      type: NotificationType.Error,
      message: error?.message || 'Something went wrong',
    })
  }

  submitLoading.value = false
}

onMounted(() => {
  projectsStore.loadItems()
})
</script>

<template>
  <div class="container mx-auto px-4">
    <div class="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
      <button class="btn btn-primary" @click="() => formModal?.show()">
        <FontAwesomeIcon :icon="faPlus" class="h-5 w-5" />
        Create project
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
            :disabled="submitLoading"
            @click="handleSubmit"
          >
            <template v-if="!submitLoading">
              {{ formMode }}
            </template>
            <span v-else class="loading loading-ring loading-md"></span>
          </button>
        </div>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>Close</button>
    </form>
  </AppModal>
</template>
