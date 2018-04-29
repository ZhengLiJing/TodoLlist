const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const autoprefixer = require("autoprefixer");

module.exports = {
  entry: {
    index: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.jsx/,
        loader: "babel-loader"
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader"
          }
        ]
      },
      {
        test: /\.styl$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader"
          },
          "stylus-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              name: "[name]-output.[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(path.resolve(__dirname, "dist")),
    new HtmlWebpackPlugin({
      template: "index.html",
      filename: "index.html",
      inject: "body"
    })
  ]
};
