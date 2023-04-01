import { ref, reactive, computed, defineComponent, watch } from "vue";
import { useStore } from "@/store";
import { userFormConfig, columns } from "./config/field";
import Table from "@baseComponents/table";
import ToolBar from "@baseComponents/toolbar";
import BaseForm from "@baseComponents/form";
import { Delete, Edit, Refresh } from "@element-plus/icons-vue";
import $style from "./App.module.less";

import type { UserItem } from "@/api/main/system";

export default defineComponent({
  props: {},
  emits: [],
  setup(props, { slots, expose, attrs, emit }) {
    const store = useStore();
    const loading = ref(false);
    const searchValues = ref({
      userId: "",
      userName: "",
      realName: "",
      phone: "",
      status: "",
      createDate: ""
    });
    const userList = computed<UserItem[]>(() =>
      store.getters["system/pageListData"]("users")
    );
    const userCount = computed<number>(() =>
      store.getters["system/pageCount"]("users")
    );
    const pageSize = ref(20);

    // 请求用户列表数据
    const queryUserList = () => {
      loading.value = true;
      store
        .dispatch("system/getPageListAction", {
          pageName: "users",
          queryInfo: {
            offset: 0,
            size: pageSize.value
          }
        })
        .finally(() => (loading.value = false));
    };

    // column slot
    const getSlot = () => ({
      enable: (val: number) => (
        <el-button
          size="small"
          plain
          type={val ? "success" : "danger"}
          innerText={val ? "启用" : "禁用"}
        ></el-button>
      ),
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
          start: () => <el-button type="primary" innerText="新增用户" />,
          end: () => (
            <el-button icon={Refresh} circle onClick={() => queryUserList()} />
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

    // 请求数据
    queryUserList();
    return () => (
      <div class={$style.user}>
        {/* 搜索模块 */}
        <div class={$style["user-form"]}>
          <BaseForm
            {...userFormConfig}
            v-model={[searchValues.value, "form"]}
            v-slots={{ ...formSlots() }}
          />
        </div>
        {/* 隔离盒子 */}
        <div style="height: 20px; background: #f5f5f5;"></div>
        {/* 内容模块 */}
        <div class={$style["user-content"]}>
          <Table
            items={userList.value}
            fields={columns}
            total={userCount.value}
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
