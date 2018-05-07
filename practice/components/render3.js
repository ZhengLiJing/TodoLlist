
import Vue from 'vue'

const ComOne = {
	props: ['props1'],
	// template: `
	// 	<div>
	// 		<slot name="header" :message="headMsg"></slot>
	// 		<slot name="body" :message="bodyMsg"></slot>
	// 		<slot name="footer" :message="footerMsg"></slot>
	// 	</div>
	// `,
	render(h) {
		return h(
			'div',
			[
				this.$scopedSlots.default({
					text: this.message
				})
			]
		)
	},
	data() {
		return {
			message: 'heading',
			bodyMsg: 'bodying',
			footerMsg: 'footering'
		}
	}

}

new Vue({
	components: {
        ComOne
	},
	el: '#root',
	template: `
		<div>
			<com-one>
				<div slot="header" slot-scope="props">this is header: {{props.headMsg}}</div>
				<div slot="body">this is body</div>
				<div slot="footer" >this is footer</div>
			</com-one>
		</div>
	`,
	// render(h) {
	// 	return h(
	// 		'div',
	// 		[
	// 			h(
	// 				'com-one',
	// 				{
	// 					props: {
	// 						props1: 'zheng'
	// 					}
	// 				},
	// 				[
	// 					h(
	// 						'div',
	// 						{
	// 							slot: 'header',
	// 							slotScope: 'props'
	// 						},
	// 						'{{props.headMsg}}'
	// 					)
	// 				]
	// 			)
	// 		]
	// 	)
	// }
})
