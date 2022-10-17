import { menuInfoData } from '../../mock/menu-nav'

export interface MenuInfoType{
  id: number
  path: string
  title: string
  component?: string
  pid?: number
  name?: string
  icon?: string
  locale?: string
  keep_alive?: boolean
  hide_in_menu?: boolean
  hide_in_breadcrumb?: boolean
  hide_children_in_menu?: boolean
  active_menu?: string
  affix?: boolean
  target?: string
  children?: MenuInfoType[]
  redirect?: string
  is_iframe?: boolean
}

export const menuInfo = async(): Promise<MenuInfoType[]> => {
  return menuInfoData
}
