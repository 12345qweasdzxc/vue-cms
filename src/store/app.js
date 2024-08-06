import { defineStore } from "pinia";
import { getLocal, setLocal } from "@/utils/storage";
import getRoutePool from '@/assets/js/handleData'
import { toRaw } from "vue";

export const useAppStore = defineStore('APP', {
  state: () => {
    return {
      sidebarOpened: getLocal('__sidebarOpened__', true),
      tagsViewList: getLocal('__tagsViewList__', [])
    }
  },
  actions: {
    changeSidebarOpened() {
      this.sidebarOpened = !this.sidebarOpened
      setLocal('__sidebarOpened__', this.sidebarOpened)
    },

    addTagViewList(tag) {
      // tag 将要新增的 tag 
      const routePool = getRoutePool()
      // 判断是否是菜单项路由 
      const isFind = routePool.find(item => item.path === tag.path)

      if (!isFind) return

      //判断是否在 tagsViewList 已经存在

      const isExit = this.tagsViewList.find(item => item.path === tag.path)

      if (!isExit) {
        // 不存在时
        this.tagsViewList.push(tag)
        setLocal('__tagsViewList__', toRaw(this.tagsViewList))
      }
    },

    removeTagViewList(type, index) {
      let tagsViewList = this.tagsViewList

      switch (type) {
        case 'me':
          tagsViewList.splice(index, 1)
          break;
        case 'other':
          tagsViewList = tagsViewList.splice(index, 1)
          break;
        case 'right':
          tagsViewList.splice(index + 1)
          break;
      }

      console.log(this.tagsViewList);

      this.tagsViewList = tagsViewList


      setLocal('__tagsViewList__', toRaw(this.tagsViewList))

    }

  },

})