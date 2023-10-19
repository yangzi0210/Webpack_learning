const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");

// 合并公共资源 添加至开发环境中
module.exports = merge(baseConfig, {
  mode: "development", // 开发环境
  devtool: "eval-cheap-module-source-map", //源码调试
  // 在开发中和打包后的代码都是经过webpack处理后的代码，开发中肯定是希望看到源代码的，方便调试；这时候我们就需要选择不同的source map，意思是映射源代码，而且选择不同的映射会明显的影响构建速度，devtool配置项就是webpack提供给我们选择不同的映射源码的配置
  // 官网推荐开发环境使用的是：eval-cheap-module-source-map
  // 但是本地开发首次打包会慢些，主要原因是eval做了缓存，但是热更新会很快
  // 开发中，定位到行即可，所以加上cheap
  // 我们希望能够找到源代码的错误,而不是打包后的,所以需要加上 module
  devServer: {
    port: 3000, // 服务器端口号
    compress: false, // gzip 压缩 开发环境不开启 提升热更新速度
    hot: true, // 热更新
    historyApiFallback: true, // 解决 history 路由 404 问题
    static: {
      directory: path.join(__dirname, "../public"), // 托管静态资源 public 文件夹
    },
  },
});
