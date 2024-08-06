// npm i sortablejs 

import Sortable from "sortablejs";
import { ref } from 'vue'
import { reviseRank } from '@/api/article'
import { ElMessage } from "element-plus";

export const tableRef = ref(null);

export const initSortable = (articleList, cb) => {
  // 获取 拖拽表格的 tbody元素
  let el = tableRef.value.$el.querySelector('.el-table__body tbody')

  // 初始化sortable 

  Sortable.create(el, {
    // 配置拖拽时的类名 
    ghostClass: 'sortable-ghost',

    // 拖拽结束后 的钩子
    async onEnd(event) {
      // 拖拽元素新排名  旧排名
      const { newIndex, oldIndex } = event
      console.log("新:", newIndex,);
      console.log("旧:", oldIndex,);

      // reviseRank man被拖拽的人  woman 被挤开的人 
      let man = articleList.value[newIndex]
      let woman = articleList.value[oldIndex]
      const { data } = await reviseRank({
        man,
        woman
      })
      ElMessage.success(data.txt)
      // 强制 el-table有感应 
      articleList.value = []
      cb()
    }
  })
}