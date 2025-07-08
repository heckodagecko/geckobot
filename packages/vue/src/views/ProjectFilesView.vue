<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <h1 class="text-3xl font-bold underline">Viewing project #{{ route.params.id }} files</h1>
</template>
