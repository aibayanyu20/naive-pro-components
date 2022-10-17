import type { MenuOption } from 'naive-ui'
import { camelCase } from 'lodash-es'
import type { RouterRecordRaw } from '~/routes/typing'
import type { MenuInfoType } from '~/api/menu'
import dynamicRoutes from '~/routes/dynamic-router/routes'
import { useMenuState } from '~/composables/menu-state'
export type MenuOptionRoute = MenuOption & {
  origin: MenuInfoType
  children?: MenuOptionRoute[]
  childMenus?: string[]
}

const getPathToName = (path: string): string => {
  return camelCase(path)
}

const formatRoute = (data: MenuInfoType): RouterRecordRaw => {
  const { component } = data
  let dynamicRoute
  if (component)
    dynamicRoute = dynamicRoutes[component]

  return {
    path: data.path,
    name: data?.name ?? getPathToName(data.path),
    component: dynamicRoute,
    redirect: data.redirect,
    meta: {
      title: data.title,
      icon: data.icon,
      locale: data.locale,
      hideInMenu: data.hide_in_menu,
      hideInBreadcrumb: data.hide_in_breadcrumb,
      hideChildrenInMenu: data.hide_children_in_menu,
      affix: data.affix,
      target: data.target,
      activeMenu: data.active_menu,
      keepAlive: data.keep_alive,
      pid: data.pid,
      id: data.id,
    },
  }
}

const formatMenu = (data: MenuInfoType): MenuOptionRoute => {
  return {
    key: data.path,
    origin: data,
  }
}

const generateTree = (data: MenuInfoType[]) => {
  const menuMap = new Map<number, MenuOptionRoute>()
  const { routeMap } = useMultiTabState()
  data.forEach((item) => {
    const menu = formatMenu(item)
    const route = formatRoute(item)
    menuMap.set(item.id, menu)
    routeMap.set(item.id, route)
  })
  data.forEach((item) => {
    /**
     * 当前路由不在菜单中显示
     */
    if (item.hide_in_menu) {
      menuMap.delete(item.id)
      return
    }
    if (item.pid) {
      const menu = menuMap.get(item.pid)
      if (menu && !menu.origin.hide_children_in_menu) {
        if (menu.children)
          menu.children.push(menuMap.get(item.id)!)
        else
          menu.children = [menuMap.get(item.id)!]
        menuMap.delete(item.id)
      }
      else {
        menuMap.delete(item.id)
      }
    }
  })
  return { menus: [...menuMap.values()], routes: [...routeMap.values()] }
}

export const generateRoute = (data: MenuInfoType[]): RouterRecordRaw[] => {
  const { menus, routes } = generateTree(data)
  const { initMenu } = useMenuState()
  const userStore = useUserStore()
  userStore.setMenus(menus)
  initMenu(menus)
  return routes
}
