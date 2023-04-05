import { ref, computed, defineComponent } from "vue";
import { useStore } from "@/store";
import { userFormConfig, columns } from "./config/field";
import Table from "@baseComponents/table";
import ToolBar from "@baseComponents/toolbar";
import BaseForm from "@baseComponents/form";
import { Delete, Edit, Refresh } from "@element-plus/icons-vue";
import $style from "./App.module.less";

import type { UserItem } from "@/api/main/system";

// 默认值
const defaultValues = () => ({
  name: "",
  realName: "",
  cellPhone: "",
  enable: "",
  createAt: ""
});

export default defineComponent({
  props: {},
  emits: [],
  setup(props, { slots, expose, attrs, emit }) {
    const store = useStore();
    const loading = ref(false);
    const searchValues = ref(defaultValues());
    const userList = computed<UserItem[]>(() =>
      store.getters["system/pageListData"]("users")
    );
    const userCount = computed<number>(() =>
      store.getters["system/pageCount"]("users")
    );
    const pageInfo = ref({
      currentPage: 1,
      pageSize: 20
    });

    // 请求用户列表数据
    const queryUserList = () => {
      loading.value = true;
      const { currentPage, pageSize } = pageInfo.value;
      store
        .dispatch("system/getPageListAction", {
          pageName: "users",
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
          <el-button
            type="primary"
            auto-insert-space
            icon="Search"
            onClick={() => queryUserList()}
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
      queryUserList();
    };
    // child component emit event
    const childEmits = {
      // pageinfo change
      "onUpdate:pageInfo": (values: typeof pageInfo.value) => {
        Object.assign(pageInfo.value, { ...values });
        queryUserList();
      }
    };

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
            pageInfo={pageInfo.value}
            {...childEmits}
          />
        </div>
      </div>
    );
  }
});
