<template>
  <n-dropdown :value="appStore.lang" :options="options" @select="onSelect">
    <n-icon size="20">
      <lang-icon />
    </n-icon>
  </n-dropdown>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue'
import LangIcon from '~/comps/header-view/lang-icon.vue'
const appStore = useAppStore()
const options = shallowRef([
  {
    label: '🇨🇳 简体中文',
    key: 'zh-CN',
  },
  {
    label: '🇺🇸 English',
    key: 'en-US',
  },
])
const onSelect = (key: string) => {
  appStore.setLang(key)
}
</script>

<style scoped>

</style>
