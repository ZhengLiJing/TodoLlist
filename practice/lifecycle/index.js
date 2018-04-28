/*eslint no-undef: "error"*/
/*eslint-env browser*/
/*eslint no-console: ["error", { allow: ["warn", "error"] }] */

import Vue from 'vue'

const app = new Vue({
	// el: '#root',
	// template: '<div>{{text}}</div>',
	data: {
		text: 10
	},
	beforeCreate() {
		console.warn(this.$el, 'beforeCreate')
	},
	created() {
		console.warn(this.$el, 'created')
	},
	beforeMount() {
		console.warn(this.$el, 'beforeMount')
	},
	mounted() {
		console.warn(this.$el, 'mounted')
	},
	beforeUpdate() {
		console.warn(this, 'beforeUpdate')
	},
	updated() {
		console.warn(this, 'updated')
	},
	beforeDestroy() {
		console.warn(this, 'beforeDestroy')
	},
	destroyed() {
		console.warn(this, 'destroyed')
	},
	deactivated() {
		console.warn(this, 'deactivated')
	},
	activated() {
		console.warn(this, 'activated')
	},
	render() {
		// throw new TypeError('render error')
		// console.warn('render funtiona')
		// return h('div', {}, this.text)
	},
	renderError(h, error) {
		return h('div', {}, error.stack)
	},
	errorCaptured() {
		
	}
})
app.$mount('#root')

// setTimeout(() => {
//     app.$destroy()
// }, 1000)
// setInterval(() => {
//     app.$data.text += 1
// }, 1000)
