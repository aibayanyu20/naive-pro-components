<template>
  <multi-tab />
  <div m-6>
    <router-view v-slot="{Component}">
      <multi-tab-consumer>
        <component :is="Component" v-if="Component" />
        <slot v-else />
      </multi-tab-consumer>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { MultiTabConsumer } from '~/comps/multi-tab/consumer'
import MultiTab from '~/comps/multi-tab'
</script>

<style scoped>

</style>
