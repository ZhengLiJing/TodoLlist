const path = require('path');
const createVueLoaderConfig = require('./vue-loader.config.js');
const isDev = process.env.NODE_ENV === "development";



const config = {
    target: "web",
    entry: path.resolve(__dirname, '../client/index.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'build-[hash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.(vue|js|jsx)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: createVueLoaderConfig(isDev)
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.(png|jpe?g|svg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: 'resources/[path][name]-[hash:8].[ext]'
                            // name: '[name]-out.[ext]'
                        }
                    }
                ]
            }
        ]
    }
};

module.exports = config;