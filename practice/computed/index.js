import Vue from 'vue'

new Vue({
	el: '#root',
	template: `
		<div>
			<p>Name: {{name}}</p>
			<p>Name: {{getName()}}</p>
			<p>Number: {{number}}</p>
			<p>number: <input type="text" v-model="number"/></p>
			<p>First Name<input type="text" v-model="firstName"/></p>
			<p>Last Name<input type="text" v-model="lastName"/></p>
			<p>Last Name<input type="text" v-model="lastName"/></p>
			<p>fullName: {{fullName}}</p>
			<p>obj.a: <input type="text" v-model="obj.a" /></p>
			<br />
		</div>
	`,
	data: {
		firstName: 'zheng',
		lastName: 'lijing',
		number: 0,
		fullName: '',
		obj: {
			a: 123
		}
	},
	computed: {
		// name: {
		// 	get() {
		// 		console.log('computed name invoked') // eslint-disable-line
		// 		return `${this.firstName} ${this.lastName}`
		// 	},
		// 	set(name) {
		// 		[this.firstName, this.lastName] = name.split(' ')
		// 	}
		// }
		name() {
			return `${this.firstName} ${this.lastName}`
		}
	},
	methods: {
		getName() {
			console.log('methods getName invoked') // eslint-disable-line
			return `${this.firstName} ${this.lastName}`
		}
	},
	watch: {
		firstName: {
			handler(newName) {
				this.fullName = newName + ' ' + this.lastName
			},
			immediate: true
		},
		obj: {
			handler() {
				console.log('obj.a invoked') // eslint-disable-line
			},
			deep: true
		}
	}
})
