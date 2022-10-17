<template>
  <n-layout has-sider>
    <n-layout-sider
      v-model:collapsed="layout.collapsed"
      :inverted="layout.theme==='dark'"
      class="pro-admin-box-shadow"
      :width="layout.sideWidth"
      collapse-mode="width"
      :collapsed-width="layout.collapsedWidth"
      style="height: 100vh"
      :show-trigger="layout.triggerStyle"
    >
      <side-logo
        :is-mobile="isMobile"
        :theme="layout.theme"
        :nav-theme="layout.navTheme"
        :collapsed-width="layout.collapsedWidth"
        :collapsed="layout.collapsed"
        :title="layout.title"
        :logo="logo"
      />
      <n-scrollbar style="height: calc(100vh - 113px)">
        <n-menu
          v-model:value="activeKeys"
          v-model:expanded-keys="openKeys"
          :inverted="layout.theme==='dark'"
          :collapsed="layout.collapsed"
          :collapsed-width="layout.collapsedWidth"
          :collapsed-icon-size="layout.collapsedIconSize"
          :options="menus"
          :render-icon="menuRenderIcon"
          :render-label="menuRenderLabel"
        />
      </n-scrollbar>
      <side-footer
        v-model:collapsed="layout.collapsed"
        :inverted="layout.theme==='dark'"
        :is-mobile="isMobile"
        :collapsed-width="layout.collapsedWidth"
      />
    </n-layout-sider>
    <n-layout class="pro-admin-layout" style="height: 100vh;">
      <n-layout-header
        class="pro-admin-box-shadow text-right px-4"
        :style="{
          height: layout.headerHeight + 'px',
          lineHeight: layout.headerHeight + 'px',
        }"
        :class="{sticky: layout.fixedHeader,'top-0': layout.fixedHeader}"
      >
        <header-view />
      </n-layout-header>
      <router-cache />
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import SideLogo from './side-logo.vue'
import SideFooter from './side-footer.vue'
import HeaderView from '~/comps/header-view/index.vue'
import { menuRenderIcon, menuRenderLabel } from '~/comps/side-menu'
import RouterCache from '~/layouts/router-cache.vue'
const { isMobile, mediaQueryInfo } = useMediaQueryName()
const { layout, logo } = storeToRefs(useAppStore())
const { menus } = storeToRefs(useUserStore())
const { openKeys, activeKeys } = useMenuState()

watch(mediaQueryInfo, (val) => {
  layout.value.collapsed = val.minWidth <= 991
})
</script>
