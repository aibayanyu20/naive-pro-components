<template>
  <n-icon v-if="icon">
    <component :is="routeIcons[icon]" />
  </n-icon>
</template>

<script lang="ts" setup>
import * as routeIcons from '@vicons/antd'
defineProps<{ icon?: string }>()
</script>

<style scoped>

</style>
