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
      tooltip: {
        trigger: "item"
      },
      legend: {
        orient: "horizontal",
        left: "left"
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "50%",
          data: props.data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
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
