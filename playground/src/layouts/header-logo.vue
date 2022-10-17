<template>
  <div
    class="flex items-center ml-auto justify-center h-48px"
  >
    <img :src="logo" class="h-30px w-30px">
    <span class="text-4 ml-2">
      {{ title }}
    </span>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
  logo: string|object
  theme: string
  navTheme: string
}>()

</script>
