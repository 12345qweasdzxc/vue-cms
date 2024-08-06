import { useUserStore } from "@/store/user"
import { computed } from "vue"

export const getAvatar = () => {
  const userStore = useUserStore()

  const avatarSrc = computed(() => userStore.userInfo.photo || require('@/assets/default.gif')
  )

  return {
    avatarSrc
  }
}