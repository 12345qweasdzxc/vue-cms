import { defineStore } from "pinia";
import { getRoute } from "@/api/menuRoute";
import { getLocal, setLocal } from "@/utils/storage";


export const useRouteStore = defineStore('ROUTE', {
  state: () => {
    return {
      menuRouteRaw: getLocal('__menuRoute__', [])
    }
  },
  actions: {
    getMenuRouteFn() {
      getRoute().then(({ data }) => {
        this.menuRouteRaw = data
        setLocal('__menuRoute__', data)
      })
    }
  },

  getters: {
    menuRoute() {
      return this.menuRouteRaw.length ? this.menuRouteRaw : [{
        children: []
        , icon: "user"
        , path: "/profile"
        , title: "个人中心"
      }]
    }
  }
})