<template>
  <div class="flex items-center justify-end h-100% gap-5">
    <notice-dropdown />
    <avatar-dropdown />
    <select-lang />
  </div>
</template>

<script lang="ts" setup>

import SelectLang from '~/comps/header-view/select-lang.vue'
import AvatarDropdown from '~/comps/header-view/avatar-dropdown.vue'
import NoticeDropdown from '~/comps/header-view/notice-dropdown.vue'
</script>

<style scoped>

</style>
