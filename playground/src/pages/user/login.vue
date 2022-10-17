<template>
  <n-el tag="div" class="py-20px flex flex-col items-center justify-center">
    <div class="flex items-center">
      <img :src="logo" class="w-44px h-44px">
      <span class="ml-3 text-33px font-600">
        Naive Admin Pro
      </span>
    </div>
    <div class="flex items-center text-[var(--text-color-3)] mt-12px mb-40px">
      <span>{{ $t('login.desc') }}</span>
    </div>
    <div class="w-350px mx-auto my-0">
      <n-tabs default-value="username" type="line" justify-content="space-evenly">
        <n-tab-pane name="username" :tab="$t('login.account.tab')">
          <n-form ref="dataFormRef" label-align="left" label-placement="left" :model="data" :rules="dataRules">
            <n-form-item path="username">
              <n-input
                v-model:value="data.username"
                :placeholder="$t('login.username.placeholder')"
                @keyup.enter="onLogin"
              >
                <template #prefix>
                  <n-icon :component="UserOutlined" />
                </template>
              </n-input>
            </n-form-item>
            <n-form-item path="password">
              <n-input
                v-model:value="data.password"
                type="password"
                show-password-on="click"
                :placeholder="$t('login.password.placeholder')"
                @keyup.enter="onLogin"
              >
                <template #prefix>
                  <n-icon :component="LockOutlined" />
                </template>
              </n-input>
            </n-form-item>
            <n-form-item>
              <div class="w-100% flex items-center justify-between">
                <n-checkbox @keyup.enter="onLogin">
                  {{ $t('login.remember-me') }}
                </n-checkbox>
                <n-el tag="a" class="cursor-pointer text-[var(--primary-color)]">
                  {{ $t('login.forgot-password') }}
                </n-el>
              </div>
            </n-form-item>
          </n-form>
          <n-button type="primary" block :loading="loading" @keyup.enter="onLogin" @click="onLogin">
            {{ $t('login.login') }}
          </n-button>
        </n-tab-pane>
        <n-tab-pane name="mobile" :tab="$t('login.mobile.tab')">
          <n-form ref="mobileFormRef" :rules="mobileRules" :model="mobileData" label-align="left" label-placement="left">
            <n-form-item path="mobile">
              <n-input
                v-model:value="mobileData.mobile"
                :placeholder="$t('login.mobile.placeholder')"
                @keyup.enter="onMobileLogin"
              >
                <template #prefix>
                  <n-icon :component="MobileOutlined" />
                </template>
              </n-input>
            </n-form-item>
            <n-form-item path="code">
              <n-input-group>
                <n-input
                  v-model:value="mobileData.code"
                  :placeholder="$t('login.mobile.verification-code.placeholder')"
                  @keyup.enter="onMobileLogin"
                >
                  <template #prefix>
                    <n-icon :component="LockOutlined" />
                  </template>
                </n-input>
                <n-button :loading="codeBtn.loading" :disabled="codeBtn.disabled" @click="getCode">
                  {{ !codeBtn.starter ? $t('login.mobile.verification-code.get-verification-code') : codeBtn.counter + 's ' + $t('login.mobile.resend') }}
                </n-button>
              </n-input-group>
            </n-form-item>
            <n-form-item>
              <div class="w-100% flex items-center justify-between">
                <n-checkbox @keyup.enter="onMobileLogin">
                  {{ $t('login.remember-me') }}
                </n-checkbox>
                <n-el tag="a" class="cursor-pointer text-[var(--primary-color)]">
                  {{ $t('login.forgot-password') }}
                </n-el>
              </div>
            </n-form-item>
          </n-form>
          <n-button type="primary" block :loading="loading" @keyup.enter="onMobileLogin" @click="onMobileLogin">
            {{ $t('login.login') }}
          </n-button>
        </n-tab-pane>
      </n-tabs>
      <n-el tag="div" class="mt-24px flex  items-center">
        {{ $t('login.sign-in-with') }}
        <n-icon size="24" class="cursor-pointer text-[var(--text-color-3)] hover:text-[var(--primary-color)]">
          <github-outlined />
        </n-icon>
      </n-el>
    </div>
  </n-el>
</template>

<script lang="ts" setup>
import { GithubOutlined, LockOutlined, MobileOutlined, UserOutlined } from '@vicons/antd'
import type { FormInst } from 'naive-ui'
import type { FormRules } from 'naive-ui/lib'
import logo from '~/assets/image/naivelogo.svg'
import type { LoginMobileParams, LoginParams } from '~/api/user'
import { login, sendCode } from '~/api/user'
let loading = $ref(false)
const globalConfig = useGlobalConfig()
const router = useRouter()
const { t } = useI18n()
/**
 * 账号密码登录
 */
const data = reactive<LoginParams>({
  username: null,
  password: null,
})

const onJump = () => {
  router.currentRoute.value.query.redirect ? router.push(router.currentRoute.value.query.redirect as string) : router.push('/')
}

const userStore = useUserStore()
const dataFormRef = $ref<FormInst | null>(null)
const dataRules = reactive<FormRules>({
  username: [
    {
      required: true,
      // message: '请输入用户名',
      renderMessage: () => t('login.username.required'),
      trigger: 'blur',
    },
    {
      min: 5,
      max: 20,
      // message: '用户名长度在 5 到 20 个字符',
      renderMessage: () => t('login.username.length'),
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      // message: '请输入密码',
      renderMessage: () => t('login.password.required'),
      trigger: 'blur',
    },
    {
      min: 5,
      max: 20,
      // message: '密码长度在 5 到 20 个字符',
      renderMessage: () => t('login.password.length'),
      trigger: 'blur',
    },
  ],
})
const onLogin = async() => {
  loading = true
  try {
    await dataFormRef?.validate()
    const res = await login(data)
    loading = false
    if (res.data?.token) {
      userStore.setToken(res.data.token)
      onJump()
    }
    else { globalConfig?.message?.error('登录失败') }
  }
  catch (e) {
    loading = false
  }
}

/**
 * 手机号登录
 */
const mobileFormRef = $ref<FormInst | null>(null)
const mobileData = reactive<LoginMobileParams>({
  mobile: null,
  code: null,
  type: 'mobile',
})

const mobileRules = reactive<FormRules>({
  mobile: [
    {
      key: 'mobile',
      required: true,
      // message: '请输入手机号',
      trigger: 'blur',
      renderMessage: () => t('login.mobile.required'),
    },
    {
      key: 'mobile',
      pattern: /^1[3456789]\d{9}$/,
      // message: '手机号格式不正确',
      renderMessage: () => t('login.mobile.rule'),
      trigger: 'blur',
    },
  ],
  code: [
    {
      required: true,
      // message: '请输入验证码',
      trigger: 'blur',
      renderMessage: () => t('login.mobile.verification-code.required'),
    },
    {
      pattern: /^\d{6}$/,
      message: '验证码格式不正确',
      renderMessage: () => t('login.mobile.verification-code.rule'),
      trigger: 'blur',
    },
  ],
})

const onMobileLogin = async() => {
  loading = true
  try {
    await mobileFormRef?.validate()
    const res = await login(mobileData)
    loading = false
    if (res.data?.token) {
      userStore.setToken(res.data.token)
      onJump()
    }
    else { globalConfig?.message?.error('登录失败') }
  }
  catch (e) {
    loading = false
  }
}

const codeBtn = reactive({
  counter: 120,
  loading: false,
  disabled: false,
  starter: false,
})

const getCode = async() => {
  // 获取验证码
  codeBtn.loading = true
  codeBtn.disabled = true
  try {
    await mobileFormRef?.validate(undefined, rule => rule?.key === 'mobile')
    await sendCode({ mobile: mobileData.mobile })
    codeBtn.starter = true
    codeBtn.loading = false
    codeBtn.counter = 120
    const timer = setInterval(() => {
      codeBtn.counter--
      if (codeBtn.counter === 0) {
        codeBtn.starter = false
        codeBtn.disabled = false
        clearInterval(timer)
      }
    }, 1000)
  }
  catch (e) {
    codeBtn.loading = false
    codeBtn.counter = 120
    codeBtn.disabled = false
    codeBtn.starter = false
  }
}

</script>

<style lang="less">

</style>
