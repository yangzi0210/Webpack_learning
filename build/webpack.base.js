// 公共配置代码文件
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isDev = process.env.NODE_ENV === "development";

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
        // 只对项目src文件的ts|tsx进行loader解析
        include: [path.resolve(__dirname, "../src")],
        test: /.(ts|tsx)$/,
        use: ["thread-loader", "babel-loader"],
      }, // 多线程打包
      {
        test: /.css$/, //匹配所有的 css 文件
        include: [path.resolve(__dirname, "../src")],
        use: [
          // 开发环境使用style-looader,打包模式抽离css
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /.less$/, //匹配所有的 less 文件
        include: [path.resolve(__dirname, "../src")],
        use: [
          // 开发环境使用style-looader,打包模式抽离css
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        // 匹配以这些结尾的图片文件
        test: /.(png|jpg|jpeg|gif|svg)$/,
        type: "asset",
        parser: {
          // 小于10k就会转成base64
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          // 文件输出目录和命名
          filename: "static/img/[name].[contenthash:8][ext]",
        },
      },
      {
        // 匹配字体图标文件
        test: /.(woff2?|eot|ttf|otf)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          // 文件输出目录和命名
          filename: "static/fonts/[name][ext]",
        },
      },
      {
        // 匹配媒体文件
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          // 文件输出目录和命名
          filename: "static/media/[name][ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".tsx", ".ts"],
    // 用于告诉Webpack在解析模块时应该如何处理文件后缀名。
    // 因为Webpack在解析模块时会从前往后逐个尝试这些后缀名，找到第一个匹配的文件就会停止搜索，这有助于提高构建性能。
    modules: [
      // 查找第三方模块只在本项目的node_modules中查找
      path.resolve(__dirname, "../node_modules"),
    ],
  },
  cache: {
    type: "filesystem", // 使用文件缓存
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      inject: true,
    }),
    new webpack.DefinePlugin({
      "process.env.BASE_ENV": JSON.stringify(process.env.BASE_ENV),
    }),
  ],
};
