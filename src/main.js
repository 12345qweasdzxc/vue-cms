import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/scss/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import installIcon from './icons'
import { createPinia } from 'pinia'
import '@/utils/permission'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const pinia = createPinia()

const app = createApp(App)
export default pinia

installIcon(app)

app.use(pinia)

app.use(router).use(ElementPlus, { locale: zhCn }).mount('#app')
