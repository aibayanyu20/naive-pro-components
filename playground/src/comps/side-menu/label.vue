<template>
  <template v-if="isLink">
    <a
      :href="data.path"
      :target="data.target"
    >
      {{ data.locale ? isCommon($t(data.locale),data.locale,data.title) : data.title }}
    </a>
  </template>
  <template v-else>
    <!--    判断当前是不是有子节点-->
    <template v-if="isChild">
      {{ data.locale ? isCommon($t(data.locale),data.locale,data.title) : data.title }}
    </template>
    <template v-else>
      <router-link :to="data.path">
        {{ data.locale ? isCommon($t(data.locale),data.locale,data.title) : data.title }}
      </router-link>
    </template>
  </template>
</template>

<script lang="ts" setup>
import type { MenuOptionRoute } from '~/routes/dynamic-router/generate-route'
const props = defineProps<{ menuOption: MenuOptionRoute }>()
const data = computed(() => props.menuOption.origin)
const isLink = data.value.path.startsWith('http')
const isChild = computed(() => props.menuOption.children && props.menuOption.children.length > 0)
const isCommon = (target: string, locale: string, def: string): string => {
  if (target === locale)
    return def

  return target
}
</script>
