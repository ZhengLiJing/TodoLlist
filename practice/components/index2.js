import Vue from 'vue'

const ComOne = {
	props: {
		active: Boolean,
		propOne: Number,
		onChange: {
			validator(val) {
				return typeof val === 'function'
			}
		}
	},
	template: `
		<div>
			<input type="text"/>
			<span v-show="active">you can see me now!</span>
			<span @click="handleChange">{{propOne}}</span>
		</div>
	`,
	data() {
		return {
			text: 'nihao'
		}
	},
	methods: {
		handleChange() {
			this.onChange()
		}
	}
}

new Vue({
	components: {
		ComOne
	},
	data: {
		propOne: 1
	},
	el: '#root',
	mounted() {
		console.log(this.$refs.com1) // eslint-disable-line
	},
	template: `
		<div>
			<com-one ref="com1" :active="true" :prop-one="propOne" :onChange="handleChange"></com-one>
			<com-one :active="false"></com-one>
		</div>
	`,
	methods: {
		handleChange() {
			this.propOne += 1
		}
	}
})

