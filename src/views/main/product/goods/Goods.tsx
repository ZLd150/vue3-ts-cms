import { ref, defineComponent, computed } from "vue";
import { useStore } from "@/store";
import { columns } from "./config/field";
import Table from "@baseComponents/table";
import ToolBar from "@baseComponents/toolbar";
import BaseForm from "@baseComponents/form";
import { Delete, Edit, Refresh } from "@element-plus/icons-vue";
import $style from "./App.module.less";

import type { GoodsItem } from "@/api/main/system";

export default defineComponent({
  emits: [],
  setup(props, { slots, expose, attrs, emit }) {
    const store = useStore();
    const loading = ref(false);
    const roleList = computed<GoodsItem[]>(() =>
      store.getters["system/pageListData"]("goods")
    );
    const roleCount = computed<number>(() =>
      store.getters["system/pageCount"]("goods")
    );
    const pageInfo = ref({
      currentPage: 1,
      pageSize: 20
    });
    // 请求商品列表数据
    const queryGoodsList = () => {
      loading.value = true;
      const { currentPage, pageSize } = pageInfo.value;
      store
        .dispatch("system/getPageListAction", {
          pageName: "goods",
          queryInfo: Object.assign({
            offset: (currentPage - 1) * pageSize,
            size: pageSize
          })
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
          start: () => <el-button type="primary" innerText="新增商品" />,
          end: () => (
            <el-button icon={Refresh} circle onClick={() => queryGoodsList()} />
          )
        }}
      />
    );
    // child component emit event
    const childEmits = {
      // pageinfo change
      "onUpdate:pageInfo": (values: typeof pageInfo.value) => {
        Object.assign(pageInfo.value, { ...values });
        queryGoodsList();
      }
    };

    queryGoodsList();
    return () => (
      <div class={$style.goods}>
        <div class={$style["goods-content"]}>
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
