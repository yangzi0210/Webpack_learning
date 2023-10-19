const prodConfig = require("./webpack.prod");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin"); // 引入webpack打包速度分析插件
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const smp = new SpeedMeasurePlugin();
const { merge } = require("webpack-merge");

// 使用smp.wrap方法,把生产环境配置传进去
module.exports = smp.wrap(
  merge(prodConfig, {
    plugins: [
      // 配置分析打包结果插件
      new BundleAnalyzerPlugin(),
    ],
  })
);
