import Vue from "vue";

const ComOne = {
	props: ['props1'],
	// template: `
	// 	<div :style="style">
	// 		<slot></slot>
	// 	</div>
	// `,
	render(h) {
		return h('div',
		{
			style: this.style,
			// on: {
			// 	click: () => {this.$emit('click11', this.props1)}
			// },
			scopedSlots: {
				default: props => h('span', props.text)
			}
		},
		[
			this.$slots.header,
			this.$slots.body,
			// this.props1
		]
	)
	},
	data() {
		return {
			style: {
				width: '200px',
				height: '200px',
				border: '1px solid #aaa'
			}
		}
	}
}

new Vue({
	el: "#root",
	components: {
		ComOne
	},
	// template: `
	// 	<com-one ref="comp">
	// 		<span ref="span">{{value}}</span>
	// 	</com-one>
	// `,
	data: {
		value: 1
	},
	render(h) {
		return h('com-one',
			{
				ref: 'comp',
				// <com-one :props="props1"></com-one>
				props: {
					props1: 'zheng'
				},
				// on: {
				// 	click11: this.clickHandle
				// }
				nativeOn: {
					click: this.handleNativeClick
				}
			},
			[
				h('span',
					{
						ref: 'span',
						attrs: {
							props: 'li'
						},
						class: {
							foo: true,
							bar: true
						},
						style: {
							color: 'red'
						},
						// domProps: {
						// 	innerHTML: 'jingke'
						// },
						on: {
							click: this.clickHandle
						},
						// nativeOn: {
						// 	click: this.handleNativeClick
						// },
						slot: 'header',

					},
					// this.value
					'this is header'
				),
				h('span',
					{
						slot: 'body'
					},
					'this is body'
				)
			]
		)
	},
	methods: {
		clickHandle(e) {
			console.log(e.type) // eslint-disable-line
		},
		handleNativeClick() {
			console.log('native span clicked') // eslint-disable-line
		}
	},
	mounted() {
		console.log(this.$refs.span) // eslint-disable-line
	}
});

// var getChildrenTextContent = function(children) {
// 	return children
// 		.map(function(node) {
// 			return node.children
// 				? getChildrenTextContent(node.children)
// 				: node.text;
// 		})
// 		.join("");
// };

// Vue.component("anchored-heading", {
// 	render: function(createElement) {
// 		// create kebabCase id
// 		var headingId = getChildrenTextContent(this.$slots.default)
// 			.toLowerCase()
// 			.replace(/\W+/g, "-")
// 			.replace(/(^\-|\-$)/g, ""); //eslint-disable-line

// 		return createElement("h" + this.level, [
// 			createElement(
// 				"a",
// 				{
// 					attrs: {
// 						name: headingId,
// 						href: "#" + headingId
// 					}
// 				},
// 				this.$slots.default
// 			)
// 		]);
// 	},
// 	props: {
// 		level: {
// 			type: Number,
// 			required: true
// 		}
// 	}
// });

// new Vue({
// 	el: "#root",
// 	template: `
// 		<div>
// 			<anchored-heading :level=1>
// 				<a href="#">
// 					Hello World~
// 				</a>
// 			</anchored-heading>
// 		</div>
// 	`
// });
