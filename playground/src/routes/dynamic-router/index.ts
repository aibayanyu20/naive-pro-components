import type { RouteRecordRaw, Router } from 'vue-router'
import Layout from '~/layouts/index.vue'
import { whiteList } from '~/routes/define-meta'

const rootRouter: RouteRecordRaw = {
  path: '/',
  name: 'index',
  component: Layout,
  redirect: '/dashboard',
  children: [],
}

export const useDynamicRoutes = (router: Router) => {
  // 动态路由
  router.beforeEach(async(to, from, next) => {
    // 判断token是否存在
    const userToken = useAuthorization()
    if (!userToken.value) {
      if (whiteList.includes(<string>to?.name))
        next()
      else
        next({ path: '/login', query: { redirect: to.fullPath }, replace: true })
    }
    else {
      /**
       * 1. 判断是否存在用户信息，如果不存在，就需要重新获取用户信息
       * 2.
       */
      const userStore = useUserStore()
      if (!userStore.userState) {
        // 用户信息不存在，那么重新获取用户的基本信息和路由信息
        await userStore.getUserInfo()
        // 整理用户的菜单信息
        await userStore.getMenusData()
        // 整理用户的路由信息
        // 动态添加路由
        rootRouter.children = userStore.routes as any
        router.addRoute(rootRouter)
        if (rootRouter)
          next({ ...to, replace: true })
        else
          next()
        return
      }
      /**
       * 如果当前进入的是登录页面的话，会自动跳转到首页
       */
      if (to.path === '/login')
        next({ path: '/' })
      else
        next()
    }
  })
}
