const user = () => import("@/views/main/system/user/User");
export default {
  path: "/main/system/user",
  name: "user",
  component: user,
  children: []
};
