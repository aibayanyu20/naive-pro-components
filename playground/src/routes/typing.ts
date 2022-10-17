export interface RouteRawMeta {
  // 标题
  title: string
  // 图标
  icon?: string
  // 多语言
  locale?: string
  // 当前路由在菜单中不展现，默认 false。
  hideInMenu?: boolean
  //  当前路由在面包屑中不展现，默认 false。
  hideInBreadcrumb?: boolean
  // 当前路由的子级在菜单中不展现，默认 false。
  hideChildrenInMenu?: boolean
  // 是否在面包屑锁定标签
  affix?: boolean
  // 如果是链接以什么方式打开新页签默认是undefined 支持 _blank 、_self
  target?: '_blank' | '_self' | string
  id?: number | string
  pid?: number | string
  // 自定义当前激活的菜单
  activeMenu?: string
  // 是否允许多开页签
  allowMultiTab?: boolean
  // 是否保活
  keepAlive?: boolean
  // 是否启用iframe模式，前提是path是一个完整的url
  isIframe?: boolean
  [key: string]: any
}

export interface RouterRecordRaw {
  meta?: RouteRawMeta
  component?: string
  path: string
  name: string
  redirect?: string
  children?: RouterRecordRaw[]
  props?: any
  [key: string]: any
}
