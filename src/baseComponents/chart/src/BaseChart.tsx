import {
  ref,
  defineComponent,
  PropType,
  onMounted,
  watchEffect,
  shallowRef,
  onBeforeUnmount
} from "vue";
import * as echarts from "echarts";

import useEcharts from "@/hooks/useEcharts";

import styles from "./App.module.less";

import type { WatchStopHandle } from "vue";

export default defineComponent({
  emits: [],
  props: {
    width: { type: [Number, String], default: "100%" },
    height: { type: [Number, String], default: 360 },
    options: {
      type: Object as PropType<echarts.EChartsOption>,
      default: () => ({})
    }
  },
  setup(props, { slots, expose, attrs, emit }) {
    const chart = ref<HTMLDivElement>();
    const chartStyle = {
      width: typeof props.width === "number" ? props.width + "px" : props.width,
      height:
        typeof props.height === "number" ? props.height + "px" : props.height
    };

    const stop = shallowRef<WatchStopHandle>();

    const initChart = () => {
      const { chartInstance } = useEcharts(chart.value!);
      stop.value = watchEffect(() => chartInstance.setOption(props.options));
    };

    onMounted(initChart);
    onBeforeUnmount(() => stop.value?.());
    return () => (
      <div class={styles["base-chart"]}>
        <div ref={chart} style={chartStyle}></div>
      </div>
    );
  }
});
