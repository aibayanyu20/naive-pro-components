<template>
  <n-dropdown v-if="userStore.userState" :options="options" @select="onSelect">
    <div class="inline-flex items-center justify-center">
      <n-avatar
        round
        size="small"
        :src="userStore.userState?.avatar || 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'"
      />
      <span class="ml-2">{{ userStore.userState?.nickname || userStore.userState?.username }}</span>
    </div>
  </n-dropdown>
  <n-spin v-else :size="20" />
</template>

<script lang="ts" setup>
const { t } = useI18n()
const router = useRouter()
const userStore = useUserStore()

const options = shallowRef([
  {
    label: () => t('account.center'),
    key: '/account/center',
  },
  {
    label: () => t('account.settings'),
    key: '/account/settings',
  },
  {
    type: 'divider',
    key: 'd1',
  },
  {
    label: () => t('account.logout'),
    key: 'logout',
  },
])
const globalConfig = useGlobalConfig()
const handleLogout = () => {
  userStore.clearState()
  router.push({
    path: '/login',
    query: {
      redirect: router.currentRoute.value.fullPath,
    },
  })
  globalConfig.message?.success?.(t('account.logout.success'))
}

const onSelect = (key: string) => {
  if (key === 'logout')
    handleLogout()
  else
    router.push({ path: key })
}
</script>

<style scoped>

</style>
