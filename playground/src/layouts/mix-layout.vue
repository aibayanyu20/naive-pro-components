<template>
  <n-layout>
    <n-layout-header
      inverted
      class="pro-admin-box-shadow text-right px-4 relative z-5"
      :style="{
        height: layout.headerHeight + 'px',
        lineHeight: layout.headerHeight + 'px',
      }"
      :class="{
        sticky: layout.fixedHeader,
        'top-0': layout.fixedHeader,
      }"
    >
      <div class="flex items-center justify-between">
        <div>
          <header-logo
            :theme="layout.theme"
            :nav-theme="layout.navTheme"
            :logo="logo"
            :title="layout.title"
          />
        </div>
        <header-view />
      </div>
    </n-layout-header>
    <n-layout has-sider>
      <n-layout-sider
        v-model:collapsed="layout.collapsed"
        :inverted="layout.theme==='dark'"
        collapse-mode="width"
        class="pro-admin-box-shadow"
        :width="layout.sideWidth"
        :collapsed-width="layout.collapsedWidth"
        style="height: calc(100vh - 48px)"
        :show-trigger="layout.triggerStyle"
      >
        <n-scrollbar style="height: calc(100% - 49px)">
          <n-menu
            v-model:value="activeKeys"
            v-model:expanded-keys="openKeys"
            :inverted="layout.theme==='dark'"
            :collapsed="layout.collapsed"
            :options="menus"
            :collapsed-width="layout.collapsedWidth"
            :collapsed-icon-size="layout.collapsedIconSize"
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
      <n-layout class="pro-admin-layout" style="height: calc(100vh - 48px)">
        <router-cache />
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import SideFooter from './side-footer.vue'
import HeaderLogo from '~/layouts/header-logo.vue'
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
