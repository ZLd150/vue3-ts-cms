import { ref, defineComponent, nextTick, PropType } from "vue";
import useSystem from "@hooks/useSystem";
import { getMenuLeafNodes } from "@utils/utils";

type KeyType = Array<string | number>;
type NodeType = Record<string, any>;

const system = useSystem();

const getItems = (items: keyof typeof system | any[]) => {
  if (typeof items === "string" && system[items]?.value instanceof Array) {
    return system[items].value;
  } else if (items instanceof Array) {
    return items;
  }
  return [];
};

export default defineComponent({
  emits: ["update:modelValue"],
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Array as PropType<Array<string | NodeType>>,
      default: () => []
    },
    items: {
      type: [Array, String],
      default: () => []
    },
    emptyText: { type: String, default: "暂无数据" },
    nodeKey: { type: String, default: "" },
    childProps: { type: Object, default: () => ({}) },
    showCheckbox: { type: Boolean, default: true },
    accordion: { type: Boolean, default: false }
  },
  setup(props, { expose, attrs, emit }) {
    const tree = ref();
    const dataList = ref(getItems(props.items as keyof typeof system));
    const expandLeafList = ref<any[]>([]);
    // 设置选中节点(key方式)
    const setCheckedKeys = (keys: KeyType, leafState = false) => {
      if (keys.length) {
        tree.value?.setCheckedKeys(keys, leafState);
      }
    };
    // 设置选中节点(node节点方式)
    const setCheckedNodes = (nodes: NodeType[]) => {
      if (nodes.length) {
        tree.value?.setCheckedNodes(nodes);
      }
    };
    // 获取选中节点
    const getCheckedKeys = (leafState = false) => {
      tree.value?.getCheckedKeys(leafState);
    };
    // 设置某个节点的选中状态
    const setChecked = (
      key: string | number,
      checked: boolean,
      deep = true
    ) => {
      tree.value?.setChecked(key, checked, deep);
    };
    // 节点选中
    const keyChecked = (halfCheckedKeys: KeyType, checkedKeys: KeyType) => {
      // 设置数据
      emit("update:modelValue", halfCheckedKeys.concat(checkedKeys));
    };
    // 设置展开节点
    const setExpandKeys = (keys: KeyType) => {
      if (keys.length) {
        expandLeafList.value = keys;
      }
    };
    const exposeAPI = {
      getTreeRef: () => tree.value,
      setCheckedKeys,
      getCheckedKeys,
      setChecked
    };
    expose(exposeAPI);
    // 初始赋值
    const init = async () => {
      const value = props.modelValue as NodeType[];
      if (!value.length) return;
      await nextTick();
      const leafValue = getMenuLeafNodes(value, props.nodeKey);
      // 选中节点
      setCheckedKeys(leafValue);
      // 展开节点
      setExpandKeys(leafValue);
    };
    init();
    return () => (
      <el-tree
        ref={tree}
        data={dataList.value}
        node-key={props.nodeKey}
        props={props.childProps}
        default-expanded-keys={expandLeafList.value}
        accordion={props.accordion}
        show-checkbox
        highlight-current
        check-on-click-node
        {...attrs}
        onCheck={(node: any, treeData: any) =>
          keyChecked(treeData.halfCheckedKeys, treeData.checkedKeys)
        }
      />
    );
  }
});
