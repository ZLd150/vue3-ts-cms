const path = require("path");

module.exports = {
  // 配置方式一: CLI提供的属性
  outputDir: "./dist",
  // publicPath: "./",
  devServer: {
    proxy: {
      "^/api": {
        target: "http://152.136.185.210:5000",
        pathRewrite: {
          "^/api": ""
        },
        changeOrigin: true
      }
    }
  },
  // 配置方式二: 与webpack属性完全一致,最后会进行合并
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       "@components": "@/components"
  //     }
  //   },
  // }
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     "@": path.resolve(__dirname, "src"),
  //     "@components": "@/components"
  //   };
  // }
  // 配置方式三: 链式配置(高级)
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", path.resolve(__dirname, "src"))
      .set("@components", "@/components")
      .set("@baseComponents", "@/baseComponents")
      .set("@api", "@/api")
      .set("@router", "@/router")
      .set("@store", "@/store")
      .set("@views", "@/views")
      .set("@utils", "@/utils")
      .set("@assets", "@/assets");
  }
};
