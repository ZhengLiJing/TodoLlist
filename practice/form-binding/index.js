import Vue from 'vue'

const app = new Vue({
	template: `
		<div>
			<input id="r1" type="radio" value="one" v-model="picked" />
			<input id="r2" type="radio" value="Two" v-model="picked" />
			<input id="c1" type="checkbox" value="football" v-model="checkNames" />
			<input id="c2" type="checkbox" value="basketball" v-model="checkNames" />
			<select v-model="selected" multiple>
				<option disabled value="">Please select one</option>
				<option v-for="(item, idx) in arr" :key="item" :value="items[idx]">
					{{item}}
				</option>
			</select>
		</div>
	`,
	data: {
		message: 'hello',
		checked: false,
		arr: ['zheng', 'li', 'jing'],
		picked: false,
		checkNames: [],
		selected: [],
		items: [1, 2, 3]
	}
})

app.$mount('#root')
