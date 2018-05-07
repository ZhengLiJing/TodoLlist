// 路由映射关系
// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

// const Login = { template: '<div>loginloginloginlogin</div>' }



export default [
	{
		path: '/',
		redirect: '/app'
	},
	{
		path: '/app',
		component: () => import('../views/todo/todo.vue'),
		props: (route) => ({
			age: route.query.age
		}),
		meta: {
			title: 'test',
			description: 'test 123'
		},
		name: 'myapp',
		children: [
			{
				path: 'test',
				component: () => import('../views/login/login.vue')
			}
		]
	},
	{
		path: '/login',
		component: () => import('../views/login/login.vue')
	}
]
