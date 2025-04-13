<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'shown'): void
  (e: 'hidden'): void
}>()

const dialog = ref<HTMLDialogElement | null>(null)

function show() {
  dialog.value?.showModal()
  emit('shown')
}

function hide() {
  dialog.value?.close()
  emit('hidden')
}

defineExpose({ show, hide })
</script>

<template>
  <dialog class="modal" ref="dialog">
    <slot></slot>
  </dialog>
</template>
