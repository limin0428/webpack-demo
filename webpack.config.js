const { resolve } = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  // 模式 开发环境：development 生产环境  不确定环境
  mode: 'development',
  // 入口
  entry: './src/index.js',
  // 出口
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  // devServe 开发服务器
  // 为了提高性能，使用内存文件系统
  devServer: {
    contentBase: resolve(__dirname, 'static'),
    writeToDisk: true, // 是否写入硬盘
    compress: true, // 是否启动压缩
    port: 8080, // 指定HTTP服务器端口号
    open: true, // 自动打开浏览器
  },
  // module
  module: {
    rules: [
      {
        test: /.txt$/, use: 'raw-loader'
      }
    ]
  },
  // 插件
  plugins: [
    new htmlWebpackPlugin({
      template: './static/index.html'
    })
  ]
}