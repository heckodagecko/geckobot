<script setup lang="ts">
import { ref } from 'vue'
import type { CreateProject, UpdateProject } from '@geckobot/datasource'

import { DataFormMode } from '@/types'

interface ProjectFormProps {
  modelValue?: CreateProject | UpdateProject
  mode?: DataFormMode
}

interface ProjectFormEvents {
  (event: 'update:modelValue', data: CreateProject | UpdateProject): void
}

withDefaults(defineProps<ProjectFormProps>(), {
  modelValue: () => ({
    name: '',
    description: null,
    startedAt: null,
  }),
  mode: DataFormMode.Create,
})
defineEmits<ProjectFormEvents>()

const form = ref<HTMLFormElement | null>(null)

function reset() {
  form.value?.reset()
}

defineExpose({ reset })
</script>

<template>
  <form @submit.prevent ref="form">
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Name</legend>
      <label class="input validator w-full">
        <input type="text" v-model="modelValue.name" pattern="^(?!\s*$).+" required />
      </label>
      <div class="validator-hint hidden mt-0">Name is required</div>
    </fieldset>
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Start date</legend>
      <input type="datetime-local" step="1" v-model="modelValue.startedAt" class="input w-full" />
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
  </form>
</template>
