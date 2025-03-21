const { merge } = require("webpack-merge");
const webpack = require("webpack");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    hot: true,
    port: 8099,
  },
  plugins: [
    new webpack.ProvidePlugin({
      PIXI: "pixi.js",
    }),
  ],
});