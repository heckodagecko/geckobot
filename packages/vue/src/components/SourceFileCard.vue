<script setup lang="ts">
import {
  faFile,
  faFileAudio,
  faFileCode,
  faFileImage,
  faFileLines,
  faFilePdf,
  faFileVideo,
  faFileZipper,
  faFolder,
} from '@fortawesome/free-regular-svg-icons'
import {
  faCircleInfo,
  faDownload,
  faEllipsis,
  faFileExport,
  faFilePen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { UseTimeAgo } from '@vueuse/components'
import { computed } from 'vue'
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import type { ProjectSourceFile } from '@geckobot/datasource'

interface FileCardProps {
  selected?: boolean
  data: ProjectSourceFile
}

const props = defineProps<FileCardProps>()

const fileBaseName = computed(() => {
  const filename = props.data.filename
  return filename.substring(0, filename.lastIndexOf('.'))
})

const fileExtension = computed(() => {
  const filename = props.data.filename
  return `.${filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)}`
})

interface FileCardEvents {
  (event: 'update:selected', value: boolean): void
  (event: 'create-export', data: ProjectSourceFile): void
  (event: 'details', data: ProjectSourceFile): void
  (event: 'rename', data: ProjectSourceFile): void
  (event: 'download', data: ProjectSourceFile): void
  (event: 'delete', data: ProjectSourceFile): void
}

defineEmits<FileCardEvents>()

const iconMap: Record<string, IconDefinition> = {
  'application/pdf': faFilePdf, // PDF files
  'application/zip': faFileZipper, // Compressed files
  'application/x-rar-compressed': faFileZipper, // RAR files
  '^video/.*': faFileVideo, // Any video media
  '^image/.*': faFileImage, // Any image media
  '^audio/.*': faFileAudio, // Any audio media
  '^text/.*': faFileLines, // Any text-based files
  '^application/.*': faFileCode, // Any code-related file
  default: faFile, // Fallback for unmatched types
}

function getIcon(mimetype?: string | null) {
  if (props.data.isDirectory) {
    return faFolder
  }

  if (mimetype == null) {
    return iconMap.default
  }

  if (iconMap[mimetype] != null) {
    return iconMap[mimetype]
  }

  for (const [key, value] of Object.entries(iconMap)) {
    if (key.startsWith('^') && value instanceof RegExp && new RegExp(key).test(mimetype)) {
      return value
    }
  }

  return iconMap.default
}
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
              <li v-if="data.isExportable" class="text-accent">
                <a @click="$emit('create-export', data)">
                  <FontAwesomeIcon :icon="faFileExport" class="size-[1em]" />
                  Create an export
                </a>
              </li>
              <li>
                <a @click="$emit('details', data)">
                  <FontAwesomeIcon :icon="faCircleInfo" class="size-[1em]" />
                  Details
                </a>
              </li>
              <li>
                <a @click="$emit('rename', data)">
                  <FontAwesomeIcon :icon="faFilePen" class="size-[1em]" />
                  Rename
                </a>
              </li>
              <li>
                <a @click="$emit('download', data)">
                  <FontAwesomeIcon :icon="faDownload" class="size-[1em]" />
                  Download
                </a>
              </li>
              <li class="text-error">
                <a @click="$emit('delete', data)">
                  <FontAwesomeIcon :icon="faTrash" class="size-[1em]" />
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex flex-col h-full">
          <div class="flex-auto flex items-center justify-center">
            <FontAwesomeIcon :icon="getIcon(data.mimetype)" size="4x" />
          </div>
          <div class="flex-none">
            <div class="flex">
              <template v-if="!data.isDirectory">
                <span class="font-semibold truncate">{{ fileBaseName }}</span>
                <span class="opacity-50">{{ fileExtension }}</span>
              </template>
              <span v-else>{{ data.filename }}</span>
            </div>
            <div class="opacity-50">
              <UseTimeAgo #="{ timeAgo }" :time="new Date(data.createdAt)">
                {{ timeAgo }}
              </UseTimeAgo>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
