import { ref, defineComponent, computed, resolveComponent, h } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "@/store";
import { columns } from "./config/field";
import Table from "@baseComponents/table";
import ToolBar from "@baseComponents/toolbar";
import $style from "./App.module.less";

import useToast from "@hooks/useToast";
import useConfirm from "@hooks/useConfirm";

import type { MenuItem } from "@/api/main/system";

export default defineComponent({
  emits: [],
  setup(props, { slots, expose, attrs, emit }) {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const toast = useToast();
    const confirm = useConfirm();
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
        const isDisable = data.type === 1 || val === route.path;
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
      operation: (val: unknown, row: MenuItem) => (
        <>
          <el-button
            type="primary"
            icon="Edit"
            size="small"
            v-permission={"system:menu:update"}
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            icon="Delete"
            size="small"
            v-permission={"system:menu:delete"}
            onClick={() => deleteMenu(row.id, row.name)}
          >
            删除
          </el-button>
        </>
      )
    });
    // table header slot
    const headerSlot = () => (
      <ToolBar
        v-slots={{
          start: () => (
            <el-button
              v-permission={"system:menu:create"}
              type="primary"
              innerText="新增菜单"
            />
          ),
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

    // delete menu
    const deleteMenu = (id: number, name: string) => {
      confirm.require("提示", `确认删除 ${name} 菜单？`, () => {
        loading.value = true;
        // 确认回调
        store
          .dispatch("system/deletePageItemAction", { pageName: "menu", id })
          .then(({ code, data }) => {
            if (code === 0) {
              toast.successToast(data ?? "删除成功！");
              queryMenuList();
            } else confirm.hint(data ?? "删除失败！");
          })
          .finally(() => (loading.value = false));
      });
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
