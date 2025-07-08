import { createRouter, createWebHistory } from 'vue-router'

import ProjectsView from '@/views/ProjectsView.vue'
import ProjectFilesView from '@/views/ProjectFilesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/projects',
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
    },
    {
      path: '/projects/:id/files',
      name: 'projects.files',
      component: ProjectFilesView,
    },
  ],
})

export default router
