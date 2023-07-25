import { defineComponent, PropType, computed } from "vue";
import BaseChart from "../../src/BaseChart";
import mapCityToMap from "../../config/cityToMap";

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
      backgroundColor: "#fff",
      title: {
        text: "全国销量统计",
        left: "center",
        textStyle: {
          color: "#fff"
        }
      },
      tooltip: {
        trigger: "item"
      },
      visualMap: {
        min: 0,
        max: 60000,
        left: 20,
        bottom: 20,
        calculable: true,
        text: ["高", "低"],
        inRange: {
          color: ["rgb(70, 240, 252)", "rgb(250, 220, 46)", "rgb(245, 38, 186)"]
        },
        textStyle: {
          color: "#000"
        }
      },
      geo: {
        map: "china",
        roam: "scale",
        emphasis: {
          areaColor: "#f4cccc",
          borderColor: "rgb(9, 54, 95)",
          itemStyle: {
            areaColor: "#f4cccc"
          }
        }
      },
      series: [
        {
          name: "销量",
          type: "scatter",
          coordinateSystem: "geo",
          data: mapCityToMap(props.data),
          symbolSize: 12,
          emphasis: {
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1
            }
          }
        },
        {
          type: "map",
          map: "china",
          geoIndex: 0,
          aspectScale: 1,
          tooltip: {
            show: false
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
