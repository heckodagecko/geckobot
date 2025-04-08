<script setup lang="ts">
import ProjectDataTableRow from "@/components/ProjectDataTableRow.vue";
import { useProjectsStore } from "@/stores/projects";

const projectsStore = useProjectsStore();
</script>

<template>
	<div class="overflow-x-auto">
		<table class="table">
			<thead>
				<tr>
					<th><input type="checkbox" class="checkbox" /></th>
					<th>Name</th>
					<th>Started</th>
					<th>Created</th>
					<th>Modified</th>
				</tr>
			</thead>
			<tbody>
				<template v-if="projectsStore.loading">
					<tr>
						<td class="text-center" colspan="100%"><span class="loading loading-ring loading-md"></span></td>
					</tr>
				</template>
				<template v-else-if="projectsStore.items.length > 0">
					<ProjectDataTableRow v-for="item, index in projectsStore.items" :key="index" :selected="item.selected"
						:data="item.data" />
				</template>
				<template v-else>
					<tr>
						<td class="text-center" colspan="100%">No projects found.</td>
					</tr>
				</template>
			</tbody>
		</table>
	</div>
</template>
