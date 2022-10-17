import type { UnwrapRef } from 'vue'
import naiveLogo from '~/assets/image/naivelogo.svg'
import { useLayoutTheme } from '~/composables/layout-theme'
export type LayoutTheme = UnwrapRef<ReturnType<typeof useLayoutTheme>>

export const useAppStore = defineStore('app', () => {
  const lang = useLang()
  const i18n = useI18n()
  const setLang = (loc: string) => {
    lang.value = loc
    i18n.locale.value = loc
  }
  const logo = ref(naiveLogo)
  const watermark = reactive({
    show: false,
    content: 'Naive Admin Pro',
  })
  const layout = reactive<LayoutTheme>(unref(useLayoutTheme()))
  return {
    lang,
    logo,
    layout,
    watermark,
    setLang,
  }
})
