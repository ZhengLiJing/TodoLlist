import Vue from "vue";

const ComOne = {
	props: ['props1'],
	template: `
		<div :style="style" @click="click1">
			<slot></slot>
		</div>
	`,
	// render(h) {
	// 	return h('div',
	// 	{
	// 		style: this.style,
	// 		on: {
	// 			click: () => {this.$emit('click')}
	// 		}
	// 	},
	// 	[
	// 		this.$slots.default,
	// 		this.props1
	// 	]
	// )
	// },
	data() {
		return {
			style: {
				width: '200px',
				height: '200px',
				border: '1px solid #aaa'
			}
		}
	},
	methods: {
        click1() {
			this.$emit('click')
		}
	},
}

new Vue({
	el: "#root",
	components: {
		ComOne
	},
	template: `
		<com-one ref="comp" @click="clickHandle">
			<span ref="span">{{value}}</span>
		</com-one>
	`,
	data: {
		value: 12313
	},
	// render(h) {
	// 	return h('com-one',
	// 		{
	// 			ref: 'comp',
	// 			props: {
	// 				props1: 'zheng'
	// 			},
	// 			on: {
	// 				click: this.clickHandle
	// 			}
	// 		},
	// 		[
	// 			h('span',
	// 				{
	// 					ref: 'span'
	// 				},
	// 				this.value
	// 			)
	// 		]
	// 	)
	// },
	methods: {
		clickHandle() {
			console.log('clicked') // eslint-disable-line
		}
	}
});
