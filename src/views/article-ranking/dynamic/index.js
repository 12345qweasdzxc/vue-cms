import { ref, computed } from 'vue'

const dynamicRaw = [
  { label: '排名', prop: 'rank' },
  { label: '标题', prop: 'title' },
  { label: '作者', prop: 'author' },
  { label: '日期', prop: 'date' },
  { label: '描述', prop: 'description' },
]
// 复选框选项
export const dynamicData = ref(dynamicRaw) // 源数据 


// 已选选项 (勾选上的)  展示 
export const selectDynamic = ref([])

const initSelectDynamic = () => {
  // ['排名', '日期'] 
  selectDynamic.value = dynamicData.value.map(item => item.label)
}
initSelectDynamic()

export const tableColumns = computed(() => {
  return dynamicData.value.filter(item => selectDynamic.value.includes(item.label))
})



