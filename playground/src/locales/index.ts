import { createI18n } from 'vue-i18n'
import zhCN from './lang/zh-CN'
import enUS from './lang/en-US'

export const defaultLocale = 'zh-CN'

const i18n = createI18n({
  legacy: false,
  missingWarn: false,
  fallbackLocale: false,
  locale: defaultLocale,
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
})

export default i18n
