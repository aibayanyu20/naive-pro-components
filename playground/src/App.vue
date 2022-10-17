<template>
  <n-config-provider :locale="locale" :theme-overrides="overrideTheme" :theme="theme" :date-locale="dateLocale">
    <n-global-style />
    <app-provider>
      <router-view />
    </app-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { darkTheme } from 'naive-ui'
import layoutTheme from '~/layouts/theme'
const { locale, dateLocale } = useInitLang()
const { layout } = useAppStore()
useInitTheme()
const theme = computed(() => isDark.value ? darkTheme : undefined)
const overrideTheme = computed(() => isDark.value ? layoutTheme : undefined)
watch(isDark, () => {
  if (isDark.value)
    layout.theme = 'real-dark'
})
</script>
