import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'

export default () => {
    // if (process.browser) {
    //     //console.log('浏览器端渲染');
    //     Vue.use(Element, { locale })
    // } else {
    //     //console.log("非浏览器端渲染");
    // }
    Vue.use(Element, { locale })
}