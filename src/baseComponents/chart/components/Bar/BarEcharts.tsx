import { defineComponent, PropType, computed } from "vue";
import BaseChart from "../../src/BaseChart";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";

export default defineComponent({
  props: {
    xLabels: { type: Array as PropType<string[]>, default: () => [] },
    values: { type: Array as PropType<any[]>, default: () => [] }
  },
  setup(props, { slots, expose, attrs, emit }) {
    const optionInfo = computed<EChartsOption>(() => ({
      xAxis: {
        data: props.xLabels,
        axisLabel: {
          inside: true,
          color: "#fff"
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        z: 10
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      yAxis: {
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: "#999"
        }
      },
      dataZoom: [
        {
          type: "inside"
        }
      ],
      series: [
        {
          type: "bar",
          showBackground: true,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#83bff6" },
              { offset: 0.5, color: "#188df0" },
              { offset: 1, color: "#188df0" }
            ])
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#2378f7" },
                { offset: 0.7, color: "#2378f7" },
                { offset: 1, color: "#83bff6" }
              ])
            }
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
