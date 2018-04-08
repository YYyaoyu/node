var webpack=require('webpack');
//4 配置HTML 模板 ,插件
var HtmlWebpackPlugin = require('html-webpack-plugin');
//6 把css抽离
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path=require("path");

module.exports = {
  entry:  __dirname + "/views/js/homepage.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/public/js",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  },
    module:{
        rules:[
            //5.1 解析css,css-loader
        {test: /\.css$/, loader: 'style-loader!css-loader'},
        { test: /\.scss$/, loader: 'style!css!sass'},
            //11 处理图片
            {
                test:/\.(jpg|png|gif)$/,
                use:{
                    loader:'url-loader',
                    options: {
                        limit: 8192
                  }
                }
            },
            {
                test:/\.(woff|woff2|eot|ttf|svg)$/,
                use:{
                    loader:'url-loader',
                    options: {
                        limit: 100000
                  }
                }
            },
            //8 编译es6
            {
                test:'/\.js$/',
                exclude:/node_modules/,
                use:'babel-loader'
                //8.2在根目录创建.babelrc文件，并输入配置
                // use: [{
                //     loader: 'babel-loader',
                //     options: {
                //         presets: ['es2015']
                //     }
                // }]
            }
        ]
    },
    plugins:[


        new UglifyJsPlugin

    ]
}

