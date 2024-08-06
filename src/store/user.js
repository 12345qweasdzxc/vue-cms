import { defineStore } from "pinia";
import { login, logout, checkLogin } from '@/api/login'
import { ElMessage } from "element-plus";
import { useRouteStore } from "./route";
import router from '@/router'
import { getLocal, setLocal, removeAllItem } from "@/utils/storage";
import pinia from '@/main'

export const useUserStore = defineStore('USER', {
  state: () => {
    return {
      userInfo: getLocal('__userInfo__', {})
    }
  },
  actions: {
    loginFn(value) {
      login(value)
        .then(async ({ data }) => {
          if (!data.code) {
            // 登录成功
            this.userInfo = data.data
            setLocal('__userInfo__', data.data)

            ElMessage.success(data.txt)
            // 获取侧边菜单路由了 
            const routeStore = useRouteStore()
            await routeStore.getMenuRouteFn()
            // 预留一下位置  要配置完路由才能发生跳转 
            router.push('/')
          } else {
            // 登录失败
            ElMessage.error(data.txt)
          }
        })
    },
    logoutFn() {
      logout().then(({ data }) => {
        if (!data.code) {
          //退出登录成功 
          // 清空本地存储
          removeAllItem()

          // 清空大菠萝里面的数据 

          const allStore = [...pinia._s.values()]

          allStore.forEach(item => {
            item.$reset()
          })

          router.push('/login')
          ElMessage.success(data.txt)

        } else {
          ElMessage.success('退出登录失败')
        }
      })
    },

    checkLoginFn() {
      return new Promise((res, rej) => {
        checkLogin().then(({ data }) => {
          if (!data.code) {
            // 已登录 
            this.userInfo = data.data
            setLocal('__userInfo__', data.data)
          }
          res(data.code) // 传递成功的状态 传值 
        })
      })



    }
  },

})