import * as echarts from "echarts";

import ChinaMapData from "@baseComponents/chart/config/china.json";

// 注册地图
echarts.registerMap("china", ChinaMapData);

export default function (dom: HTMLElement) {
  const chartInstance = echarts.init(dom);

  // 设置options
  const setChartOptions = (options: echarts.EChartsCoreOption) => {
    chartInstance.setOption(options);
  };

  // 重置echarts
  const resetEcharts = () => chartInstance.resize();

  // 监听window缩放
  window.addEventListener("resize", () => resetEcharts());

  return { chartInstance, setChartOptions, resetEcharts };
}
