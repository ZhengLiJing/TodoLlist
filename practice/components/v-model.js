import Vue from "vue";

// const ComOne = {
// 	model: {
// 		prop: 'value1',
// 		event: 'change'
// 	},
// 	props: ['value', 'value1'],
// 	template: `
// 		<div>
// 			<input type="text" :value="value1" @input="handleInput" />
// 		</div>
// 	`,
// 	methods: {
// 		handleInput(e) {
// 			this.$emit('change', e.target.value)
// 		}
// 	}
// }

// new Vue({
// 	components: {
// 		ComOne
// 	},
// 	data() {
// 		return {
// 			value: '123'
// 		}
// 	},
// 	el: '#root',
// 	template: `
// 		<div>
// 			<com-one :value="value" @input="inputChange"></com-one>
// 			<com-one v-model="value"></com-one>
// 		</div>
// 	`,
// 	methods: {
// 		inputChange() {
// 			this.value = arguments[0]
// 			console.log('inputChange invoked') // eslint-disable-line
// 		}
// 	}
// })

Vue.component("my-checkbox", {
	model: {
		prop: "checked",
		event: "change"
	},
	props: {
		// this allows using the `value` prop for a different purpose
		value: String,
		// use `checked` as the prop which take the place of `value`
		checked: {
			type: Number,
			default: 0
		}
	},
	template: `
		<div>
			<input type="checkbox" :value="checked" @input="handleInput" />
			<span>{{checked}}</span>
			<span>{{value}}</span>
		</div>
	`,
	methods: {
		handleInput(e) {
			this.$emit('change', e.target.value)
		}
	}
	// ...
})


new Vue({
	data() {
		return {
			foo: 123
		}
	},
	el: '#root',
	template: `
		<div>
			<my-checkbox v-model="foo" @change="foo = arguments[0] + 1" value="some value"></my-checkbox>
		</div>
	`
})
