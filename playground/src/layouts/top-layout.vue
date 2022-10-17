<template>
  <n-layout class="pro-admin-layout" style="height: 100vh;">
    <n-layout-header
      class="pro-admin-box-shadow text-right px-4"
      :style="{
        height: layout.headerHeight + 'px',
        lineHeight: layout.headerHeight + 'px',
      }"
      :class="{
        sticky: layout.fixedHeader,
        'top-0': layout.fixedHeader,
      }"
      :inverted="layout.theme === 'dark'"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <header-logo
            :theme="layout.theme"
            :nav-theme="layout.navTheme"
            :logo="logo"
            :title="layout.title"
          />
          <n-menu
            v-model:value="activeKeys"
            v-model:expanded-keys="openKeys"
            :inverted="layout.theme==='dark'"
            mode="horizontal"
            :options="menus"
            :render-icon="menuRenderIcon"
            :render-label="menuRenderLabel"
          />
        </div>
        <header-view />
      </div>
    </n-layout-header>
    <router-cache />
  </n-layout>
</template>

<script lang="ts" setup>
import HeaderLogo from '~/layouts/header-logo.vue'
import HeaderView from '~/comps/header-view/index.vue'
import { menuRenderIcon, menuRenderLabel } from '~/comps/side-menu'
import RouterCache from '~/layouts/router-cache.vue'

const { layout, logo } = storeToRefs(useAppStore())
const { menus } = storeToRefs(useUserStore())
const { openKeys, activeKeys } = useMenuState()

</script>

<style lang="less">
.pro-admin-layout-top-inverted{
  background-color: rgb(0, 20, 40);
  color: #fff;
}
</style>
