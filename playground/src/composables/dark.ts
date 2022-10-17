export const isDark = useDark()
export const toggleDark = (theme?: boolean) => {
  if (theme !== undefined)
    isDark.value = theme
  else
    useToggle(isDark)
}
export const useInitTheme = () => {
  const { layout } = storeToRefs(useAppStore())
  watch(() => layout.value.theme,
    (theme) => {
      toggleDark(theme === 'real-dark')
    },
    { immediate: true })
  watch(() => layout.value.navTheme, (navTheme) => {
    if (navTheme === 'mix' && layout.value.theme === 'dark')
      layout.value.theme = 'light'
  })
}
