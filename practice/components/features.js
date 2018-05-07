import Vue from 'vue'

const ComOne = {
	template: `
		<div :style="style">
			<span>{{data.value}}</span>
		</div>
	`,
	data() {
		return {
			style: {
				width: '200px',
				height: '200px',
				border: '1px solid #aaa'
			},
			header: {
				color: 'red'
			},
			body: {
				color: 'green'
			},
			num: 1234123
		}
	},
	mounted() {
		// console.log('mounted in one ' + this.$parent.$options.name) // eslint-disable-line
	},
	inject: ['data']
}

const ComTwo = {
	name: 'com-two',
	components: {
        ComOne
	},
	template: `
		<div>
			<com-one></com-one>
		</div>
	`,
	mounted() {
        // console.log('mounted in two ' + this.$parent.$options.name) // eslint-disable-line
	}
}

new Vue({
	name: 'Root',
	el: '#root',
	components: {
		ComOne,
		ComTwo
	},
	template: `
		<div>
			<com-two></com-two>
		</div>
	`,
	data: {
		value: 123
	},
	provide() {
		const data = {}
		Object.defineProperty(data, 'value', {
			get: () => this.value,
			enumerable: true
		})

		return {
			data
		}
	}
})
