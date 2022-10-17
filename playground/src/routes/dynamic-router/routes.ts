export default {
  BaseRouter: () => import('~/layouts/base-router.vue'),
  Dashboard: () => import('~/pages/dashboard/index.vue'),
  DashboardWorkspace: () => import('~/pages/dashboard/workspace.vue'),
} as Record<string, any>
