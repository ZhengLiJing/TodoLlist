
const path = require('path')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base.js')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const defaultPlugin = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"development"'
        }
    }),
    new HtmlWebpackPlugin({
		template: path.join(__dirname, '../index.html')
	})
];

const devServer = {
    port: 8001,
    host: '0.0.0.0',
    overlay: {
        errors: true
    },
    open: true,
	hot: true,
	historyApiFallback: {
		index: '/public/index.html'
	}
};

let config;

config = merge(baseConfig, {
	entry: path.join(__dirname, '../practice'),
	module: {
		rules: [
			{
				test: /\.styl$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true
						}
					},
					'stylus-loader'
				]
			}
		]
	},
	devtool: '#cheap-module-eval-source-map',
	devServer,
	resolve: {
		alias: {
			'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm')
		}
	},
	plugins: defaultPlugin.concat([
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
	])
})



module.exports = config;
