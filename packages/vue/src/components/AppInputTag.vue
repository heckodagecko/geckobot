<script setup lang="ts" generic="T extends object">
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { reactive, ref } from 'vue'

interface AppInputTagProps {
  keys: keyof T[]
}

defineProps<AppInputTagProps>()

const tags = reactive<string[]>([])

function addTag(tag: string) {
  tags.push(tag)
}

function removeTag(index: number) {
  tags.splice(index, 1)
}

const input = ref<string>('')

function handleEnter() {
  if (input.value.trim().length <= 0) return

  const tag = input.value.trim()
  if (!tags.includes(tag)) addTag(tag)

  input.value = ''
}

function handleBackspace() {
  if (input.value !== '' || tags.length === 0) return

  tags.pop()
}

const suggestions = ref<string[]>(['is:', 'is not:'])
</script>

<template>
  <label class="input w-full mt-4">
    <FontAwesomeIcon :icon="faSearch" class="h-[1em] opacity-50" />
    <div
      v-for="(tag, index) in tags"
      :key="index"
      class="badge badge-soft cursor-pointer"
      @click="removeTag(index)"
    >
      {{ tag }}
    </div>
    <input
      type="search"
      v-model="input"
      @keydown.enter.prevent="handleEnter"
      @keydown.backspace="handleBackspace"
      class="grow"
      placeholder="Search"
    />
  </label>
</template>
