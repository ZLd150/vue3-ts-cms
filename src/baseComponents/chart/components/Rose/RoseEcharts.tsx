import { defineComponent, PropType, computed } from "vue";
import BaseChart from "../../src/BaseChart";
import type { EChartsOption } from "echarts";

interface DataType {
  name: string;
  value: number;
}

export default defineComponent({
  props: {
    data: { type: Array as PropType<DataType[]>, default: () => [] }
  },
  setup(props, { slots, expose, attrs, emit }) {
    const optionInfo = computed<EChartsOption>(() => ({
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      series: [
        {
          name: "类别数据",
          type: "pie",
          radius: [20, 120],
          center: ["50%", "50%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 8
          },
          data: props.data
        }
      ]
    }));

    return () => (
      <>
        <BaseChart options={optionInfo.value} />
      </>
    );
  }
});
