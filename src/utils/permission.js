import router from '@/router'
import { useUserStore } from '@/store/user'


// 定义白名单 
const whiteList = ['/login', '/profile', '/401', '/404', '/']

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  // 校验是否登录
  const isLoginCode = await userStore.checkLoginFn()

  // 是否在白名单中
  if (whiteList.includes(to.path)) {
    // 在白名单中 
    // 在登录状态下 不允许切换到 /login 路由  
    if (!isLoginCode && to.path === '/login') {
      return next('/') // 不继续往下运行 直接回到首页
    }

    next() // 白名单中其他情况 正常通行 
  } else {
    // 不在白名单

    // 路由是否在路由表中 获取router的所有路由 
    const allRoute = router.getRoutes()
    // findIndex 返回 满足return条件的数组项的下标   找不到就是 -1
    const routeIndex = allRoute.findIndex(item => item.path === to.path)

    // 在路由表中且登录状态
    if (routeIndex >= 0 && !isLoginCode) {
      next()
    }

    // 在路由表中 未登录
    if (routeIndex >= 0 && isLoginCode) {

      next('/401') // 没有权限访问 
    }

    // 不在路由表 
    if (routeIndex < 0) {
      next('/404')
    }
  }


})