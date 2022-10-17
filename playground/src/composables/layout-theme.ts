export const useLayoutTheme = createGlobalState(() => useStorage('layout-theme', {
  sideWidth: 240,
  collapsed: false,
  multiTab: false,
  collapsedWidth: 48,
  collapsedIconSize: 24,
  triggerStyle: 'bar',
  headerHeight: 48,
  fixedHeader: true,
  title: 'Naive Admin Pro',
  theme: 'light',
  navTheme: 'side',
}))
