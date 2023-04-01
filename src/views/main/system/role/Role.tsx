import { ref, defineComponent, computed } from "vue";
import { useStore } from "@/store";
import { roleFormConfig, columns } from "./config/field";
import Table from "@baseComponents/table";
import ToolBar from "@baseComponents/toolbar";
import BaseForm from "@baseComponents/form";
import { Delete, Edit, Refresh } from "@element-plus/icons-vue";
import $style from "./App.module.less";

import type { RoleItem } from "@/api/main/system";

export default defineComponent({
  emits: [],
  setup(props, { slots, expose, attrs, emit }) {
    const store = useStore();
    const loading = ref(false);
    const searchValues = ref({
      name: "",
      intro: "",
      createTime: ""
    });
    const roleList = computed<RoleItem[]>(() =>
      store.getters["system/pageListData"]("role")
    );
    const roleCount = computed<number>(() =>
      store.getters["system/pageCount"]("role")
    );
    const pageSize = ref(20);
    // 请求角色列表数据
    const queryRoleList = () => {
      loading.value = true;
      store
        .dispatch("system/getPageListAction", {
          pageName: "role",
          queryInfo: {
            offset: 0,
            size: pageSize.value
          }
        })
        .finally(() => (loading.value = false));
    };

    // column slot
    const getSlot = () => ({
      operation: () => (
        <>
          <el-button type="primary" size="small">
            <el-icon class="el-icon--left">
              <Edit />
            </el-icon>
            编辑
          </el-button>
          <el-button type="danger" size="small">
            <el-icon class="el-icon--left">
              <Delete />
            </el-icon>
            删除
          </el-button>
        </>
      )
    });
    // table header slot
    const headerSlot = () => (
      <ToolBar
        v-slots={{
          start: () => <el-button type="primary" innerText="新增角色" />,
          end: () => (
            <el-button icon={Refresh} circle onClick={() => queryRoleList()} />
          )
        }}
      />
    );
    // form slots
    const formSlots = () => ({
      footer: () => (
        <>
          <el-button type="success" auto-insert-space icon="Refresh">
            重置
          </el-button>
          <el-button type="primary" auto-insert-space icon="Search">
            查询
          </el-button>
        </>
      )
    });

    queryRoleList();
    return () => (
      <div class={$style.role}>
        {/* 搜索模块 */}
        <div class={$style["user-form"]}>
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
            v-model={[pageSize.value, "pageSize"]}
          />
        </div>
      </div>
    );
  }
});
