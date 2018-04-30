import Vue from 'vue'

new Vue({
	el: '#root',
	template: `
		<div
			v-bind:style="style1,style2"
			v-html="html">

		</div>
	`,
	data: {
		msg: 'zheng',
		array: [1, 2, 3],
		isActive: false,
		hasError: true,
		classA: 'red',
		classB: 'green',
		html: '<span>123</span>',
		aaa: 'zheng',
		style1: {
			color: 'red'
		},
		style2: {
			color: 'green'
		}
	},
	methods: {

	}
})
