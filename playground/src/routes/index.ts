import { createRouter, createWebHistory } from 'vue-router'
import BlankLayout from '~/layouts/blank-layout.vue'
import { useDynamicRoutes } from '~/routes/dynamic-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'blank',
      component: BlankLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('~/pages/user/login.vue'),
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('~/pages/user/register.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('~/pages/error/404.vue'),
    },
  ],
})

useDynamicRoutes(router)

export default router
