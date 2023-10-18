// 公共配置代码文件
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  // 入口文件
  entry: path.join(__dirname, "../src/index.tsx"),
  // 出口文件
  output: {
    filename: "static/js/[name].[chunkhash:8].js",
    path: path.join(__dirname, "../dist"),
    // webpack4 需要配置 clean-webpack-plugin 来删除 dist 文件 但是 webpack5 内置了
    clean: true,
    // 打包后文件的公共前缀路径
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/,
        use: {
          loader: "baber-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-typescript"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ["js", "tsx", ".ts"],
    // 用于告诉Webpack在解析模块时应该如何处理文件后缀名。
    // 因为Webpack在解析模块时会从前往后逐个尝试这些后缀名，找到第一个匹配的文件就会停止搜索，这有助于提高构建性能。
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      inject: true,
    }),
  ],
};
