const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
module.exports = {
  mode: "development",
  devServer: {
    port: 8080,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        microFrontEndOne:
          "microFrontEndOne@http://localhost:8081/remoteEntry.js",
        microFrontEndTwo:
          "microFrontEndTwo@http://localhost:8082/remoteEntry.js",
        microFrontEndThree:
          "microFrontEndThree@http://localhost:8083/remoteEntry.js",
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
