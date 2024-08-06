import { ref, onMounted, onActivated, onDeactivated, onUnmounted } from 'vue'

export const getAutoHeight = (marginTop) => {
  const tableHeight = ref(window.innerHeight - marginTop)

  const refreshHeight = () => {
    tableHeight.value = window.innerHeight - marginTop
  }
  const refresh = (margin) => {
    marginTop = margin
    tableHeight.value = window.innerHeight - margin
  }

  onMounted(() => {
    window.addEventListener('resize', refreshHeight)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', refreshHeight)
  })

  onActivated(() => {
    window.addEventListener('resize', refreshHeight)
  })
  onDeactivated(() => {
    window.removeEventListener('resize', refreshHeight)
  })
  return { tableHeight, refresh }
} 