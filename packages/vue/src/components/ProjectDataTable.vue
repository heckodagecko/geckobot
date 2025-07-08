<script setup lang="ts">
import { UseTimeAgo } from '@vueuse/components'
import {
  faBoxArchive,
  faEllipsis,
  faFolder,
  faPencil,
  faRotate,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { Project } from '@geckobot/datasource'

import DataTable from '@/components/DataTable/DataTable.vue'
import DataTablePageSize from '@/components/DataTable/DataTablePageSize.vue'
import DataTablePagination from '@/components/DataTable/DataTablePagination.vue'
import ProjectTagList from '@/components/ProjectTagList.vue'
import { useProjectsStore } from '@/stores/projects'

interface ProjectDataTableProps {
  loadingActions?: boolean
}

interface ProjectDataTableEvents {
  (event: 'view-files', data: Project): void
  (event: 'edit', data: Project): void
  (event: 'archive', data: Project): void
  (event: 'restore', data: Project): void
  (event: 'delete', data: Project): void
}

defineProps<ProjectDataTableProps>()
defineEmits<ProjectDataTableEvents>()

const projectsStore = useProjectsStore()

const dtFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div class="">
      <div class="rounded-box border border-base-content/5 bg-base-100">
        <ProjectTagList />
      </div>
    </div>
    <div class="md:col-span-3">
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
          <template #item.name="{ item }">
            <div class="flex justify-between items-center gap-2">
              <div>{{ item.name }}</div>
              <div
                v-if="item.deletedAt != null"
                class="tooltip"
                :data-tip="`Archived at ${dtFormat.format(new Date(item.deletedAt))}`"
              >
                <div class="badge badge-soft badge-error">
                  <FontAwesomeIcon :icon="faBoxArchive" class="size-[1em]" />
                </div>
              </div>
            </div>
          </template>
          <template #item.startedAt="{ item }">
            <template v-if="item.startedAt != null">
              <div class="tooltip" :data-tip="dtFormat.format(new Date(item.startedAt))">
                <UseTimeAgo #="{ timeAgo }" :time="new Date(item.startedAt)">
                  {{ timeAgo }}
                </UseTimeAgo>
              </div>
            </template>
          </template>
          <template #item.createdAt="{ item }">
            <div class="tooltip" :data-tip="dtFormat.format(new Date(item.createdAt))">
              <UseTimeAgo #="{ timeAgo }" :time="new Date(item.createdAt)">
                {{ timeAgo }}
              </UseTimeAgo>
            </div>
          </template>
          <template #item.updatedAt="{ item }">
            <div class="tooltip" :data-tip="dtFormat.format(new Date(item.updatedAt))">
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
                class="dropdown-content menu bg-base-200 rounded-box z-1 w-52 p-2 shadow-lg"
              >
                <template v-if="!loadingActions">
                  <template v-if="item.deletedAt == null">
                    <li>
                      <a @click="$emit('view-files', item)">
                        <FontAwesomeIcon :icon="faFolder" class="size-[1em]" />
                        View files
                      </a>
                    </li>
                    <li>
                      <a @click="$emit('edit', item)">
                        <FontAwesomeIcon :icon="faPencil" class="size-[1em]" />
                        Edit
                      </a>
                    </li>
                    <li>
                      <a class="text-error" @click="$emit('archive', item)">
                        <FontAwesomeIcon :icon="faBoxArchive" class="size-[1em]" />
                        Archive
                      </a>
                    </li>
                  </template>
                  <template v-else>
                    <li>
                      <a @click="$emit('restore', item)">
                        <FontAwesomeIcon :icon="faRotate" class="size-[1em]" />
                        Restore
                      </a>
                    </li>
                    <li>
                      <a class="text-error" @click="$emit('delete', item)">
                        <FontAwesomeIcon :icon="faTrash" class="size-[1em]" />
                        Delete
                      </a>
                    </li>
                  </template>
                </template>
                <li v-else class="flex items-center">
                  <span class="loading loading-ring loading-lg"></span>
                </li>
              </ul>
            </div>
          </template>
        </DataTable>
      </div>
    </div>
  </div>
  <div class="mt-4 flex flex-col sm:flex-row sm:justify-between items-center gap-4">
    <DataTablePageSize
      :options="[10, 25, 50]"
      @change="(pageSize) => projectsStore.setPageSize(pageSize)"
    />
    <DataTablePagination
      :disabled="projectsStore.loading"
      :current-page="projectsStore.currentPage"
      :total-pages="projectsStore.totalPages"
      @go-to-page="(page) => projectsStore.loadPage(page)"
      @next-page="projectsStore.loadNextPage"
      @previous-page="projectsStore.loadPreviousPage"
    />
  </div>
</template>
