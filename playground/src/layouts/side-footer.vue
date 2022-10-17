<template>
  <n-el
    tag="div"
    class="box-border b-t-1 b-[var(--border-color)]"
    :style="inverted ? '--border-color:rgba(255, 255, 255, 0.24);' : '' "
  >
    <div
      class="h-48px flex items-center justify-center transition-all duration-300"
      :style="{width:collapsedWidth + 'px'}"
    >
      <!--  -->
      <n-button text>
        <n-icon size="20">
          <menu-fold-outlined v-if="!collapsed" :class="inverted ? 'text-white' : ''" @click="handleCollapsed" />
          <menu-unfold-outlined v-else :class="inverted ? 'text-white' : ''" @click="handleCollapsed" />
        </n-icon>
      </n-button>
    </div>
  </n-el>
</template>

<script lang="ts" setup>
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@vicons/antd'
const props = defineProps<{ isMobile: boolean ;collapsedWidth: number ;collapsed: boolean;inverted: boolean }>()

const emit = defineEmits(['update:collapsed'])

const handleCollapsed = () => {
  emit('update:collapsed', !props.collapsed)
}

</script>
