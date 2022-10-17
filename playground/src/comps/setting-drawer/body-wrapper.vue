<template>
  <n-el tag="div" class="mb-24px">
    <h3 class="text-14px mb-12px">
      {{ title }}
    </h3>
    <slot />
  </n-el>
</template>

<script lang="ts" setup>
defineProps<{ title: string }>()
</script>

<style scoped>

</style>
