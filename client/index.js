import Vue from 'vue'
import APP from './app.vue'

import './assets/styles/global.styl'

const root = document.createElement('div')
root.setAttribute('id', 'myApp')
document.body.appendChild(root)

// 先在文档外渲染，之后再将它插入文档：
new Vue({
  render: (h) => h(APP)
}).$mount(root)
