module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
    "plugin:prettier/recommended" // 当前插件的校验规则,覆盖前面
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/no-var-requires": "off", // 关闭eslint关于requires引入的警告
    "@typescript-eslint/ban-ts-comment": "off", // 关闭不允许使用ignore的警告
    "no-undef": "off" // 关闭找不到警告
  }
};
