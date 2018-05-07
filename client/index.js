import Vue from 'vue'
import APP from './app.vue'
import VueRouter from 'vue-router'

import './assets/styles/global.styl'
import createRouter from './config/router'

Vue.use(VueRouter)

const router = createRouter()
router.beforeEach((to,from,next) => {
	console.log(to,from) // eslint-disable-line
	next()
})
// 先在文档外渲染，之后再将它插入文档：
new Vue({
	router,
render: (h) => h(APP)
}).$mount('#root')
