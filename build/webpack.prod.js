const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

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
  ],
  optimization: {
    minimizer: [
      // 压缩 CSS
      new CssMinimizerPlugin(),
    ],
  },
});
