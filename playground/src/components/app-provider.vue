<template>
  <n-dialog-provider>
    <n-notification-provider>
      <n-message-provider>
        <n-loading-bar-provider>
          <naive-provider>
            <slot />
          </naive-provider>
        </n-loading-bar-provider>
      </n-message-provider>
    </n-notification-provider>
  </n-dialog-provider>
</template>
