import SideMenuIcon from './icon.vue'
import SideMenuLabel from './label.vue'
import type { MenuOptionRoute } from '~/routes/dynamic-router/generate-route'

export const menuRenderIcon = (data: MenuOptionRoute) => {
  if (!data?.origin?.icon)
    return undefined
  return h(SideMenuIcon, { icon: data.origin.icon })
}
export const menuRenderLabel = (data: MenuOptionRoute) => {
  return h(SideMenuLabel, { menuOption: data })
}
