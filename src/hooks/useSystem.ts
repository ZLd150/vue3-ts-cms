import { ref, Ref } from "vue";
import { useStore } from "@/store";
import type { UserInfoType, RoleMenuType } from "@/api/login";
import type { Department, RoleItem } from "@/api/main/system";

type BaseInfo = {
  token: string;
  permissionList: string[];
  userInfo: UserInfoType;
  userMenus: RoleMenuType[];
  entireDepartment: Department[];
  entireRole: RoleItem[];
};

const permissionList = ref<string[]>([]);
const userInfo = ref({}) as Ref<UserInfoType & { token: string }>;
const menuList = ref<RoleMenuType[]>([]);
const departmentList = ref<Department[]>([]);
const roleList = ref<RoleItem[]>([]);

export const useStart = () => {
  const store = useStore();
  const {
    token,
    permissionList: list,
    userInfo: info,
    userMenus: menus,
    entireDepartment,
    entireRole
  } = store.getters["login/userBaseInfo"] as BaseInfo;
  permissionList.value = [...list];
  userInfo.value = { ...info, token };
  menuList.value = [...menus];
  departmentList.value = [...entireDepartment];
  roleList.value = [...entireRole];
};

const useSystem = () => {
  return { permissionList, userInfo, menuList, departmentList, roleList };
};

export { useSystem as default };
