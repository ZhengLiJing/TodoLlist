import Router from 'vue-router'

import routes from './routes.js'

export default () => {
	return new Router({
		mode: "history",
		routes,
		// base: '/base/',
		// linkActiveClass: 'active-link',
		// linkExactActiveClass: 'exact-active-link',
	})
}


// 如果只是导出一个router，服务端渲染会内存溢出
// const router = new Router({
// 	routes
// })

// export default router
