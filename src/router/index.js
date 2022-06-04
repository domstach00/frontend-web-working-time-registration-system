import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/AboutView')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView')
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('../views/CalendarView')
  },
  {
    path: '/new-assignment',
    name: 'new assignment',
    component: () => import('../views/NewAssignmentView')
  },
  {
    path: '/new-project-group',
    name: 'new project group',
    component: () => import('../views/NewProjectGroupView')
  },
  {
    path: '/new-worker',
    name: 'new worker',
    component: () => import('../views/NewWorkerView')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
