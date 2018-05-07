import Vue from 'vue'

Vue.component("anchored-head", {
	props: {
		level: {
			type: Number,
			required: true
		}
	},
	render(createElement) {
		return createElement(
			'h' + this.level,
			this.$slots.default
		)
	}
});

new Vue({
	el: '#root',
	template: `
		<div>
			<anchored-head :level="level">
				<a href="#">
					Hello World~
				</a>
			</anchored-head>
		</div>
	`,
	data() {
		return {
			level: 1
		}
	}
})
