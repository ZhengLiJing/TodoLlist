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

#### 使用jsx语法写组件，转换loader为babel
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

------

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

#### vue还可以自定义模块
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

#### css-loader使用cssModules
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

