export const useMediaQueryName = () => {
  const breakpoints = reactive(useBreakpoints({
    xs: 575,
    sm: 767,
    md: 991,
    lg: 1199,
    xl: 1599,
    xxl: 1600,
  }))
  const mediaQueryInfo = computed(() => {
    const data = { name: 'xxl', minWidth: 1600, maxWidth: -1 }
    if (breakpoints.xxl) {
      data.name = 'xxl'
      data.maxWidth = -1
      data.minWidth = 1600
    }
    else if (breakpoints.xl) {
      data.name = 'xl'
      data.maxWidth = 1599
      data.minWidth = 1200
    }
    else if (breakpoints.lg) {
      data.name = 'lg'
      data.maxWidth = 1199
      data.minWidth = 992
    }
    else if (breakpoints.md) {
      data.name = 'md'
      data.maxWidth = 991
      data.minWidth = 768
    }
    else if (breakpoints.sm) {
      data.name = 'sm'
      data.maxWidth = 767
      data.minWidth = 576
    }
    else {
      data.name = 'xs'
      data.maxWidth = 575
      data.minWidth = 0
    }
    return data
  })
  const isMobile = computed(() => mediaQueryInfo.value.name === 'xs' || mediaQueryInfo.value.name === 'sm')
  return { breakpoints, mediaQueryInfo, isMobile }
}
