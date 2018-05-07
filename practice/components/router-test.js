import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const Foo = {
	template: `
		<div>
			<h1>Home</h
			<p>
				<router-link to="/foo/phone">mobile</router-link>
				<router-link to="/foo/tablet">tablet</router-link>
				<router-link to="/foo/pc">pc</router-link>
				<router-view></router-view>
			</p>
		</div>
	`,
	computed: {
		dynamicSegment() {
			return this.$route.params.id
		}
	}
}
const Bar = {
	template: '<div>bar {{ dynamicSegment }}</div>',
	computed: {
		dynamicSegment() {
			return this.$route.params.id + 100
		}
	}
}

const Phone = {
	template: `
		<div>
            phone
		</div>
	`,
}

const Tablet = {
	template: `
		<div>
			tablet
		</div>
	`,
}

const Pc = {
	template: `
		<div>
            pc
		</div>
	`,
}

const routes = [
	{
		path: '/',
		redirect: '/foo',
	},
	{
		path: '/foo',
		component: Foo,
		name: 'foo',
		children: [
			{
				path: 'phone',
				component: Phone
			},
			{
				path: 'tablet',
				component: Tablet
			},
			{
				path: 'pc',
				component: Pc
			},
			{
				path: '',
				component: Phone
			}
		]

	},
	{
		path: '/bar',
		component: Bar,
		name: 'bar'
	}
]

const router = new VueRouter({
	routes,
	mode: 'history'
})

new Vue({
	el: '#root',
	router,
	template: `
		<div>
			<router-view></router-view>
		</div>
	`,
	watch: {
		$route(to,from) {
			console.log(to, from) // eslint-disable-line
		}
	}
})

