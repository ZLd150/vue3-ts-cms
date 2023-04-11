import { ref } from "vue";
import { useStore } from "@/store";
import type { UserInfoType, RoleMenuType } from "@/api/login";

type BaseInfo = {
  token: string;
  permissionList: string[];
  userInfo: UserInfoType;
  userMenus: RoleMenuType[];
};

const permissionList = ref<string[]>();
const userInfo = ref<UserInfoType & { token: string }>();
const menuList = ref<RoleMenuType[]>();

export const useStart = () => {
  const store = useStore();
  const {
    token,
    permissionList: list,
    userInfo: info,
    userMenus: menus
  } = store.getters["login/userBaseInfo"] as BaseInfo;
  permissionList.value = [...list];
  userInfo.value = { ...info, token };
  menuList.value = [...menus];
};

const useSystem = () => {
  return { permissionList, userInfo, menuList };
};

export { useSystem as default };
