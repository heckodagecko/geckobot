<script setup lang="ts">
import { faFile } from '@fortawesome/free-regular-svg-icons'
import {
  faCircleInfo,
  faDownload,
  faEllipsis,
  faFileExport,
  faFilePen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

interface FileCardProps {
  selected?: boolean
}

interface FileCardEvents {
  (event: 'update:selected', value: boolean): void
}

defineProps<FileCardProps>()
defineEmits<FileCardEvents>()
</script>

<template>
  <div
    class="card card-sm card-border aspect-square group"
    :class="[selected ? 'bg-base-300' : 'bg-base-200 hover:bg-base-300']"
  >
    <div class="card-body">
      <div class="relative size-full">
        <div
          class="absolute left-0 top-0 transition-opacity"
          :class="{ 'opacity-0 group-hover:opacity-100': !selected }"
        >
          <input
            type="checkbox"
            class="checkbox checkbox-primary"
            :checked="selected"
            @change="(e) => $emit('update:selected', (e.target as HTMLInputElement).checked)"
          />
        </div>
        <div class="absolute right-0 top-0">
          <div class="dropdown dropdown-center">
            <div tabindex="0" role="button" class="btn btn-primary btn-xs btn-circle btn-outline">
              <FontAwesomeIcon :icon="faEllipsis" class="size-[1em]" />
            </div>
            <ul
              tabindex="0"
              class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li class="text-accent">
                <a>
                  <FontAwesomeIcon :icon="faFileExport" class="size-[1em]" />
                  Create an export
                </a>
              </li>
              <li>
                <a>
                  <FontAwesomeIcon :icon="faCircleInfo" class="size-[1em]" />
                  Details
                </a>
              </li>
              <li>
                <a>
                  <FontAwesomeIcon :icon="faFilePen" class="size-[1em]" />
                  Rename
                </a>
              </li>
              <li>
                <a>
                  <FontAwesomeIcon :icon="faDownload" class="size-[1em]" />
                  Download
                </a>
              </li>
              <li class="text-error">
                <a>
                  <FontAwesomeIcon :icon="faTrash" class="size-[1em]" />
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex flex-col h-full">
          <div class="flex-auto flex items-center justify-center">
            <FontAwesomeIcon :icon="faFile" size="4x" />
          </div>
          <div class="flex-none">
            <div class="flex">
              <span class="font-semibold truncate">Lorem ipsum dolor sit amet consectetur</span>
              <span class="opacity-50">.txt</span>
            </div>
            <div class="opacity-50">5 months ago</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
