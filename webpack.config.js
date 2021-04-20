const { resolve } = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
// console.log('process', process.env)
module.exports = (env) => {
  // console.log('env', env.production)
  return {
    // 模式 开发环境：development 生产环境  不确定环境
    mode: 'development',
    // 入口
    entry: './src/index.js',
    // 出口
    output: {
      path: resolve(__dirname, 'dist'),
      filename: 'main.js'
    },
    // devtool 
    // eval 代码用eval包裹 主体转变成string 可以缓存 
    // cheap  不包含loader的source-map
    // module 包含loader的source-map
    devtool: 'source-map',
    // devServe 开发服务器
    // 为了提高性能，使用内存文件系统
    devServer: {
      // contentBase: resolve(__dirname, 'static'),
      writeToDisk: true, // 是否写入硬盘
      compress: false, // 是否启动压缩
      port: 8080, // 指定HTTP服务器端口号
      open: true, // 自动打开浏览器
    },
    // module
    module: {
      rules: [
        // 转义ES6/ES7/jsx语法 
        /**
         * babel-loader 使用babel和webpack转义js
         * @babel/core  babel编译核心包
         * @babel/preset-env 环境的预设
         * @babel/preset-react react插件的babel预设
         * @babel/plugin-proposal-decorators 把类和对象装饰器编译成ES5
         * @babel/plugin-proposal-class-properties 转换静态属性以及使用属性初始值化语法的声明
         * @babel/polyfill 会污染全局变量
         * babel-runtime 不会污染全局变量，但是需要手动自引入
         * @babel/plugin-transform-runtime 自动引入  需要@babel/runtime-corejs2 -D
        */
         {
          test: /\.jsx?$/, use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  "@babel/preset-env", // 可以转化js语法
                  {
                    // useBuiltIns: 'usage',
                    // corejs: { version: 3},
                    targets: '>0.25%'
                  }
                ],
                "@babel/preset-react" // 可以转化react语法
              ],
              plugins: [
                [
                  '@babel/plugin-transform-runtime',
                  {
                    corejs: 3,
                    helpers: false,
                    regenerator: true
                  }
                ],
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                ["@babel/plugin-proposal-class-properties", { "loose": true }]
              ]
            },
          }
        },
        // txt 文件 raw-loader
        {
          test: /\.txt$/, use: 'raw-loader'
        },
        // css  style-loader、css-loader
        {
          test: /\.css$/, use: ['style-loader', 'css-loader']
        },
        // less less、less-loader
        {
          test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']
        },
        // sass node-sass、sass-loader
        {
          test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']
        },
        // 图片 file-loader(url-loader0)
        {
          test: /\.png|jpg|gif$/, use: {
            loader: 'url-loader',
            options: {
              name: '[hash:10].[ext]',
              esModule: false,
              limit: 25 * 1024  //  url-loader:小于当前指定大小时，会转变成base64格式内嵌
            }
          }
        },
        {
          test: /\.html$/, loader: 'html-loader'
        },
      ]
    },
    // 插件
    plugins: [
      new htmlWebpackPlugin({
        template: './src/index.html'
      }),
      new HtmlWebpackExternalsPlugin({
        externals: [
          {
            module: 'loadsh',
            entry: 'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.core.js',
            global: '_',
          },
        ],
      })
    ]
  }
}