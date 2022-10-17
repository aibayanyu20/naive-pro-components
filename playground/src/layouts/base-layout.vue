<template>
  <div>
    <n-layout>
      <template v-if="isMobile">
        <mobile-layout />
      </template>
      <template v-else-if="layout.navTheme === 'side'">
        <side-layout />
      </template>
      <template v-else-if="layout.navTheme === 'top'">
        <top-layout />
      </template>
      <template v-else-if="layout.navTheme==='mix'">
        <mix-layout />
      </template>
    </n-layout>
    <setting-drawer />
  </div>
</template>

<script lang="ts" setup>
import SideLayout from './side-layout.vue'
import TopLayout from './top-layout.vue'
import MixLayout from './mix-layout.vue'
import { SettingDrawer } from '~/comps'
import MobileLayout from '~/layouts/mobile-layout.vue'
const { isMobile, mediaQueryInfo } = useMediaQueryName()
const { layout } = storeToRefs(useAppStore())
watch(mediaQueryInfo, (val) => {
  layout.value.collapsed = val.minWidth <= 991
})
</script>

<style lang="less">
.pro-admin-box-shadow{
  box-shadow: var(--pro-admin-shadow-header);
}
.n-layout{
  .pro-admin-layout{
    background-color: var(--pro-admin-layout-bg);
  }
}

</style>
