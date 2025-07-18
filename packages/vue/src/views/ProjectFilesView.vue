<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFolder } from '@fortawesome/free-regular-svg-icons'
import {
  faPlus,
  faFile,
  faFolder as faFolderSolid,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { reactive } from 'vue'
import { useRoute } from 'vue-router'

import { projectSourceFiles } from '@geckobot/datasource/src/mock/project-files'

import SourceFileCard from '@/components/SourceFileCard.vue'

const route = useRoute()

const items = reactive(projectSourceFiles.map((data) => ({ selected: false, data })))
</script>

<template>
  <div class="container mx-auto px-4">
    <h1 class="text-3xl font-bold">Viewing project #{{ route.params.id }} files</h1>
    <div role="tablist" class="tabs tabs-border tabs-lg justify-center mt-4">
      <input type="radio" name="files-tabs" class="tab" aria-label="Sources" checked />
      <div class="tab-content pt-4">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="dropdown">
            <div tabindex="0" role="button" class="btn btn-primary sm:w-full">
              <FontAwesomeIcon :icon="faPlus" class="size-[1em]" />
              New
            </div>
            <ul
              tabindex="0"
              class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <a><FontAwesomeIcon :icon="faFile" class="size-[1em]" />Upload file</a>
              </li>
              <li>
                <a><FontAwesomeIcon :icon="faFolderSolid" class="size-[1em]" />Create folder</a>
              </li>
            </ul>
          </div>
          <button class="btn btn-error" disabled>
            <FontAwesomeIcon :icon="faTrash" class="size-[1em]" />
            Delete selected
          </button>
          <div class="breadcrumbs text-sm">
            <ul>
              <li>
                <a>
                  <FontAwesomeIcon :icon="faFolder" class="size-4 stroke-current" />
                  Home
                </a>
              </li>
              <li>
                <a class="pointer-events-none">
                  <FontAwesomeIcon :icon="faFolder" class="size-4 stroke-current" />
                  Documents
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mt-4">
          <SourceFileCard
            v-for="(item, index) in items"
            :selected="item.selected"
            :data="item.data"
            :key="index"
            @update:selected="
              (v) => {
                items[index].selected = v
              }
            "
          />
        </div>
      </div>
      <input type="radio" name="files-tabs" class="tab" aria-label="Exports" />
      <div class="tab-content pt-4">Exports</div>
    </div>
  </div>
</template>
