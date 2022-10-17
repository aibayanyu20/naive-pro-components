import type { MenuInfoType } from '~/api/menu'

export const menuInfoData: MenuInfoType[] = [
  {
    id: 1,
    path: '/',
    redirect: '/dashboard',
    title: '首页',
    component: 'BaseRouter',
    icon: 'DashboardOutlined',
    locale: 'pages.home',
  },
  {
    id: 2,
    pid: 1,
    path: '/dashboard',
    title: 'Dashboard',
    component: 'Dashboard',
    locale: 'pages.dashboard',
    keep_alive: true,
    // hide_in_menu: false,
    // hide_in_breadcrumb: false,
    // hide_children_in_menu: false,
    // affix: false,
    // target: '_blank',
  },
  {
    id: 3,
    path: '/workspace',
    pid: 1,
    component: 'DashboardWorkspace',
    title: '工作台',
    // icon: 'DashboardOutlined',
    locale: 'pages.dashboard.workspace',
  },
  {
    id: 4,
    pid: 1,
    path: 'https://www.baidu.com',
    title: '跳转百度',
    target: '_blank',
  },
]
