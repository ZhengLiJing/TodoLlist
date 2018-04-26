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

#### 