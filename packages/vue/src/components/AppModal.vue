<script setup lang="ts">
import { ref } from 'vue'

interface AppModalEvents {
  (event: 'close'): void
}

defineEmits<AppModalEvents>()

const dialog = ref<HTMLDialogElement | null>(null)

function show() {
  dialog.value?.showModal()
}

function hide() {
  dialog.value?.close()
}

defineExpose({ show, hide })
</script>

<template>
  <dialog class="modal" @close="() => $emit('close')" ref="dialog">
    <slot></slot>
  </dialog>
</template>
