<script setup lang="ts">
import { UseTimeAgo } from '@vueuse/components'
import { faBoxArchive, faEllipsis, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { Project } from '@geckobot/types'

import DataTable from '@/components/DataTable/DataTable.vue'
import DataTablePagination from '@/components/DataTable/DataTablePagination.vue'
import { useProjectsStore } from '@/stores/projects'

interface ProjectDataTableEvents {
  (event: 'edit', data: Project): void
  (event: 'archive', data: Project): void
}

defineEmits<ProjectDataTableEvents>()

const projectsStore = useProjectsStore()

const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})
</script>

<template>
  <div class="rounded-box border border-base-content/5 bg-base-100">
    <DataTable
      :selectable="true"
      :loading="projectsStore.loading"
      :items="projectsStore.items"
      :columns="[
        ['name', 'Name'],
        ['startedAt', 'Started'],
        ['createdAt', 'Created'],
        ['updatedAt', 'Last modified'],
      ]"
    >
      <template #item.startedAt="{ item }">
        <template v-if="item.startedAt != null">
          <div class="tooltip" :data-tip="dateTimeFormat.format(new Date(item.startedAt))">
            <UseTimeAgo #="{ timeAgo }" :time="new Date(item.startedAt)">
              {{ timeAgo }}
            </UseTimeAgo>
          </div>
        </template>
      </template>
      <template #item.createdAt="{ item }">
        <div class="tooltip" :data-tip="dateTimeFormat.format(new Date(item.createdAt))">
          <UseTimeAgo #="{ timeAgo }" :time="new Date(item.createdAt)">
            {{ timeAgo }}
          </UseTimeAgo>
        </div>
      </template>
      <template #item.updatedAt="{ item }">
        <div class="tooltip" :data-tip="dateTimeFormat.format(new Date(item.updatedAt))">
          <UseTimeAgo #="{ timeAgo }" :time="new Date(item.updatedAt)">
            {{ timeAgo }}
          </UseTimeAgo>
        </div>
      </template>
      <template #no-items>No projects found.</template>
      <template #actions="{ item }">
        <div class="dropdown dropdown-center">
          <div tabindex="0" role="button" class="btn btn-outline btn-primary btn-circle">
            <FontAwesomeIcon :icon="faEllipsis" />
          </div>
          <ul
            tabindex="0"
            class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <a @click="$emit('edit', item)">
                <FontAwesomeIcon :icon="faPencil" class="h-5 w-5" />
                Edit
              </a>
            </li>
            <li>
              <a class="text-error" @click="$emit('archive', item)">
                <FontAwesomeIcon :icon="faBoxArchive" class="h-5 w-5" />
                Archive
              </a>
            </li>
          </ul>
        </div>
      </template>
    </DataTable>
  </div>
  <div class="mt-4 text-center">
    <DataTablePagination
      :current-page="projectsStore.currentPage"
      :total-pages="projectsStore.totalPages"
      @go-to-page="(page) => projectsStore.loadPage(page)"
      @next-page="projectsStore.loadNextPage"
      @previous-page="projectsStore.loadPreviousPage"
    />
  </div>
</template>
