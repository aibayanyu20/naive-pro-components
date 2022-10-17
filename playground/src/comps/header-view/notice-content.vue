<template>
  <div class="w-350px">
    <n-tabs type="line" animated justify-content="center">
      <!--  -->
      <n-tab-pane name="one" tab="通知(4)">
        <n-spin :show="show" class="h-100%">
          <div class="min-h-20">
            One
          </div>
        </n-spin>
      </n-tab-pane>
      <n-tab-pane name="two" tab="消息(3)">
        <n-spin :show="show">
          <div class="min-h-20">
            Two
          </div>
        </n-spin>
      </n-tab-pane>
      <n-tab-pane name="three" tab="待办(4)">
        <n-spin :show="show">
          <div class="min-h-20">
            Three
          </div>
        </n-spin>
      </n-tab-pane>
    </n-tabs>
    <n-divider style="margin: 0;padding-top: 10px;" />
    <div class="flex h-40px">
      <div class="flex items-center justify-center flex-1 cursor-pointer">
        清空通知
      </div>
      <n-el class="bg-[var(--border-color)] w-1px" />
      <div class="flex items-center justify-center flex-1 cursor-pointer">
        查看更多
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const show = shallowRef(true)
</script>

<style scoped>

</style>
