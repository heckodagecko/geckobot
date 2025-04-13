<script lang="ts">
const defaultData: CreateProject = {
  name: 'Untitled',
  startedAt: new Date().toISOString().slice(0, 16),
}
</script>

<script setup lang="ts">
import type { CreateProject, UpdateProject } from '@geckobot/types'

import type { DataFormMode } from '@/types'

withDefaults(
  defineProps<{
    modelValue: CreateProject | UpdateProject
    mode: DataFormMode
  }>(),
  { modelValue: () => defaultData, mode: 'CREATE' },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: CreateProject | UpdateProject): void
}>()

function resetForm() {
  emit('update:modelValue', defaultData)
}

defineExpose({ resetForm })
</script>

<template>
  <form @submit.prevent="() => console.log(modelValue)">
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Name</legend>
      <label class="input validator w-full">
        <input type="text" v-model="modelValue.name" pattern="^(?!\s*$).+" required />
      </label>
      <div class="validator-hint hidden mt-0">Name is required</div>
    </fieldset>

    <fieldset class="fieldset">
      <legend class="fieldset-legend">Start date</legend>
      <input type="datetime-local" v-model="modelValue.startedAt" class="input w-full" />
      <label class="fieldset-label">When this project started?</label>
    </fieldset>

    <fieldset class="fieldset">
      <legend class="fieldset-legend">Description</legend>
      <textarea
        v-model="modelValue.description"
        class="textarea h-24 resize-none w-full"
        rows="4"
      ></textarea>
      <label class="fieldset-label">This field is optional</label>
    </fieldset>

    <div class="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 pt-2">
      <button value="cancel" formmethod="dialog" class="btn">Cancel</button>
      <button class="btn btn-primary">Create</button>
    </div>
  </form>
</template>
