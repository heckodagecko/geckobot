<script lang="ts">
import { getLocalISODateTime } from '@/utils'

const formDefault: () => CreateProject = () => ({
  name: 'Untitled',
  startedAt: getLocalISODateTime().slice(0, 19),
})
</script>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useEventListener } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import type {
  CreateProject,
  CreateResult,
  Project,
  UpdateProject,
  UpdateResult,
} from '@geckobot/datasource'

import AppModal from '@/components/AppModal.vue'
import ProjectDataTable from '@/components/ProjectDataTable.vue'
import ProjectForm from '@/components/ProjectForm.vue'
import Datasource from '@/datasource'
import { useNotifyStore } from '@/stores/notify'
import { useProjectsStore } from '@/stores/projects'
import { DataFormMode, NotificationType } from '@/types'

const projectsStore = useProjectsStore()
const notifyStore = useNotifyStore()

const searchTerm = ref('')
const searchInput = ref<HTMLInputElement | null>(null)

useEventListener(document, 'keydown', (e) => {
  if (e.ctrlKey && e.key === 'k') {
    e.preventDefault()
    searchInput.value?.focus()
  }
})

function handleSearchEnter(e: KeyboardEvent) {
  if (searchTerm.value.trim().length === 0) return
  projectsStore.setSearchTerm(searchTerm.value.trim())
}

function handleSearchClear() {
  projectsStore.setSearchTerm(null)
  searchTerm.value = ''
}

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
  if (data.startedAt) {
    data.startedAt = getLocalISODateTime(new Date(data.startedAt)).slice(0, 19)
  }
  setEdit(data)
  formModal.value?.show()
}

const loadingActions = ref(false)

async function handleArchive({ id }: Project) {
  loadingActions.value = true

  try {
    const { message } = await Datasource.projects.delete(id, 'SOFT')
    projectsStore.loadItems()
    notifyStore.notify({ type: NotificationType.Success, message })
  } catch (error: any) {
    notifyStore.notify({
      type: NotificationType.Error,
      message: error?.message || 'Something went wrong',
    })
  }

  loadingActions.value = false
}

async function handleRestore({ id }: Project) {
  loadingActions.value = true

  try {
    const { message } = await Datasource.projects.restore(id)
    projectsStore.loadItems()
    notifyStore.notify({ type: NotificationType.Success, message })
  } catch (error: any) {
    notifyStore.notify({
      type: NotificationType.Error,
      message: error?.message || 'Something went wrong',
    })
  }

  loadingActions.value = false
}

async function handleDelete({ id }: Project) {
  loadingActions.value = true

  try {
    const { message } = await Datasource.projects.delete(id, 'HARD')
    projectsStore.loadItems()
    notifyStore.notify({ type: NotificationType.Success, message })
  } catch (error: any) {
    notifyStore.notify({
      type: NotificationType.Error,
      message: error?.message || 'Something went wrong',
    })
  }

  loadingActions.value = false
}

const submitLoading = ref(false)

async function handleSubmit() {
  submitLoading.value = true

  try {
    let response: CreateResult<Project> | UpdateResult<Project> | undefined

    const { name, description } = formProject.value

    let startedAt: string | null = null
    if (formProject.value.startedAt) {
      startedAt = new Date(formProject.value.startedAt).toISOString()
    }

    if (formMode.value == DataFormMode.Create) {
      response = await Datasource.projects.create({ name, startedAt, description } as CreateProject)
    } else if (formMode.value == DataFormMode.Update) {
      const id = (formProject.value as Project).id
      response = await Datasource.projects.update(id, { name, startedAt, description })
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

const showArchived = ref(false)

function handleChangeShowArchived() {
  projectsStore.setIncludeTrashed(showArchived.value)
}

onMounted(() => {
  projectsStore.loadItems()
})
</script>

<template>
  <div class="container mx-auto px-4">
    <div class="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
      <button class="btn btn-primary" @click="() => formModal?.show()">
        <FontAwesomeIcon :icon="faPlus" class="size-[1em]" />
        Create project
      </button>
    </div>
    <div class="mt-4 flex flex-col sm:flex-row sm:justify-between items-center gap-4">
      <label class="input w-full">
        <FontAwesomeIcon :icon="faSearch" class="size-[1em] opacity-50" />
        <input
          v-model="searchTerm"
          type="search"
          class="grow"
          placeholder="Search"
          @keydown.enter.prevent="handleSearchEnter"
          ref="searchInput"
        />
        <button
          v-if="projectsStore.searchTerm != null"
          class="btn btn-circle btn-outline btn-xs"
          @click="handleSearchClear"
        >
          <FontAwesomeIcon :icon="faXmark" class="size-[1em]" />
        </button>
        <kbd class="kbd kbd-sm">⌃</kbd>
        <kbd class="kbd kbd-sm">K</kbd>
      </label>
      <label class="label">
        Show archived
        <input
          v-model="showArchived"
          type="checkbox"
          class="toggle"
          @change="handleChangeShowArchived"
        />
      </label>
    </div>
    <div class="mt-4">
      <ProjectDataTable
        :loadingActions="loadingActions"
        @edit="handleEdit"
        @archive="handleArchive"
        @restore="handleRestore"
        @delete="handleDelete"
      />
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
