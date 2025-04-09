<script setup lang="ts">
import ProjectDataTableRow from '@/components/ProjectDataTableRow.vue'
import ProjectDataTablePagination from '@/components/ProjectDataTablePagination.vue'
import { useProjectsStore } from '@/stores/projects'

const projectsStore = useProjectsStore()
</script>

<template>
  <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
    <table class="table">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              class="checkbox checkbox-primary"
              :checked="projectsStore.allItemsSelected"
              :disabled="projectsStore.items.length === 0"
              @change="projectsStore.selectAllItems"
            />
          </th>
          <th>Name</th>
          <th>Started</th>
          <th>Created</th>
          <th>Modified</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="projectsStore.loading">
          <tr>
            <td class="text-center" colspan="100%">
              <span class="loading loading-ring loading-md"></span>
            </td>
          </tr>
        </template>
        <template v-else-if="projectsStore.items.length > 0">
          <ProjectDataTableRow
            v-for="(item, index) in projectsStore.items"
            v-model="item.selected"
            :data="item.data"
            :key="index"
          />
        </template>
        <template v-else>
          <tr>
            <td class="text-center" colspan="100%">No projects found.</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
  <div class="mt-4 text-center">
    <ProjectDataTablePagination />
  </div>
</template>
