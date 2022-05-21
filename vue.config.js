const path = require("path");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = {
  // 配置方式一: CLI提供的属性
  outputDir: "./build",
  // 配置方式二: 与webpack属性完全一致,最后会进行合并
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       "@components": "@/components"
  //     }
  //   },
  //   plugins: [
  //     AutoImport({
  //       resolvers: [ElementPlusResolver()],
  //     }),
  //     Components({
  //       resolvers: [ElementPlusResolver()],
  //     }),
  //   ]
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
      .set("@api", "@/api")
      .set("@router", "@/router")
      .set("@store", "@/store")
      .set("@views", "@/views");
    config
      .plugin("AutoImport")
      .use(AutoImport({ resolvers: [ElementPlusResolver()] }));
    config
      .plugin("Components")
      .use(Components({ resolvers: [ElementPlusResolver()] }));
  }
};