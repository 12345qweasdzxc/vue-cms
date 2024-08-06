import { useRouteStore } from "@/store/route";
import { computed } from 'vue'
export default () => {

  const routeStore = useRouteStore()

  const menuRoute = computed(() => routeStore.menuRoute)


  let newArr = menuRoute.value.map(item => {
    item.titles = [item.title]
    return item
  })

  menuRoute.value.forEach(item => {
    if (item.children.length) {
      item.children.forEach(child => {
        child.titles = item.titles.concat(child.title)

      })

      newArr.push(...item.children)
    }
  });

  return newArr

}

