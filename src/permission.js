import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // 进度条配置

const whiteList = ['/login', '/auth-redirect'] // 白名单

router.beforeEach(async (to, from, next) => {
  NProgress.start() // 开始进程条

  document.title = getPageTitle(to.meta.title)// 设置页面标题

  // 确定用户是否已登录
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，请重定向到主页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 确定用户是否已通过getInfo获得其权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0

      if (hasRoles) {
        next()
      } else {
        try {
          const { roles } = await store.dispatch('user/getInfo') // 获取用户信息
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)// 当前角色权限路由

          router.addRoutes(accessRoutes) // 动态添加可访问路由

          // hack方法确保addRoutes是完整的replace:true，这样导航就不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // 移除token并转到登录页以重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* 没有token 判断是否在白名单内*/
    if (whiteList.indexOf(to.path) !== -1) {
      next() // 页面在白名单内，直接进去
    } else {
      // 没有访问权限的其他页将重定向到登录页。
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()// 完成进度条
})
