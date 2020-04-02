var UglifyJSPlugin = require('uglifyjs-webpack-plugin');//代码压缩
var webpack = require('webpack');//公共模块js
// var ExtractTextPlugin = require('extract-text-webpack-plugin');//独立打包css
var providePlugin = new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery'});
module.exports = {
    entry: {
        index: './src/js/index.js',
        goodsInfo: './src/js/goodsInfo.js'
    },
    output: {
        filename: '[name].js',//输出的js名称 上面定义的index1 index2
        path: __dirname + '/out',//js、css、背景图片等所有文件的本地输出路径
        publicPath: 'http://localhost:8080/out'//背景图片资源的引用路径
    },
    module: {
        rules: [
            { test: /.js$/, use: ['babel-loader'] },//js模块化
            // {test: /.css$/, use: ['style-loader','css-loader']},//css模块化
            // {
            //     test: /.css$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: 'css-loader'
            //     })
            // },//独立打包css文件
            { test: /.jpg|png|gif|svg$/, use: ['url-loader?limit=8192&name=./[name].[ext]'] }, //背景图片等超过8192字节就通过file-loader打包到对应路径下 按原来的名称、后缀 不超过转成base64编码
            { test: /.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }//less模块化
        ]
    },
    plugins: [
        new UglifyJSPlugin(),//代码压缩
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "commons",
        //     filename: "commons.js",
        //     minChunks: 2
        // }),//公共模块打包js
        // new ExtractTextPlugin('[name].css'),//独立打包css文件
        providePlugin//挂载全局
    ]
}