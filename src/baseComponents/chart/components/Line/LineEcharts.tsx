import { defineComponent, PropType, computed } from "vue";
import BaseChart from "../../src/BaseChart";
import type { EChartsOption } from "echarts";

export default defineComponent({
  props: {
    xLabels: { type: Array as PropType<string[]>, default: () => [] },
    values: { type: Array as PropType<any[]>, default: () => [] }
  },
  setup(props, { slots, expose, attrs, emit }) {
    const optionInfo = computed<EChartsOption>(() => ({
      legend: {
        data: ["分别销量"]
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985"
          }
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: props.xLabels
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "分别销量",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series"
          },
          data: props.values
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
