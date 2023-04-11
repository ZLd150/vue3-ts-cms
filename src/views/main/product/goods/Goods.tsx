import { ref, defineComponent, computed } from "vue";
import { useStore } from "@/store";
import { columns, goodsFormConfig } from "./config/field";
import Table from "@baseComponents/table";
import ToolBar from "@baseComponents/toolbar";
import BaseForm from "@baseComponents/form";
import $style from "./App.module.less";

import type { GoodsItem } from "@/api/main/system";

// 默认值
const defaultValues = () => ({
  name: "",
  newPrice: "",
  address: "",
  createAt: ""
});

export default defineComponent({
  emits: [],
  setup(props, { slots, expose, attrs, emit }) {
    const store = useStore();
    const loading = ref(false);
    const searchValues = ref(defaultValues());
    const goodsList = computed<GoodsItem[]>(() =>
      store.getters["system/pageListData"]("goods")
    );
    const goodsCount = computed<number>(() =>
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
      imgUrl: (val: string, row: GoodsItem) => (
        <el-image
          style="width: 100px; height: 100px;"
          src={val}
          fit="cover"
          alt={row.name}
          z-index={10}
          preview-src-list={[val]}
          zoom-rate={1.2}
          loading="lazy"
        />
      ),
      status: (val: number) => (
        <el-button
          size="small"
          plain
          type={val ? "success" : "danger"}
          innerText={val ? "启用" : "禁用"}
        ></el-button>
      ),
      operation: () => (
        <>
          <el-button
            type="primary"
            icon="Edit"
            v-permission={"system:goods:update"}
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            icon="Delete"
            v-permission={"system:goods:delete"}
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
              innerText="新增商品"
              v-permission={"system:goods:create"}
            />
          ),
          end: () => (
            <el-button icon="Refresh" circle onClick={() => queryGoodsList()} />
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
            onClick={() => queryGoodsList()}
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
      queryGoodsList();
    };
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
        <div class={$style["search-form"]}>
          <BaseForm
            {...goodsFormConfig}
            v-model={[searchValues.value, "form"]}
            v-slots={{ ...formSlots() }}
          />
        </div>
        {/* 隔离盒子 */}
        <div style="height: 20px; background: #f5f5f5;"></div>
        <div class={$style["goods-content"]}>
          <Table
            items={goodsList.value}
            fields={columns}
            total={goodsCount.value}
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
