export const STORAGE_LANG_KEY = 'lang'

export const useLang = createGlobalState(() => useStorage(STORAGE_LANG_KEY, 'zh-CN'))

export const useInitLang = () => {
  const i18n = useI18n()
  const lang = useLang()
  const appStore = useAppStore()
  if (lang.value)
    appStore.setLang(lang.value)

  const naive = computed<{ locale: any;dateLocale: any }>(() => (i18n.getLocaleMessage(i18n.locale.value) as any).naive)
  const locale = computed(() => naive.value.locale)
  const dateLocale = computed(() => naive.value.dateLocale)
  return {
    locale,
    dateLocale,
  }
}
