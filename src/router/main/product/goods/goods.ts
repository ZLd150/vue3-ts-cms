const goods = () => import("@/views/main/product/goods/Goods");
export default {
  path: "/main/product/goods",
  name: "goods",
  component: goods,
  children: []
};
