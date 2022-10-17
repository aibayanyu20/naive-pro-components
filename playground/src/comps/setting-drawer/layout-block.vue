<template>
  <n-el
    tag="div"
    class="pro-admin-setting-drawer-block-checkbox-item"
    :class="cls"
  >
    <div class="inner" />
    <span
      role="img"
      aria-label="check"
      class="anticon anticon-check select-icon"
      :style="{ display: checked ? 'block' : 'none' }"
    >
      <svg
        viewBox="64 64 896 896"
        focusable="false"
        data-icon="check"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"
        />
      </svg>
    </span>
  </n-el>
</template>

<script lang="ts" setup>
const props = defineProps<{ theme: 'light' | 'dark' | 'real-dark' | 'side' | 'top' | 'mix' | 'left';checked?: boolean }>()
const cls = computed(() => `pro-admin-setting-drawer-block-checkbox-item-${props.theme}`)
</script>

<style lang="less">
@white: #fff;
@menu-dark-bg: #001529;
.pro-admin-setting-drawer-block-checkbox-item{
  position: relative;
  width: 44px;
  height: 36px;
  margin-right: 16px;
  overflow: hidden;
  background-color: #f0f2f5;
  border-radius: 4px;
  box-shadow: 0 1px 2.5px 0 rgba(0, 0, 0, 0.18);
  cursor: pointer;
  > .inner {
    display: none;
  }
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 33%;
    height: 100%;
    background-color: @white;
    content: '';
  }
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 25%;
    background-color: @white;
    content: '';
  }
  &-light {
    &::before {
      background-color: @white;
      content: '';
    }
    &::after {
      background-color: @white;
    }
  }
  &-dark,
  &-side {
    &::before {
      z-index: 1;
      background-color: @menu-dark-bg;
      content: '';
    }
    &::after {
      background-color: @white;
    }
  }
  &-top {
    &::before {
      background-color: unset;
      content: none;
    }
    &::after {
      background-color: @menu-dark-bg;
    }
  }
  &-mix {
    &::before {
      background-color: @white;
      content: ' ';
    }
    &::after {
      background-color: @menu-dark-bg;
    }
  }
  &-real-dark {
    background-color: fade(@menu-dark-bg, 85%);
    &::before {
      z-index: 1;
      background-color: fade(@menu-dark-bg, 65%);
      content: '';
    }
    &::after {
      background-color: fade(@menu-dark-bg, 85%);
    }
  }
  // 亮色主题
  &-light {
    &::before {
      background-color: @white;
      content: '';
    }
    &::after {
      background-color: @white;
    }
  }
  &-left {
    &::before {
      z-index: 1;
      width: 16%;
      background-color: @menu-dark-bg;
      content: '';
    }
    > .inner {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 33%;
      height: 100%;
      background-color: @white;
      content: '';
    }
  }
  .select-icon {
    position: absolute;
    right: 6px;
    bottom: 4px;
    color: var(--primary-color);
    font-weight: 700;
    font-size: 14px;
    pointer-events: none;
  }
  .anticon{
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    vertical-align: -0.125em;
    font-size: 1.25em;
    //color: var(--parimary-color);
  }
}
</style>
