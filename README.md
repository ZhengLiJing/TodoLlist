#### babel-loader

    // babel-loader@7.1.2 babel-core@6.25.0
    // babel-preset-env@1.6.1
    1. 配置转换的js版本不能在options中设置。在.babelrc中设置是可以的
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader']
            }
        ]
    }
    // 在options中设置打包失败,报错,同样的在package.json中设置"babel": {"presets": ["env"]}也是失败的打包
    // Error while parsing JSON - Unexpected EOF at line 1 column 2 of the JSON5 da
    //   ta. Still to read: ""
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    }

#### clean-webpack-plugin@0.1.19

#### html-webpack-plugin@2.30.1

#### stylus-loader@3.0.1 stylus@0.54.5

    // 在vue文件中，使用stylus书写CSS，<style lang="stylus" scoped></style>
    module: {
        rules: [
            {
                test: /\.styl$/,
                use: ['style-loader!css-loader!stylus-loader']
            }
        ]
    }

#### webpack-dev-server@2.9.7

    // 自动监听文件修改，提高开发效率
    "script": {
        "dev": "webpack-dev-server"
    }

#### 小问题

    1. id和class要分清，特别是写css的时候
    2. 有时候css文件引入不进来，尝试手动刷新浏览器

#### 使用 jsx 语法写组件，转换 loader 为 babel

    module: {
        rules: [
            {
                test: /\.js$/,
                'babel-loader'
            }
        ]
    }
    // 记得在.babelrc里添加插件
    {
        "plugins": {
            "transform-vue-jsx"
        }
    }

#### autofixer postcss-loader

    module: {
        rules: [
            {
                test: /\.styl$/,
                use: {
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'stylus-loader'
                }
            }
        ]
    }
    // 记得在postcss.config.js中加入插件autofixer
    const autoprefixer = require('autoprefixer');

    module.exports = {
        "plugins": [
            autoprefixer()
        ]
    };

---

#### js-exclude

    {
       test: /\.jsx$/,
       loader: 'babel-loader',
       exclude: 'node_modules'
     },

#### CleanWebpackPlugin

    // 对于dist目录，我放在根目录下webpack提示在项目	,所以我放在到build下。
    //clean-webpack-plugin: /Users/zhenglijing/Desktop/FED/todoList/dist is outside of the 		project root. Skipping...

    let pathsToClean = [
    	'dist',

];
new CleanWebpackPlugin(pathsToClean)

#### webpack-merge

    // 开发环境
    const baseConfig = require('./webpack.config.base.js');
    const isDev = process.env.NODE_ENV === "development";
    const defaultPlugin = [
    	new webpack.DefinePlugin({
    		"process.env": {
    			NODE_ENV: isDev ? "development" : "production"
    		}
    	})
    ]
    let config;
    config = merge(baseConfig, {
    	module: {
    		rules: [ ]
    	},
    	devtool: '#cheap-module-eval-source-map',
    	devServer,
    	plugins: defaultPlugin.concat.([ ])
    })

#### vue-loader

    // vue-template-compiler
    // Defaults to true. This means the compiled render
        function preserves all whitespace characters
        between HTML tags. If set to false, whitespace
        between tags will be ignored. This can result in
        slightly better performance but may affect layout
        for inline elements.
    1. preserveWhitespace: true
    2. extractCSS: true
        vue不会单独将vue文件里的CSS文件使用extract-text-webpack-plugin
        打包到输出的CSS文件中,异步加载
    3. options: {
        // 保留空格
        preserveWhitespace: true,
        // build中需要使用，开发环境中不需要使用
        extractCSS: isDev : false : true
    }

#### rimraf@2.6.2

    1. 清除dist目录
        在package.json的
        script: {
            "clean": "rimraf dist"
        }

#### vue 还可以自定义模块

    1. 组件库文档
    2. Vue中不同的模块使用不同的loader处理
        比如，js: 'coffee-loader', 这样就可在Vue文件中
        使用coffee.js书写代码了。
    3. preLoader, 比如使用在typesript上

#### vue-loader cssModules

    // head.vue
    // vue文件中使用:class解析，在jsx文件中使用{}解析
    <div :class="$style.mainHead">
        <h1>Just to do it!</h1>
    </div>
    <style>
        .mian-head: {
            color: lightblue
            font-size: 12px
        }
    </style>
    cssModules: {
        虽然在<style lang="stylus" scoped></style>也可以保持命名唯一。
        // 但是使用module的优点，1. 方便查找位置。2. 线上只包含[hash:base64]保密作用,
        localIdentName: '[path]-[name]-[hash:base64:5]',
        // css名称转换为够驼峰命名法，比如，font-size: fontSize
        camelCase: true
    },
    // 输出到浏览器当做后就是: class="client-layout--head-2Ly3r_0"e
    相当于在Vun的script中创建了computed
    <script>
        computed: {
            $style() {
                return {
                    mainHead: 'content of css'
                }
            }
        }
    </script>

#### css-loader 使用 cssModules

    module: {
        rules: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    module: true,
                    localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]'
                }
            }
        ]
    }
    // footer.jsx
    import className from '../assets/styles/footer.styl';

    export default {
        data() {
            return {
                author: 'zhenglijing'
            }
        },
        render() {
            return (
                <div id={className.footer}>
                    <span>Written by {this.author}</span>
                </div>
            )
        }
    }
    // client-assets-styles--footer-2tEqU

#### eslint

    "eslint": "^4.19.1",
    "eslint-config-standard": "^11.0.0",
    "eslint-plugin-html": "^4.0.3",
    "eslint-plugin-import": "^2.11.0",
    "eslint-plugin-node": "^6.0.1",
    "eslint-plugin-promise": "^3.7.0",
    "eslint-plugin-standard": "^3.1.0",

    // 1.创建.eslintrc文件
    {
        "extends": "standard",
        //  使用eslint检测script标签里的css代码
        plugins: [
            "html"
        ]
    }
    // 2. 脚本中加入
        --ext 扩展名，最后的client/是检测指定的文件夹
        "eslint": "eslint --ext .js --ext .vue --ext jsx client/',
        "eslint:fix": "exlint --fix --ext .js --ext .vue --ext jsx client/'

    #### eslint-plugin-html
        使用eslint检测script标签里的css代码

    // 3. 项目开发过程中，每次更改代码都能进行eslint代码检测
        eslint-loader@1.9.0
        babel-eslint@8.2.1

            (1). "parser": "babel-eslint"
                原因是该项目是基于webpack和babel开发的，
                babel处理后的代码对于eslint可能不太支持
                所以，项目使用webpack+babel开发，都选择
                配置:"parser": "babel-eslint"
            (2). webpack.config.base.js
                {
                test: /\.(vue|js|jsx)$/,
                loader: 'eslint-loader',
                // 进行vue-loader进行转化之前使用eslint-loader进行检测
                // 如果检测出错，直接报出错误即可
                enforce: 'pre',
                exclude: /node_modules/
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: createVueLoaderConfig(isDev)
                },
    	4. example of correct code of this rule with broser environment:
    		/*eslint no-undef: "error"*/
    		*eslint-env browser*/

#### 结尾换行

    window: CRLF
    mac|linux: LF

#### .editorconfig

    规范不同编辑的格式统一
    // 读到该文件即可
    root = true

    [*]
    charset = utf-8
    end_of_line = lf
    indent_size = 4
    indent_style = tab
    insert_final_newline = true
    trim_trailing_whitespace = true

#### husky

    git 提交前的检测代码,将错误固定在本地仓库，不会将错误带入远程仓库。
    1. 安装 cnpm i -D husky
    2. "precommit": "npm run eslint" or "precommit": "npm run eslint:fix"

#### vue

    note: vue特点是声明式,响应式
    1. webpack.confit.practice.js
    	resolve: {
    		alias: {
    			'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm')
    		}
    	},
    	(1). 默认情况下，import Vue是vue.runtime.common.js
    	(2). 开发环境下，vue.runtime.esm.js
    	(3). 真实环境, vue.runtime.min.js
    	runtime版本不允许写在Vue实例中写template模板。
    2. package.json
    	"practice": "cross-env NODE_ENV=development webpack-dev-server --config
    				webpack.config.practice.js"
    3. const HtmlWebpackPlugin = require('html-webpack-plugin')
    	HtmlWebpackPlugin({
    		template: path.join(__dirname, '../index.html')
    	})
    	<div id="root"></div>
    4.
    	将Vue实例挂载到HTML节点上
    	（1).
    		new Vue({
    			el: '#root',
    			template: '<div></div>
    		})
    	(2).
    		const app = new Vue({
    			template: '<div></div>
    			render(h) {
    				return h('div', {}, this.text)
    			}
    		})
    		app.$mount('#root')
    5. lifecycle
    	beforeCreate this.$el为undefined
    	created this.$el为undefined
    	beforeMount(挂载元素到节点前)<div id="root"></div>
    	mounted(替换根节点)<div>0</div>

    	(1). 因为beforeCreate和created时，元素节点为undefined
    		所以，此时不适合操作DOM，通常操作DOM放在mounted上。
    	(2). 跟数据相关的可以放在created和mounted上都行
    	(3). 服务端渲染只会触发beforeCreate和create ，
    		因为mounted是和DOM相关的，服务器端没有DOM，所以不会
    		触发beforeMount和mounted生命周期函数
    	(4). render(h) {
    			return h('div', {}, this.text)
    		}
    		h相当于createElement()方法，执行的时机是
    		在beforeMount和mounted之间
    	(5). 使用vue-laoder将template都转换为render function
    	(6). renderError开发时使用，便于发现错误，只对本组件有用，
    		对于其可以有的子组件不起作用。
    	(7). errorCaptured,可以用在正式开发环境，捕获线上所有的错误
    		会向上冒泡。正式环境可以使用。

    	beforeUpdate
    	updatedd

    	deactivated
    	activated

    	beforeDestroy
    	destroyed

#### 碰到包未找到，可以尝试将 node_modules 删除，重新安装

#### vu-bind

    1.
    // 注意 text-danger需要使用单引号括起来
    <div
    	:class="{active: isActive, 'texts-dander': hasError}"
    >
    2.
    <div
    	:class="[classA, classB]"
    >

    </div>
    3.
    模板里可以调用方法，一元表达式，内置全局对象,v-bind,v-html,v-on等
    template: `
    	<div>{{greet()}}</div>
    	<div>{{isActive ? 'hello' : 'world'}}</div>
    	<div>{{new Date()}}</div>

    `
    4. computed
    	计算属性相对于方法来说，会进行值的缓存，提高页面的性能，
    	主要应用在一个值不是我们想直接显示在页面上的，而是想通过
    	计算之后显示在页面上。
    	note：千万不要进行对依赖值的修改，而是计算后返回一个新的值

    5. watch
    	检测数据，使用于一个数据变化，指定一个动作发生，
    	比如，某个值发生了变化，给后台发送一个请求,异步请求数据等
    	obj: {
    		handler(newVal) {},
    		immediate: true,
    		deep: true // 深入观察，包含对象的属性，如果为false，则只观察
    					// 对象的引用是否发生变化
    					// 深入观察性能开销比较大，优化方法是使用字符串，
    					// 给要待观察的对象的属性使用字符串括起来。
    	}
    	'obj.a': {
    		handler(newVal) {},
    		immediate: true,
    	}
    	note：千万不要进行对依赖值的修改，可能导致无限的watch事件触发

#### vue-directives

    v-if: 会动态增删节点，DOM重绘，重新排版，性能开销大
    v-for, 推荐使用 :key唯一值

#### components

    1. 全局注册组件
    	Vue.component('ConOne', {
    		template: `
    			<div>{{text}}</div>
    		`,
    		data() {
    			return {
    				text: 'hello'
    			}
    		}
    	})
    2. 局部注册
    	const ConOne = {
    		template: `
    			<div>
    				{{text}}
    			</di>
    		`,
    		data() {
    			return {
    				text: 'world'
    			}
    		}
    	}
    	new Vue({
    		components: {
    			ComOne
    		},
    		template: `
    			<div>
    				<com-one></com-one>
    			</div>
    		`
    	})
    3. 组件内的data必须为函数，而使用new Vue,data不必是函数
    	new Vue({
    		data: {

    		}
    	})
    4.
    	props: {
    		active: Boolean
    	}
    	// 使用v-bind对active进行解析
    	<com-one :active="true"></com-one>

    	子组件触发事件 1.
    	// 组件首字母大写，组件相当于类，所以命名遵循和类一样
    	const ConOne = {
    		propOne: Number,
    		template: `
    			<div>
    				<span @change="handleChange">{{propOne}}</span>
    			</div>
    		`,
    		methods: {
    			handleChange() {
    				this.$emit('change')
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
    		template: `
    			<div>
    				<com-one @change="handleChange"></com-one>
    			</div>
    		`,
    		methods: {
    			handleChange() {
    				this.propOne += 1
    			}
    		}
    	})

    	子组件触发事件 2.

    	const ComOne = {
    		props: {
    			propOne: Boolean,
    			onChange: Function
    		},
    		template: `
    			<div>
    				<span @click="handleChange">{{propOne}}</span>
    			</div>
    		`,
    		methods: {
    			handleChange() {
    				this.onChange()
    			}
    		}
    	}

    	new Vue({
    		el: '#root',
    		data: {
    			propOne: 0
    		},
    		template: `
    			<div>
    				<com-one :propOne="propOne" :onChange="handleChange"></com-one>
    			</div>
    		`,
    		methods: {
    			handleChange() {
    				this.propOne += 1
    			}
    		}
    	})

    5. 组件也是个Vue实例
    	// 通过this.$refs.com1拿到组件实例
    	mounted() {
    		console.log(this.$refs.com1)
    	}
    	<com-one refs="com1"></com-one>

    6. extends
    	const ComOne = {},
    	const ComTwo = {
    		extends: ComOne,
    		...
    	}
    	new Vue({
    		components: {
    			ComTwo
    		},
    		template: `
    			<div>
    				<com-two></com-two>
    			</div>
    		`
    	})

    	note:
    		mounted钩子函数都会在ComOne,ComTwo,Vue
    		中执行，执行顺序是父，子，实例（ComOne,ComTwo,Vue)

    7. this.$parent
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

    	const ComTwo = {
    		name: 'com-two',
    		extends: ComOne,
    		mounted() {
    			console.log('com-two') // eslint-disable-line
    			console.log(this.$parent.$options.name) // eslint-disable-line

    		},
    	}

    	new Vue({
    		name: 'Root',
    		components: {
    			ComTwo
    		},
    		mounted() {
    			console.log('com vue') // eslint-disable-line
    		},
    		el: '#root',
    		template: `
    			<div>
    				<com-two></com-two>
    			</div>
    		`
    	})
    	1.
    	// 对于组件ComTwo来说，其父组件是使用该组件的实例，这里就是new Vue({})
    		这个实例。所以console.log(this.$parent.$options.name);// Root
    	2.
    	// 子组件ComTwo更改父组件new Vue({})实例的数据（但是不推荐这么做）
    		在子组件内部可以直接调用父组件（引用该子组件的组件，也就是在哪个
    		组件内使用了该组件的组件）
    		const ComTwo = {
    			mounted() {
    				this.$parent.text = 456
    			}
    		}
    	3.
    		只有通过new Vue({})的方式，才能指定更改parent，在组件中不可以

    		const parent = new Vue({
    			name: 'parent'
    		})
    		// 指定parent
    		new Vue({
    			parent: parent,
    			mounted() {
    				console.log(this.$parent.$options.name) // parent
    			}
    		})


    		// 在组件中指定parent无效，还是指向调用该组件的根组件
    		const parent = new Vue({
    			name: 'parent'
    		})
    		const ComTwo = {
    			// 无效
    			parent: parent,
    			// 父组件还是调用该组件的Vue实例上
    			mounted() {
    				console.log(this.$parent.$options.name) // Root
    			}
    		}

    		new Vue({
    			name: 'Root'
    			components: {
    				ComTwo
    			},
    			el: '#root',
    			data: {},
    			template: `
    				<div>
    					<com-two></com-two>
    				</div>
    			`
    		})
    	4. v-model模拟,输入框绑定input事件，向外触发input事件，带上输入框的输入值，
    		使用该组件时，监听input事件，然后在方法中处理逻辑
    		const ComOne = {
    			props: ['value'],
    			template: `
    				<div>
    					<input type="text" :value="value" @input="handleInput" />
    				</div>
    			`,
    			methods: {
    				handleInput(e) {
    					this.$emit('input', e.target.value)
    				}
    			}
    		}
    		new Vue({
    			el: '#root',
    			components: {
    				ComOne
    			},
    			data: {
    				value: '123'
    			},
    			template: `
    				<div>
    					<com-one :value="value" @input="handleChange"></com-one>
    				</div>
    			`,
    			methods: {
    				handleChange(val) {
    					this.value = val
    				}
    			}
    		})

    	5. v-model之自定义prop and event
    		const ComOne = {
    			model = {
    				prop: 'value1',
    				event: 'change'
    			},
    			props: ['value1']
    		},
    		template: `
    				<div>
    					<!-- :value="value1" -->
    					<input type="text" :value="value1" @input="handleInput" />
    				</div>
    			`,
    			methods: {
    				handleInput(e) {
    					<!-- this.$emit('change', e.target.value) -->
    					this.$emit('change', e.target.value)
    				}
    			}
    	6. slot
    		1.
    		const ComOne = {
    			template: `
    				<div>
    					<slot></slot>
    				</div>
    			`
    		}

    		new Vue({
    			el: '#root',
    			components: {
    				ComOne
    			},
    			template: `
    				<div>
    					<com-one>
    						<span>this is some content</span>
    					</com-one>
    				</div>
    			`,
    			data: {

    			}
    		})
    		2. Named Slots
    			const ComOne = {
    				template: `
    					<div>
    						<div :style="header">
    							<slot name="header"></slot>
    						</div>
    						<div :style="body">
    							<slot name="body"></slot>
    						</div>
    					</div>
    				`
    			}

    			new Vue({
    				el: '#root',
    				components: {
    					ComOne
    				},
    				template: `
    					<div>
    						<span slot="header">this is a header</span>
    						<span slot="body">this is a body</span>
    					</div>
    				`,
    				data: {

    				}
    			})
    		3. slot-scope作用域插槽
				在一个子组件中，传递数据给插槽，就像是传递一个props属性给组件一样简单
				父组件必须具有slot-scope属性
    			const ComOne = {
    				template: `
    					<div>
    						<slot :text="text"></slot>
    					</div>
    				`,
    				data() {
    					return {
    						text: '123'
    					}
    				}
    			}

    			new Vue({
    				el: '#root',
    				components: {
    					ComOne
    				},
    				template: `
    					<div>
    						<com-one slot-scope="props">{{props.text}}</com-one>
    					</div>
    				`,
    				data: {

    				}
    			})
    		4. $ref
    			<!-- vm.$refs.p will be the DOM node -->
    			<p ref="p">hello</p>

    			<!-- vm.$refs.child will be the child comp instance -->
    			通过拿到子组件实例，修改数据（不推荐），推荐使用props属性进行数据更改
    			<child-comp ref="child"></child-comp>
    	7. provide / inject
    		跨组件，grandparent to grandson
    		import Vue from 'vue'

    		const ComOne = {
    			template: `
    				<div>
    					this is some contents!
    				</div>
    			`
    		}
    		const ComTwo = {
    			components: {
    				ComOne
    			},
    			template: `
    				<div>
    					<com-one></com-one>
    				</div>
    			`,
    			inject: ['value'],
    			created() {
    				console.log(this.value) // eslint-disable-line
    			}
    		}

    		new Vue({
    			el: '#root',
    			components: {
    				ComTwo
    			},
    			template: `
    				<div>
    					<com-two></com/two>
    				</div>
    			`,
    			data: {
    				value: 123
    			},
    			provide() {
    				return {
    					value: this.value
    				}
    			}
    		})

    		note:
    			1. provide: {
    				value: this.value; //此时this还没有初始化完成，所以拿不到value值，
    			}
    			provide() {
    				return {
    					value: this.value // 这样就能拿到value值
    				}
    			}
    			2. the provide and inject bindings are NOT reactive.
    				通过prvide和inject绑定的值不具有响应式，想要响应式需要使用
    				Object.defineProperty(),此时就有响应式的效果了。(官方不推荐)

    				// grandson
    				const ComOne = {
    					template: `
    							<div>
    								<!-- data.value 每次取value值，都调用了get方法获取最新值-->
    								<span>{{data.value}}</span>
    							</div>
    					`,
    					inject: ['data']
    				}
    				// new Vue grandparent
    				provide() {
    					const data = {}
    					Object.defineProperty({}, 'value', {
    						get: () => this.value,
    						enumerable: true
    					})
    					return {
    						data
    					}
    				}
    	8. render()

    		const ComOne = {
    			template: `
    				<div>
    					<slot></slot>
    				</div>
    			`
    		};

    		new Vue({
    			el: "#root",
    			components: {
    				ComOne
    			},
    			template: `
    				<div ref="comp">
    					<com-one ref="span">{{value}}</com-one>
    				</div>
    			`,
    			render(h) {
    				return h('div',
    					{
    						ref: 'comp'
    					},
    						[
    							h('com-one',
    								{
    									ref: 'span'
    								},
    								this.value
    							)
    						]
    				)
    			},
    			data: {
    				value: 123
    			}
    		});
    		note:
    			render() 方法的子节点使用数组表示

    			1.

    			// template: `
    			// 	<div :style="style">
    			// 		<slot></slot>
    			// 	</div>
    			// `,
    			render(h) {
    				return h('div',
    				{
    					style: this.style
    				},
    				this.$slots.default
    			)
    			},

    			2.

    			// template: `
    			// template: `
    				// 	<div ref="comp">
    				// 		<com-one ref="span">{{value}}</com-one>
    				// 	</div>
    				// `,
    				data: {
    					value: 123
    				},
    				render(h) {
    					return h('div',
    						{
    							ref: 'comp'
    						},
    							[
    								h('com-one', {
    									ref: 'span'
    								}, this.value),
    								h('com-one', {
    									ref: 'span'
    								}, 321)
    							]
    					)
    				}
    				3.
    					在render方法里添加方法

						1. 需要子组件内的事件emit
						on: {
							click: this.handleClick
						}
						// 不使用render方法
						// 子组件里
    					template: `
							<div ref="comp" @click="click111">

							</div>
    					`,
						methods: {
							click111() {
								this.$emit('click222')
							}
						}
						// vue实例里
						template: `
							<com-one @click222="handleClick">

							</com-one>
    					`,
						methods: {
							handleClick() {
								this.$emit('click222')
							}
						}

						// 使用render方法
						// 子组件里
    					render(h) {
							return h('div',
								{
									ref: 'comp',
									on: {
										click: 'click111'
									}
								}
							)
						},
						methods: {
							click111() {
								this.$emit('click222')
							}
						}
						// vue实例里

						render(h) {
							return h('com-one',
								{
									on: {
										click222: 'handleClick'
									}
								}
							)
						}
						methods: {
							handleClick() {
								this.$emit('click222')
							}
						}
						2. 不需要子组件内的事件emit,直接绑定到该组件的根节点上

						// 子组件里
    					render(h) {
							return h('div',
								{
									ref: 'comp',
									// 不需要想父组件emit事件
									<!-- on: {
										click: 'click111'
									} -->
								}
							)
						},
						// vue实例里

						render(h) {
							return h('com-one',
								{
									// 直接绑定到该组件的根节点上，Vue已经处理好了
									nativeOn: {
										click: this.handleClick
									}
								}
							)
						}
						methods: {
							handleClick() {
								this.$emit('click222')
							}
						}
					4. 问题
						 Error in render: "TypeError:this.$scopedSlots.default is not a function"

						 render(h) {
							return h(
								'div',
								[
									this.$scopedSlots.default({
										name: 'header',
										message: this.headMsg
									})
								]
							)
						},
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
