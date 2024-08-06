import SvgIcon from '@/components/SvgIcon/SvgIcon'


// 完成svg的注册 
// 要检索的文件目录  是否检索子文件  检索匹配规则
const svgRequire = require.context('./svg', false, /\.svg$/)

svgRequire.keys().forEach(icon => {
  svgRequire(icon) // 完整资源的注册
})

export default (app) => {
  // 完成组件的全局注册 
  app.component('svg-icon', SvgIcon)
}

