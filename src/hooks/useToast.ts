import { ElNotification } from "element-plus";

const useToast = () => {
  // 成功提醒
  const successToast = (message: string, title = "") => {
    ElNotification.success({
      message,
      title,
      duration: 2500,
      position: "top-right",
      zIndex: 100,
      showClose: false
    });
  };
  // 警告提醒
  const warningToast = (message: string, title = "") => {
    ElNotification.warning({
      message,
      title,
      duration: 3000,
      position: "top-right",
      zIndex: 100,
      showClose: false
    });
  };
  return { successToast, warningToast };
};

export { useToast as default };
