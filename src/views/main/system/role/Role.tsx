import { ref, defineComponent, computed } from "vue";
import { useStore } from "@/store";
import { roleFormConfig, columns } from "./config/field";
import Table from "@baseComponents/table";
import ToolBar from "@baseComponents/toolbar";
import BaseForm from "@baseComponents/form";
import $style from "./App.module.less";

import type { RoleItem } from "@/api/main/system";

// 默认值
const defaultValues = () => ({
  name: "",
  intro: "",
  createAt: ""
});

export default defineComponent({
  emits: [],
  setup(props, { slots, expose, attrs, emit }) {
    const store = useStore();
    const loading = ref(false);
    const searchValues = ref(defaultValues());
    const roleList = computed<RoleItem[]>(() =>
      store.getters["system/pageListData"]("role")
    );
    const roleCount = computed<number>(() =>
      store.getters["system/pageCount"]("role")
    );
    const pageInfo = ref({
      currentPage: 1,
      pageSize: 20
    });
    // 请求角色列表数据
    const queryRoleList = () => {
      loading.value = true;
      const { currentPage, pageSize } = pageInfo.value;
      store
        .dispatch("system/getPageListAction", {
          pageName: "role",
          queryInfo: Object.assign(
            {
              offset: (currentPage - 1) * pageSize,
              size: pageSize
            },
            { ...searchValues.value }
          )
        })
        .finally(() => (loading.value = false));
    };

    // column slot
    const getSlot = () => ({
      operation: () => (
        <>
          <el-button
            type="primary"
            icon="Edit"
            v-permission={"system:role:update"}
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            icon="Delete"
            v-permission={"system:role:delete"}
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
              type="primary"
              innerText="新增角色"
              v-permission={"system:role:create"}
            />
          ),
          end: () => (
            <el-button icon="Refresh" circle onClick={() => queryRoleList()} />
          )
        }}
      />
    );
    // form slots
    const formSlots = () => ({
      footer: () => (
        <>
          <el-button
            type="primary"
            auto-insert-space
            icon="Search"
            onClick={() => queryRoleList()}
          >
            查询
          </el-button>
          <el-button
            type="success"
            auto-insert-space
            icon="Refresh"
            onClick={() => reset()}
          >
            重置
          </el-button>
        </>
      )
    });

    // reset form
    const reset = () => {
      Object.assign(searchValues.value, defaultValues());
      queryRoleList();
    };

    // child component emit event
    const childEmits = {
      // pageinfo change
      "onUpdate:pageInfo": (values: typeof pageInfo.value) => {
        Object.assign(pageInfo.value, { ...values });
        queryRoleList();
      }
    };

    queryRoleList();
    return () => (
      <div class={$style.role}>
        {/* 搜索模块 */}
        <div class={$style["search-form"]}>
          <BaseForm
            {...roleFormConfig}
            v-model={[searchValues.value, "form"]}
            v-slots={{ ...formSlots() }}
          />
        </div>
        {/* 隔离盒子 */}
        <div style="height: 20px; background: #f5f5f5;"></div>
        {/* 内容模块 */}
        <div class={$style["role-content"]}>
          <Table
            items={roleList.value}
            fields={columns}
            total={roleCount.value}
            v-slots={{ header: () => headerSlot(), ...getSlot() }}
            loading={loading.value}
            header
            pageInfo={pageInfo.value}
            {...childEmits}
          />
        </div>
      </div>
    );
  }
});
