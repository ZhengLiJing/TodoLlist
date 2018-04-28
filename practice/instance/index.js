/*eslint no-undef: "error"*/
/*eslint-env browser*/
/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
import Vue from 'vue'

const app = new Vue({
	template: `<div ref="div">{{ text }} {{obj.a}}</div>`,
	data: {
		text: 0,
		obj: {}
	}
})

app.$mount('#root')

// setInterval(() => {
// 	// app.text += 1
// 	// app.$options.data += 1
// 	app.$data.text += 1
// }, 1000)
// let i = 0
setInterval(() => {
	app.$data.text += 1
	app.$data.text += 1
	app.$data.text += 1
	app.$data.text += 1
	app.$data.text += 1
	// i++
	// app.obj.a = i
	// app.$forceUpdate()
	// vue声明了obj的a属性，只有声明了的属性才具有响应式
	// app.$set(app.obj, 'a', i)
	// app.$delete连同响应式也一起删除
    console.warn(app.obj.a)
}, 2000)

// console.warn(app.$data)
// console.warn(app.$props)
// console.warn(app.$el)
// console.warn(app.$options)
// 数据有变化后，重新渲染
// app.$options.render = (h) => {
// 	return h('div', {}, 'new render function')
// }
// console.warn(app.$root === app)
// app.$root.$data.text = 'hzeng'
// <item><div></div></item>
// console.warn(app.$children)
// console.warn(app.$slots)
// console.warn(app.$scopedSlots)
// console.warn(app.$refs)
// console.warn(app.$isServer)
// 通过app.$watch方式需要手动unwatch,而在
// options书写watch时，自动会unwatch
// const unwatch = app.$watch('text', (newText, oldText) => {
// 	console.warn(newText, oldText)
// })

// setTimeout(() => {
// 	unwatch()
// }, 2000)

// $on和$emit必须是同一个对象
app.$once('test', () => {
	console.warn('test is emmitted')
})

setInterval(() => {
    app.$emit('test')
}, 1000)
