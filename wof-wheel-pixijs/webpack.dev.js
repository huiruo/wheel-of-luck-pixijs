var merge = require('webpack-merge').merge;
var common = require('./webpack.common');

module.exports = merge(common, {
    devServer: {
        contentBase: './dist',
        compress: true,
        port: 8099
    },
    devtool: 'inline-source-map'
});
