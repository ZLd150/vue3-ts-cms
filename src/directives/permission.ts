import { Directive } from "vue";
import usePermission from "@hooks/usePermission";

const permissionMap = new Map<string, { el: HTMLElement; temp: Comment }>();

// 删除节点
const deleteNode = (el: HTMLElement, val: string) => {
  // 创建注释节点
  const temp = document.createComment(val);
  // 替换
  el.replaceWith(temp);
  // 缓存替换的元素
  permissionMap.set(val, { el, temp });
};

// 还原节点
const resetNode = (btn: { el: HTMLElement; temp: Comment }) => {
  const { temp, el } = btn;
  temp.replaceWith(el);
};

// 导出一个匿名函数用作自定义指令的第二个参数
export default (): Directive => {
  const { hasPermission } = usePermission();
  return {
    mounted(el: HTMLElement, bindng: any) {
      const { value } = bindng;
      // 挂载的时候没有权限把元素删除
      if (value && !hasPermission(value)) deleteNode(el, value);
    },
    updated(el: HTMLElement, bindng: any) {
      const { value, oldValue } = bindng;
      let btn;
      if (value === oldValue) return;
      const oldPermission = hasPermission(oldValue);
      const newPermission = hasPermission(value);
      if (oldPermission === newPermission) return;
      if (newPermission && (btn = permissionMap.get(oldValue))) {
        // 存在权限,还原
        resetNode(btn);
      } else if (oldPermission && !newPermission) {
        // 有权限变更为无权限
        deleteNode(el, value);
      }
    }
  };
};
