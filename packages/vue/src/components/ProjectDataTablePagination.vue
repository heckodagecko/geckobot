<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronLeft, faChevronRight, faEllipsis } from '@fortawesome/free-solid-svg-icons'

import { useProjectsStore } from '@/stores/projects'

const projectsStore = useProjectsStore()

const slots = 4

const middleSequence = (middle: number, count: number, min: number, max: number) => {
  const sequence = []
  for (let i = middle - count; i <= middle + count; i++) {
    if (i >= min && i <= max) {
      sequence.push(i)
    }
  }
  return sequence
}

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
      v-if="projectsStore.currentPage > 1"
      class="join-item btn"
      @click="() => projectsStore.loadPreviousPage()"
    >
      <FontAwesomeIcon :icon="faChevronLeft" />
    </button>
    <template
      v-for="(pageNo, index) in getPageNumbers(projectsStore.currentPage, projectsStore.totalPages)"
      :key="index"
    >
      <button
        v-if="pageNo != null"
        class="join-item btn"
        :class="{ 'btn-active': projectsStore.currentPage === pageNo }"
        @click="() => projectsStore.loadPage(pageNo)"
      >
        {{ pageNo }}
      </button>
      <button v-else class="join-item btn btn-disabled">
        <FontAwesomeIcon :icon="faEllipsis" />
      </button>
    </template>
    <button
      v-if="projectsStore.currentPage < projectsStore.totalPages"
      class="join-item btn"
      @click="() => projectsStore.loadNextPage()"
    >
      <FontAwesomeIcon :icon="faChevronRight" />
    </button>
  </div>
</template>
