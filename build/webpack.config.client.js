
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.config.base.js');
const merge = require('webpack-merge');

const isDev = process.env.NODE_ENV === "development";

const defaultPlugin = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new HtmlWebpackPlugin()
];

const devServer = {
    port: 8001,
    host: '0.0.0.0',
    overlay: {
        errors: true
    },
    open: true,
    hot: true
};

let config;

if(isDev) {
    config = merge(baseConfig, {
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
        plugins: defaultPlugin.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            // new CleanWebpackPlugin(path.resolve(__dirname, 'dist'))
        ])
    })
} else {
    config = merge(baseConfig, {
        entry: {
            app: path.resolve(__dirname, '../client/index.js'),
            vendor: ['vue']
        },
        output: {
            filename: '[name].[chunkhash:5].js'
        },
        module: {
            rules: [
                {
                    test: /\.styl/,
                    use: ExtractPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            'stylus-loader'
                        ]
                    })
                }
            ]
        },
        plugins: defaultPlugin.concat([
            new ExtractPlugin({
                filename: 'style.[contentHash:8].css'
            }),
            // new CleanWebpackPlugin(pathsToClean),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'runtime'
            })
        ])
    })
}

module.exports = config;
