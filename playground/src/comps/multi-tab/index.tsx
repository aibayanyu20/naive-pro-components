import { NEl, NTabPane, NTabs } from 'naive-ui'
export default defineComponent({
  name: 'MultiTab',
  inheritAttrs: false,
  setup() {
    const { cacheMap, current } = useMultiTabState()
    const onChangeValue = (val: string) => {
      // eslint-disable-next-line no-console
      console.log(val)
    }
    return () => {
      const tabs = Array.from(cacheMap.values()).map((item) => {
        return <NTabPane
          key={item.key}
          tab={item.title}
          name={item.tabPath!}
        />
      })
      const tabSlots = {
        default: tabs.length > 0 ? () => tabs : undefined,
      }
      return (
        <NEl tag={'div'} class={'bg-[var(--body-color)]'}>
          <NTabs tabs-padding={10} class={'py-2'} type={'card'} value={current.value} onUpdate:value={onChangeValue} v-slots={tabSlots}/>
        </NEl>
      )
    }
  },
})
