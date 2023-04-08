import { ref, defineComponent, computed, resolveComponent, h } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import { columns } from "./config/field";
import Table from "@baseComponents/table";
import ToolBar from "@baseComponents/toolbar";
import $style from "./App.module.less";

import type { MenuItem } from "@/api/main/system";

export default defineComponent({
  emits: [],
  setup(props, { slots, expose, attrs, emit }) {
    const router = useRouter();
    const store = useStore();
    const loading = ref(false);
    const menuList = computed<MenuItem[]>(() =>
      store.getters["system/pageListData"]("menu")
    );
    const menuCount = computed<number>(() =>
      store.getters["system/pageCount"]("menu")
    );
    const pageInfo = ref({
      currentPage: 1,
      pageSize: 20
    });
    // 请求菜单列表数据
    const queryMenuList = () => {
      loading.value = true;
      const { currentPage, pageSize } = pageInfo.value;
      store
        .dispatch("system/getPageListAction", {
          pageName: "menu",
          queryInfo: Object.assign({
            offset: (currentPage - 1) * pageSize,
            size: pageSize
          })
        })
        .finally(() => (loading.value = false));
    };

    // jump router
    const jump = (path: string) => {
      // 获取已注册路由,进行匹配
      const findRoute = router.getRoutes().find((t) => t.path.includes(path));
      !findRoute || router.push(findRoute);
    };

    // column slot
    const getSlot = () => ({
      // 路由地址
      url: (val: string, data: MenuItem) => {
        const isDisable = data.type === 1;
        return (
          <el-link
            type={isDisable ? "info" : "primary"}
            disabled={isDisable}
            underline={false}
            onClick={() => jump(val)}
          >
            {val}
          </el-link>
        );
      },
      // 图标
      icon: (val: string) => {
        const icon = val
          .split("-")
          .slice(2)
          .map((t) => t.substring(0, 1).toUpperCase() + t.substring(1))
          .join("");
        return icon ? (
          h(resolveComponent(icon), { width: "1rem", height: "1rem" })
        ) : (
          <span></span>
        );
      },
      operation: () => (
        <>
          <el-button type="primary" icon="Edit" size="small">
            编辑
          </el-button>
          <el-button type="danger" icon="Delete" size="small">
            删除
          </el-button>
        </>
      )
    });
    // table header slot
    const headerSlot = () => (
      <ToolBar
        v-slots={{
          start: () => <el-button type="primary" innerText="新增菜单" />,
          end: () => (
            <el-button icon="Refresh" circle onClick={() => queryMenuList()} />
          )
        }}
      />
    );
    // table expand attributes
    const tableAttrs = {
      "row-key": "id",
      "tree-props": { children: "children" }
    };

    queryMenuList();
    return () => (
      <div class={$style.menu}>
        {/* 内容模块 */}
        <div class={$style["menu-content"]}>
          <Table
            items={menuList.value}
            fields={columns}
            total={menuCount.value}
            v-slots={{ header: () => headerSlot(), ...getSlot() }}
            loading={loading.value}
            header
            pageInfo={pageInfo.value}
            footer={false}
            {...tableAttrs}
          />
        </div>
      </div>
    );
  }
});
