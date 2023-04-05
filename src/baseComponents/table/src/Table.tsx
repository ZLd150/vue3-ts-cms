import { ref, defineComponent, PropType, computed } from "vue";
import * as renderUtils from "@/utils/renderUtils";

import $style from "./App.module.less";

type DefaultSlot = {
  row: CommonObj;
  column: System.Tabel.TabelItem;
  $index: number;
};
type CommonObj = { [key: string]: any };
type RenderUtils = Record<string, (...args: any[]) => any>;

const getHTML = (
  val: any,
  row: CommonObj,
  index: number,
  currentPage: number,
  pageSize: number,
  data: System.Tabel.TabelItem
) => {
  const { renderer } = data;
  if (typeof renderer === "string") {
    return (renderUtils as RenderUtils)[renderer](
      val,
      row,
      index,
      currentPage,
      pageSize
    );
  } else if (typeof renderer === "function") {
    return renderer(val, row, index, currentPage, pageSize);
  }
  return "";
};

type PageInfo = {
  currentPage: number;
  pageSize: number;
};

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<Array<any>>,
      required: true,
      default: () => []
    },
    fields: {
      type: Array as PropType<System.Tabel.TabelItem[]>,
      required: true,
      default: () => []
    },
    showOverflowTooltip: { type: Boolean, default: true },
    header: { type: Boolean, default: false },
    footer: { type: Boolean, default: true },
    loading: { type: Boolean, default: false },
    border: { type: Boolean, default: true },
    total: { type: Number, default: 0 },
    pageInfo: {
      type: Object as PropType<PageInfo>,
      default: () => ({ currentPage: 1, pageSize: 20 })
    }
  },
  emits: [
    "select",
    "select-all",
    "selection-change",
    "row-click",
    "row-contextmenu",
    "expand-change",
    "update:pageInfo"
  ],
  setup(props, { slots, expose, emit }) {
    const table = ref();
    const { header, footer } = slots;
    const tableAPI = {
      table: () => table.value
    };
    expose(tableAPI);
    // pagination emit
    const emitAttr = {
      "onUpdate:current-page": (v: number) => {
        emit(
          "update:pageInfo",
          Object.assign({ ...props.pageInfo }, { currentPage: v })
        );
      },
      "onUpdate:page-size": (v: number) => {
        emit(
          "update:pageInfo",
          Object.assign({ ...props.pageInfo }, { pageSize: v })
        );
      }
    };

    return () => (
      <div class={$style.table}>
        {/* 工具栏 */}
        {props.header && header?.()}
        <el-table
          data={props.items}
          ref={table}
          class={$style["table-content"]}
          v-loading={props.loading}
          element-loading-text="加载中..."
          border={props.border}
          onSelect={(selection: CommonObj, row: CommonObj) =>
            emit("select", selection, row)
          }
          onSelectAll={(selection: CommonObj) => emit("select-all", selection)}
          onSelectionChange={(selection: CommonObj) =>
            emit("selection-change", selection)
          }
          onRowClick={(row: CommonObj, column: CommonObj, e: Event) =>
            emit("row-click", row, column, e)
          }
          onRowContextmenu={(row: CommonObj, column: CommonObj, e: Event) =>
            emit("row-contextmenu", row, column, e)
          }
          onExpandchange={(row: CommonObj, expand: CommonObj) =>
            emit("expand-change", row, expand)
          }
        >
          {props.fields.map((t) => {
            const { type, prop, slot, ...args } = t;
            Object.assign(args, {
              showOverflowTooltip: props.showOverflowTooltip
            });
            return type ? (
              <el-table-column {...t} />
            ) : (
              <el-table-column
                {...args}
                v-slots={{
                  default: ({ row, $index: index }: DefaultSlot) => {
                    const value = row[prop!] ?? "";
                    if (slot === true) {
                      return slots[prop!]?.(value, row, index);
                    } else if (typeof slot === "object") {
                      return slot.body?.(value, row, index);
                    } else {
                      return (
                        <div
                          innerHTML={
                            t.renderer
                              ? getHTML(
                                  value,
                                  row,
                                  index,
                                  props.pageInfo.currentPage,
                                  props.pageInfo.pageSize,
                                  t
                                )
                              : value
                          }
                        ></div>
                      );
                    }
                  }
                }}
              />
            );
          })}
        </el-table>
        {/* 底部 */}
        {props.footer &&
          (footer?.() ?? (
            <div class={$style.footer}>
              <div class={$style.pagination}>
                {/* 分页器 */}
                <el-pagination
                  {...props.pageInfo}
                  pageSizes={[10, 20, 30, 40, 50]}
                  background
                  layout="total, sizes, prev, pager, next, jumper"
                  total={props.total}
                  {...emitAttr}
                />
              </div>
            </div>
          ))}
      </div>
    );
  }
});
