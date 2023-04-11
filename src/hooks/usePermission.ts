import useSystem from "@hooks/useSystem";

const usePermission = () => {
  const { permissionList } = useSystem();
  // 权限校验
  const hasPermission = (permission: string) => {
    return !!permissionList.value?.find((t) => t === permission);
  };

  return { hasPermission };
};

export { usePermission as default };
