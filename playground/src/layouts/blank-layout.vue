<template>
  <n-el tag="div" class="pro-admin-user-normal-container flex flex-col h-screen overflow-auto bg-[var(--body-color)]">
    <n-el tag="div" class="w-screen h-48px flex items-center justify-end px-10">
      <n-icon size="20">
        <select-lang />
      </n-icon>
    </n-el>
    <div class="flex-1">
      <router-view />
    </div>
    <div class="flex flex-grow-0 flex-shrink-0 flex-basis-auto items-center justify-center flex-col text-[var(--text-color-3)] mt-48px mb-24px">
      <div class="flex items-center">
        <span class="mr-10">Naive Admin Pro</span>
        <n-icon :size="18">
          <github-outlined />
        </n-icon>
        <span class="ml-10">Naive UI</span>
      </div>
      <div class="mt-2">
        &copy; 2022 爱吧烟雨网络科技工作室出品
      </div>
    </div>
  </n-el>
</template>

<script lang="ts" setup>
import { GithubOutlined } from '@vicons/antd'
import SelectLang from '~/comps/header-view/select-lang.vue'

</script>

<style lang="less">
.pro-admin-user-normal-container{
  background-image: url("https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg");
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
}
</style>
