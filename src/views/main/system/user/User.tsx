import { ref, computed, defineComponent } from "vue";
import { useStore } from "@/store";
import { userFormConfig, columns } from "./config/field";
import Table from "@baseComponents/table";
import ToolBar from "@baseComponents/toolbar";
import BaseForm from "@baseComponents/form";
import Dialog from "@baseComponents/dialog";
import $style from "./App.module.less";

import useToast from "@hooks/useToast";
import useConfirm from "@hooks/useConfirm";

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
    const toast = useToast();
    const confirm = useConfirm();
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
      operation: (val: unknown, { id, name }: UserItem) => (
        <>
          <el-button type="primary" icon="Edit">
            编辑
          </el-button>
          <el-button
            type="danger"
            icon="Delete"
            onClick={() => deleteUser(id, name)}
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
              innerText="新增用户"
              onClick={() => addUser()}
            />
          ),
          end: () => (
            <el-button icon="Refresh" circle onClick={() => queryUserList()} />
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
    // delete user
    const deleteUser = (id: number, name: string) => {
      confirm.require("提示", `确认删除 ${name} 用户？`, () => {
        loading.value = true;
        // 确认回调
        store
          .dispatch("system/deletePageItemAction", { pageName: "users", id })
          .then(({ code, data }) => {
            if (code === 0) {
              toast.successToast(data ?? "删除成功！");
              queryUserList();
            } else confirm.hint(data ?? "删除失败！");
          })
          .finally(() => (loading.value = false));
      });
    };
    // 弹窗相关
    const win = ref();
    const title = ref("新增用户");

    // 新增用户
    const addUser = () => {
      win.value?.show();
    };

    const defaultSlot = () => <div>哈哈哈威风威风</div>;

    // 请求数据
    queryUserList();
    return () => (
      <div class={$style.user}>
        {/* 搜索模块 */}
        <div class={$style["search-form"]}>
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
        {/* 弹窗 */}
        <Dialog
          ref={win}
          title={title.value}
          width={600}
          v-slots={{ default: () => defaultSlot() }}
        />
      </div>
    );
  }
});
