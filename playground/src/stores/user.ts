import type { UserInfoType } from '~/api/user'
import { userInfo } from '~/api/user'
import { menuInfo } from '~/api/menu'
import type { RouterRecordRaw } from '~/routes/typing'
import type { MenuOptionRoute } from '~/routes/dynamic-router/generate-route'
import { generateRoute } from '~/routes/dynamic-router/generate-route'

export const useUserStore = defineStore('user', () => {
  const menus = ref<MenuOptionRoute[]>()
  const token = useAuthorization()
  const routes = ref<RouterRecordRaw[]>([])
  const userState = ref<UserInfoType | undefined>(undefined)

  const getUserInfo = async() => {
    // 异步接口获取用户信息
    const res = await userInfo()
    userState.value = res.data
  }

  const setToken = (token1: string) => {
    token.value = token1
  }

  const clearState = () => {
    setToken('')
    userState.value = undefined
  }

  const getMenusData = async() => {
    const menusData = await menuInfo()
    routes.value = generateRoute(menusData)
  }

  const setMenus = (menus1: MenuOptionRoute[]) => {
    menus.value = menus1
  }
  return {
    menus,
    setToken,
    userState,
    routes,
    getUserInfo,
    clearState,
    getMenusData,
    setMenus,
  }
})
