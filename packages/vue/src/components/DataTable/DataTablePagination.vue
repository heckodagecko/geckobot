<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronLeft, faChevronRight, faEllipsis } from '@fortawesome/free-solid-svg-icons'

import { middleSequence } from '@/utils'

interface DataTablePaginationProps {
  currentPage: number
  totalPages: number
}

interface DataTablePaginationEvents {
  (event: 'nextPage'): void
  (event: 'goToPage', value: number): void
  (event: 'previousPage'): void
}

defineProps<DataTablePaginationProps>()
defineEmits<DataTablePaginationEvents>()

const slots = 3

function getPageNumbers(currentPage: number, totalPages: number) {
  const pages: (number | null)[] = middleSequence(currentPage, slots, 1, totalPages)

  if (pages[0] !== 1) {
    pages[0] = 1
  }

  if (pages[1] !== 2) {
    pages[1] = null
  }

  if (pages[pages.length - 2] !== totalPages - 1) {
    pages[pages.length - 2] = null
  }

  if (pages[pages.length - 1] !== totalPages) {
    pages[pages.length - 1] = totalPages
  }

  return pages
}
</script>

<template>
  <div class="join">
    <button
      v-if="currentPage > 1"
      class="join-item btn btn-ghost"
      @click="() => $emit('previousPage')"
    >
      <FontAwesomeIcon :icon="faChevronLeft" />
    </button>
    <template v-for="page in getPageNumbers(currentPage, totalPages)">
      <button
        v-if="page"
        class="join-item btn btn-ghost"
        :class="{ 'btn-active': currentPage === page }"
        @click="() => $emit('goToPage', page)"
      >
        {{ page }}
      </button>
      <button v-else class="join-item btn btn-ghost btn-disabled">
        <FontAwesomeIcon :icon="faEllipsis" />
      </button>
    </template>
    <button
      v-if="currentPage < totalPages"
      class="join-item btn btn-ghost"
      @click="() => $emit('nextPage')"
    >
      <FontAwesomeIcon :icon="faChevronRight" />
    </button>
  </div>
</template>
