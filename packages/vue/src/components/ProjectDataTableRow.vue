<script setup lang="ts">
import { UseTimeAgo } from '@vueuse/components'
import { ref } from "vue";
import type { Project } from "@geckobot/types";

defineProps<{
  selected: boolean;
  data: Project;
}>();

const checkbox = ref<HTMLElement | null>(null);
</script>

<template>
  <tr>
    <td><input type="checkbox" class="checkbox" ref="checkbox" /></td>
    <td>{{ data.name }}</td>
    <td>
      <UseTimeAgo v-if="data.startedAt != null" v-slot="{ timeAgo }" :time="new Date(data.startedAt)">
        {{ timeAgo }}
      </UseTimeAgo>
    </td>
    <td>
      <UseTimeAgo v-if="data.createdAt != null" v-slot="{ timeAgo }" :time="new Date(data.createdAt)">
        {{ timeAgo }}
      </UseTimeAgo>
    </td>
    <td>
      <UseTimeAgo v-if="data.updatedAt != null" v-slot="{ timeAgo }" :time="new Date(data.updatedAt)">
        {{ timeAgo }}
      </UseTimeAgo>
    </td>
  </tr>
</template>
