import { ElMessageBox } from "element-plus";
import type {
  Action,
  MessageBoxState,
  ElMessageBoxOptions
} from "element-plus";

type Fn = (action?: Action) => void;
type BeforeCloseFn = (
  action: Action,
  instance: MessageBoxState,
  done: () => void
) => void;

// 公共配置
const commonOptions: ElMessageBoxOptions = {
  type: "warning", // 警告类型
  distinguishCancelAndClose: true, // 区分取消/关闭
  lockScroll: true, // 锁定body滚动
  showCancelButton: true, // 显示取消按钮
  showConfirmButton: true, // 显示确定按钮
  cancelButtonText: "取消",
  confirmButtonText: "确认",
  closeOnClickModal: false, // 点击遮罩层不关闭弹窗
  closeOnPressEscape: false, // 按ESC键不能关闭弹窗
  draggable: true, // 可拖放弹窗
  buttonSize: "default" // 按钮规格
};

const useConfirm = () => {
  // 异步提示
  const require = (
    title: string,
    message: string,
    resolveFn?: Fn,
    rejectFn?: Fn,
    beforeCloseFn?: BeforeCloseFn
  ) => {
    return ElMessageBox.confirm(message, title, {
      // 关闭前的回调
      beforeClose: beforeCloseFn
        ? (...args) => beforeCloseFn?.(...args)
        : undefined,
      ...commonOptions
    })
      .then((res: Action) => resolveFn?.() || res)
      .catch((action: Action) => rejectFn?.(action) || action);
  };
  // 阻塞提示
  const hint = (message: string, title = "提示") => {
    return ElMessageBox.alert(message, title, {
      ...commonOptions,
      showCancelButton: false
    })
      .then((res: Action) => res)
      .catch((action: Action) => action);
  };
  return { ...ElMessageBox, require, hint };
};

export { useConfirm as default };
