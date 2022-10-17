import type { MenuOptionRoute } from '~/routes/dynamic-router/generate-route'
import router from '~/routes'

/**
 * 为了兼容保活需要对路由进行处理
 * 所以目前的解决方案是对路由进行拉平处理
 */
export const useMenuState = createGlobalState(() => {
  const menuMap = reactive(new Map())
  const menuIdMap = reactive(new Map())
  const initMenu = (data: MenuOptionRoute[]) => {
    data.forEach((item) => {
      menuMap.set(item.origin.path, item.origin)
      menuIdMap.set(item.origin.id, item.origin)
      if (item.children)
        initMenu(item.children)
    })
  }

  const openKeys = ref<string[]>([])
  const activeKeys = ref<string>()
  watch(router.currentRoute, (route) => {
    /**
     * 先尝试从id中获取path，如果获取不到再直接用path
     * 这样做的目的是为了兼容tab页签多开的情况并使用了类似/:id的路由的匹配模式
     */
    let path = menuIdMap.get(route.meta.id)?.path ?? route.path
    const meta = route.meta
    const menu = menuMap.get(path)
    if (!menu && meta.activeMenu) {
      activeKeys.value = meta.activeMenu as string
      path = meta.activeMenu as string
    }
    else { activeKeys.value = path }
    if (path === '/') return
    if (!menu) return
    let parent = menuIdMap.get(menu.pid)
    const keys = []
    if (parent) {
      while (parent) {
        keys.push(parent.path)
        parent = menuIdMap.get(parent.pid)
      }
    }
    openKeys.value = keys.reverse()
  })

  return {
    initMenu,
    menuMap,
    openKeys,
    activeKeys,
  }
})
