<template>
  <div class="pro-admin-setting-drawer-block-checkbox">
    <template v-for="item in list" :key="item.key">
      <layout-block :theme="item.key" :checked="item.key === value" @click="onChange(item.key)" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import LayoutBlock from './layout-block.vue'
import type { ThemeItem } from '~/comps/setting-drawer/typing'
defineProps<{ list: ThemeItem[];value: string }>()
const emit = defineEmits(['update:value'])
const onChange = (item: string) => {
  emit('update:value', item)
}
</script>

<style lang="less">
.pro-admin-setting-drawer{
  &-block-checkbox{
    display: flex;
    min-height: 42px;
  }
}
</style>
