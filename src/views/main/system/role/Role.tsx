import { ref, defineComponent, computed } from "vue";
import { useStore } from "@/store";
import { roleFormConfig, columns, addRoleFormConfig } from "./config/field";
import Table from "@baseComponents/table";
import ToolBar from "@baseComponents/toolbar";
import BaseForm from "@baseComponents/form";
import Dialog from "@baseComponents/dialog";
import $style from "./App.module.less";

import useToast from "@hooks/useToast";
import useConfirm from "@hooks/useConfirm";

import SystemApi, { RoleItem } from "@/api/main/system";

// 默认值
const defaultValues = () => ({
  name: "",
  intro: "",
  createAt: ""
});

// 新增角色默认值
const addRoleInfo = {
  name: "",
  intro: "",
  menuList: []
};

export default defineComponent({
  emits: [],
  setup(props, { slots, expose, attrs, emit }) {
    const store = useStore();
    const toast = useToast();
    const confirm = useConfirm();

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
      operation: (val: unknown, row: RoleItem) => (
        <>
          <el-button
            type="primary"
            icon="Edit"
            v-permission={"system:role:update"}
            onClick={() => editRole(row)}
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            icon="Delete"
            v-permission={"system:role:delete"}
            onClick={() => deleteRole(row.id, row.name)}
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
              onClick={() => addRole()}
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
    // 弹窗相关
    const win = ref();
    const title = ref("");
    const addRoleValues = ref({});
    const formConfig = ref({ ...addRoleFormConfig });

    const dialogSlots = () => ({
      default: () => (
        <BaseForm
          v-model={[addRoleValues.value, "form"]}
          {...formConfig.value}
        />
      )
    });

    // delete role
    const deleteRole = (id: number, name: string) => {
      confirm.require("提示", `确认删除 ${name} 角色？`, () => {
        loading.value = true;
        // 确认回调
        store
          .dispatch("system/deletePageItemAction", { pageName: "role", id })
          .then(({ code, data }) => {
            if (code === 0) {
              toast.successToast(data ?? "删除成功！");
              queryRoleList();
            } else confirm.hint(data ?? "删除失败！");
          })
          .finally(() => (loading.value = false));
      });
    };

    // add role
    const addRole = () => {
      title.value = "新增角色";
      Object.assign(addRoleValues.value, { ...addRoleInfo });
      win.value?.on("confirm", () => {
        loading.value = true;
        SystemApi.createInfo("/role", { ...addRoleValues.value })
          .then(({ code, data }) => {
            if (code === 0) {
              toast.successToast(data ?? "创建成功！");
              queryRoleList();
            } else confirm.hint(data ?? "创建失败！");
          })
          .finally(() => (loading.value = false));
      });
      win.value?.show();
    };

    // edit role info
    const editRole = (row: RoleItem) => {
      title.value = "编辑角色";
      const { name, intro, id, menuList } = row;
      Object.assign(addRoleValues.value, { name, intro, menuList });
      win.value?.on("confirm", () => {
        loading.value = true;
        SystemApi.editInfo("/role/" + id, { ...addRoleValues.value })
          .then(({ code, data }) => {
            if (code === 0) {
              toast.successToast(data ?? "修改成功！");
              queryRoleList();
            } else confirm.hint(data ?? "修改失败！");
          })
          .finally(() => (loading.value = false));
      });
      win.value?.show();
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
        {/* 弹窗 */}
        <Dialog ref={win} title={title.value} v-slots={{ ...dialogSlots() }} />
      </div>
    );
  }
});
