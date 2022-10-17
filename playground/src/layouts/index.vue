<template>
  <n-watermark
    v-if="watermark.show"
    cross
    fullscreen
    :font-size="16"
    :line-height="16"
    :width="384"
    :height="384"
    :x-offset="12"
    :y-offset="60"
    :rotate="-15"
    :content="watermark.content"
  />
  <base-layout />
</template>

<script lang="ts" setup>
import BaseLayout from '~/layouts/base-layout.vue'

const { watermark } = storeToRefs(useAppStore())
</script>

<style lang="less">
.pro-admin-box-shadow{
  box-shadow: var(--pro-admin-shadow-header);
}
.pro-admin-layout{
  background-color: var(--pro-admin-layout-bg);
}
.pro-admin-layout-top-inverted{
  background-color: rgb(0, 20, 40);
  color: #fff;
}
</style>
