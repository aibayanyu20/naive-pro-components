<template>
  <n-layout class="pro-admin-layout" style="height: 100vh;">
    <n-layout-header
      class="pro-admin-box-shadow text-right px-4 flex items-center justify-between"
      :style="{
        height: layout.headerHeight + 'px',
        lineHeight: layout.headerHeight + 'px',
      }"
      :class="{
        sticky: layout.fixedHeader,
        'top-0': layout.fixedHeader,
        'pro-admin-layout-top-inverted':headerInverted
      }"
    >
      <!--        -->
      <div class="flex items-center">
        <img :src="logo" class="w-24px h-24px">
        <!--        -->
        <n-icon size="24" class="ml-10px">
          <menu-fold-outlined v-if="!layout.collapsed" @click="handleCollapsed" />
          <menu-unfold-outlined v-else @click="handleCollapsed" />
        </n-icon>
      </div>
      <div class="flex items-center">
        <header-view />
      </div>
    </n-layout-header>
    <router-cache />
  </n-layout>
  <n-drawer
    v-model:show="layout.collapsed"
    placement="left"
    :width="208"
  >
    <n-layout has-sider>
      <n-layout-sider
        :inverted="layout.theme==='dark'"
        class="pro-admin-box-shadow"
        :width="208"
        :collapsed-width="layout.collapsedWidth"
        style="height: 100%"
      >
        <side-logo
          v-if="logoShow"
          :is-mobile="isMobile"
          :theme="layout.theme"
          :nav-theme="layout.navTheme"
          :collapsed-width="layout.collapsedWidth"
          :title="layout.title"
          :collapsed="false"
          :logo="logo"
        />
        <n-scrollbar style="height: calc(100vh - 65px)">
          <n-menu
            v-model:value="activeKeys"
            v-model:expanded-keys="openKeys"
            :inverted="layout.theme==='dark'"
            :collapsed-icon-size="layout.collapsedIconSize"
            :options="menus"
            :render-icon="menuRenderIcon"
            :render-label="menuRenderLabel"
          />
        </n-scrollbar>
      </n-layout-sider>
    </n-layout>
  </n-drawer>
</template>

<script lang="ts" setup>
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@vicons/antd'
import SideLogo from './side-logo.vue'
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

const handleCollapsed = () => {
  layout.value.collapsed = !layout.value.collapsed
}

const headerInverted = computed(() => (layout.value.navTheme === 'mix'))

const logoShow = computed(() => layout.value.navTheme !== 'mix')
</script>
