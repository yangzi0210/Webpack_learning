module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: 3,
      },
    ],
    // 预设执行顺序由右往左,所以先处理ts,再处理jsx
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
};
