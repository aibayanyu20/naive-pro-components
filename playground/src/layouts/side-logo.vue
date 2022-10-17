<template>
  <div
    :style="{ width:collapsed ? collapsedWidth + 'px' :'auto' }"
    class="flex items-center h-64px truncate transition-all"
  >
    <img :src="logo" class="transition-all" :style="ml" :class="isMobile?'h-26px w-26px':'h-32px w-32px'">
    <template v-if="!collapsed">
      <n-text v-if="showBtn" class="text-4 ml-2" type="primary">
        {{ title }}
      </n-text>
      <span v-else class="text-4 ml-2">
        {{ title }}
      </span>
    </template>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  isMobile: boolean
  collapsedWidth: number
  collapsed: boolean
  title: string
  logo: string|object
  theme: string
  navTheme: string
}>()

const showBtn = computed(() => {
  if (props.isMobile)
    return true

  if (props.theme === 'light' || props.theme === 'real-dark')
    return props.navTheme === 'side'
  else
    return false
})

const ml = computed(() => {
  const w = props.collapsed ? props.collapsedWidth : 0
  const m = props.isMobile ? 26 : 32
  if (w === 0) {
    return {
      'margin-left': '32px',
    }
  }
  return {
    'margin-left': `${(w - m) / 2}px`,
  }
})
</script>
