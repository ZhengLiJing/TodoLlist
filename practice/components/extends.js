import Vue from 'vue'

const ComOne = {
	name: 'com-one',
	data() {
		return {
			text: '123'
		}
	},
	mounted() {
		console.log('com one') // eslint-disable-line
	},
	template: `
		<div>
			<span>{{text}}</span>
		</div>
	`
}

const parent = new Vue({
	name: 'parent'
})

const ComTwo = {
	name: 'com-two',
	extends: ComOne,
	// data() {
	// 	return {
	// 		text: '456'
	// 	}
	// },
	mounted() {
		console.log('com-two') // eslint-disable-line
		// this.$parent.text = '789'
		console.log(this.$parent.$options.name) // eslint-disable-line

	},
}

new Vue({
	parent: parent,
	name: 'Root',
	components: {
		ComTwo
	},
	mounted() {
		console.log('com vue') // eslint-disable-line
		console.log(this.$parent.$options.name) // eslint-disable-line
	},
	data: {
		text: 23333
	},
	el: '#root',
	template: `
		<div>
			<span>{{text}}</span>
			<com-two></com-two>
		</div>
	`
})
