import { omit } from 'lodash-es'
import { KeepAlive } from 'vue'
import type { RouteLocationNormalized } from 'vue-router'
import type { DefineComponent } from '@vue/runtime-core'
import type { CacheItem } from '~/composables/multi-tab-state'
import { flattenChildren } from '~/utils/vnode-utils'

let cacheKey = 1

export const getCacheKey = () => {
  return `CacheKey_${cacheKey++}`
}

export const MultiTabConsumer = defineComponent({
  name: 'MultiTabConsumer',
  setup(_props, { slots }) {
    const { cacheMap, current, exclude, componentMap } = useMultiTabState()
    const route = useRoute()
    const allowMultiTab = computed(() => route.meta.allowMultiTab)
    let cacheItem = $ref<CacheItem>()
    watch(
      () => route.fullPath,
      () => {
        const currentPath = allowMultiTab.value ? route.fullPath : route.path
        current.value = currentPath
        cacheItem = cacheMap.get(currentPath) as CacheItem
        const cacheInfo: CacheItem = {
          path: route.path,
          title: route?.meta?.title as string,
          locale: route?.meta?.locale as string,
          affix: !!route?.meta?.affix,
          route: { ...omit(route, ['matched']) } as RouteLocationNormalized,
          tabPath: currentPath,
        }
        if (!cacheItem) {
          cacheInfo.key = getCacheKey()
          cacheItem = cacheInfo
          cacheMap.set(currentPath, cacheItem)
        }
        else if (cacheItem.path !== route.path) {
          cacheInfo.key = getCacheKey()
          cacheMap.delete(currentPath)
          cacheMap.set(currentPath, cacheInfo)
        }
      }, { immediate: true })
    return () => {
      const component = flattenChildren(slots.default?.() || [])[0]
      if (!component)
        return null
      const excludePaths = [...exclude.value]
      if (route.meta.keepAlive === false)
        excludePaths.push(cacheItem.key!)
      const newComp: DefineComponent = componentMap.get(cacheItem.key!) || defineComponent({
        name: cacheItem.key,
        setup(props, { attrs }) {
          return () => h(component, { ...props, ...attrs })
        },
      })
      componentMap.set(cacheItem.key!, newComp)

      return <KeepAlive exclude={excludePaths}>
        {h(newComp, { key: cacheItem.key + route.fullPath })}
      </KeepAlive>
    }
  },
})
