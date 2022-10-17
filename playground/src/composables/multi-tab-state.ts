import type { RouteLocationNormalized } from 'vue-router'
import type { DefineComponent } from '@vue/runtime-core'
import type { RouterRecordRaw } from '~/routes/typing'
export interface CacheItem{
  path: string
  route: RouteLocationNormalized
  key?: string
  affix?: boolean
  title?: string
  locale?: string
  icon?: string
  tabPath?: string
}

export const useMultiTabState = createGlobalState(() => {
  const cacheMap = reactive(new Map<string|number, CacheItem>())
  const routeMap = reactive<Map<string|number, RouterRecordRaw>>(new Map())
  const current = ref<string|number>()
  const exclude = ref<string[]>([])
  const include = ref<string[]>([])
  const componentMap = new Map<string, DefineComponent>()
  const multiTabs = computed(() => [...cacheMap.values()])

  return {
    routeMap,
    cacheMap,
    current,
    exclude,
    include,
    multiTabs,
    componentMap,
  }
})
