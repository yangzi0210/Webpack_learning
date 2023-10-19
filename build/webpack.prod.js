const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = merge(baseConfig, {
  mode: "production", // 生产模式 会开启 tree-shaking 和压缩代码以及其他优化
  // 很多时候，public文件夹中都会放一些静态资源文件，
  // 例如图片，字体图标，icon等，通常这些也是需要复制到你的出口文件中（dist）
  // 才能保证你打包出来的内容能正常展示，这时候我们可以利用插件实现
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: path.resolve(__dirname, "../dist"),
          filter: (source) => !source.includes("index.html"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      // 抽离css的输出目录和名称
      filename: "static/css/[name].css",
    }),
    new TerserPlugin({
      parallel: true, // 开启多线程压缩
      terserOptions: {
        compress: {
          // 删除console.log
          pure_funcs: ["console.log"],
        },
      },
    }),
    new PurgeCSSPlugin({
      // 检查 src 下所有 tsx 文件和 public 下 index.html 中使用的类名和 id 和 标签名称
      // 只打包这些文件中用到的样式
      paths: globalAll.sync([
        `${path.join(__dirname, "../src")}/**/*.tsx`,
        path.join(__dirname, "../public/index.html"),
      ]),
      safelist: {
        // safelist相当于白名单，你想那些类名不被过滤就在此加入即可
        standard: [/^ant-/], // 过滤以ant-开头的类名，哪怕没用到也不删除
      },
    }),
    new CompressionPlugin({
      test: /\.(js|css)$/, // 只生成 js css 压缩文件
      filename: "[path][base].gz", // 文件命名
      algorithm: "gzip", // 压缩格式 默认是 gzip
      threshold: 10240, // 只有大小大于该值的资源会被处理 默认值是 10K
      minRatio: 0.8, // 压缩率 默认值是 0.8
    }),
  ],
  optimization: {
    minimizer: [
      // 压缩 CSS
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          // 提取node_modules代码
          test: /node_modules/, // 只匹配node_modules里面的模块
          name: "vendors", // 提取文件命名为vendors,js后缀和chunkhash会自动加
          minChunks: 1, // 只要使用一次就提取出来
          chunks: "initial", // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
          priority: 1, // 提取优先级为1
        },
        commons: {
          // 提取页面公共代码
          name: "commons", // 提取文件命名为commons
          minChunks: 2, // 只要使用两次就提取出来
          chunks: "initial", // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
        },
      },
    },
  },
});
