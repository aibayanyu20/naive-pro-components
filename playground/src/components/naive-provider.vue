<template>
  <slot />
</template>

<script lang="ts" setup>
import { useDialog, useLoadingBar, useMessage, useNotification } from 'naive-ui'
import { useInjectGlobalConfig } from '~/composables/global-config'
const dialog = useDialog()
const loadingBar = useLoadingBar()
const message = useMessage()
const notification = useNotification()
useInjectGlobalConfig({
  dialog,
  loadingBar,
  message,
  notification,
})
</script>
