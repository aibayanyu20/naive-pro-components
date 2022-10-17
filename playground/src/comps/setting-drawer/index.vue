<template>
  <n-el
    tag="div"
    type="primary"
    class="flex items-center justify-center bg-[var(--primary-color)] w-48px h-48px fixed right-0 top-240px cursor-pointer"
    @click="onOpen"
  >
    <n-icon size="24" class="text-[var(--base-color)]">
      <setting-outlined />
    </n-icon>
  </n-el>
  <n-drawer v-model:show="visible" :width="300">
    <n-drawer-content>
      <body-wrapper :title="t('app.setting.pagestyle')">
        <block-checkbox v-model:value="layout.theme" :list="themeList" />
      </body-wrapper>
      <body-wrapper :title="t('app.setting.themecolor')">
        <!--        -->
      </body-wrapper>
      <n-divider />
      <body-wrapper :title="t('app.setting.navigationmode')">
        <block-checkbox v-model:value="layout.navTheme" :list="navThemeList" />
      </body-wrapper>
    </n-drawer-content>
    <n-el
      tag="div"
      type="primary"
      class="flex items-center justify-center bg-[var(--primary-color)] w-48px h-48px absolute right-300px top-240px cursor-pointer"
      @click="onClose"
    >
      <n-icon size="24" class="text-[var(--base-color)]">
        <close-outlined />
      </n-icon>
    </n-el>
  </n-drawer>
</template>

<script lang="ts" setup>
import { CloseOutlined, SettingOutlined } from '@vicons/antd'
import BodyWrapper from '~/comps/setting-drawer/body-wrapper.vue'
import BlockCheckbox from '~/comps/setting-drawer/block-checkbox.vue'
import type { ThemeItem } from '~/comps/setting-drawer/typing'
const { layout } = storeToRefs(useAppStore())
const { t } = useI18n()
const list: ThemeItem[] = [
  {
    key: 'light',
    title: t('app.setting.pagestyle.light'),
  },
  {
    key: 'dark',
    title: t('app.setting.pagestyle.dark'),
  },
  {
    key: 'real-dark',
    title: t('app.setting.pagestyle.realdark'),
  },
]
const themeList = computed(() => layout.value?.navTheme !== 'mix' ? list : list.filter(item => item.key !== 'dark'))
const navThemeList = shallowRef<ThemeItem[]>([
  {
    key: 'side',
    title: t('app.setting.layout.side'),
  },
  {
    key: 'top',
    title: t('app.setting.layout.top'),
  },
  {
    key: 'mix',
    title: t('app.setting.layout.mix'),
  },
])
let visible = $ref(false)

const onOpen = () => {
  visible = true
}
const onClose = () => {
  visible = false
}
</script>
