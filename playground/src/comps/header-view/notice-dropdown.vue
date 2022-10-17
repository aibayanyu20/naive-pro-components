<template>
  <n-dropdown
    trigger="click"
    :options="options"
    placement="bottom-end"
    :menu-props="menuProps"
  >
    <n-badge value="1" :show="show">
      <n-icon size="20" :color="styleColor">
        <bell-outlined />
      </n-icon>
    </n-badge>
  </n-dropdown>
</template>

<script lang="ts" setup>
import { BellOutlined } from '@vicons/antd'
import type { DropdownOption } from 'naive-ui'
import NoticeContent from './notice-content.vue'
const show = shallowRef(false)
const { layout } = storeToRefs(useAppStore())

const styleColor = computed(() => {
  if (layout.value?.navTheme === 'mix')
    return '#fff'

  if (layout.value?.navTheme === 'side') {
    if (layout.value?.theme === 'dark')
      return '#000'
  }
  if (layout.value.theme === 'dark' || layout.value.theme === 'real-dark')
    return '#fff'

  return '#000'
})

const options = shallowRef([
  {
    label: '测试',
    key: 'test',
    type: 'render',
    render: () => h(NoticeContent),
  },
])
const menuProps = (option: DropdownOption) => {
  return {
    style: '--n-padding:0;',
  }
}
</script>

<style lang="less">
.pro-admin-notice-dropdown{
  .n-dropdown-menu,.n-dropdown-menu:not(.n-dropdown-menu--scrollable){
    padding-bottom: 0!important;
  }
}
</style>
