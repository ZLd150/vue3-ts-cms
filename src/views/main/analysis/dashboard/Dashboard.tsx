import { ref, defineComponent, computed } from "vue";
import {
  PieEcharts,
  RoseEcharts,
  LineEcharts,
  BarEcharts,
  MapEcharts
} from "@/baseComponents/chart";

import goodsStatistics, { Count, Sale, Favor } from "@api/main/analysis";

import $style from "./App.module.less";

interface SalesData {
  xLabels: string[];
  values: any[];
}

export default defineComponent({
  emits: [],
  inheritAttrs: false,
  setup(props, { slots, expose, attrs, emit }) {
    const dashboard = ref<HTMLElement>();
    // 每个分类商品的数量
    const categroyGoods = ref<Count[]>([]);
    // 不同城市之间的销量
    const citySalesItems = ref<Sale[]>([]);
    // 分类商品的销量
    const categroySalesItems = ref<Count[]>([]);
    // 分类商品的收藏
    const categroyCollect = ref<Favor[]>([]);

    // 不同图表的数据
    const pieChartsData = computed(() => (chartName: string) => {
      switch (chartName) {
        case "categroyGoods":
          return categroyGoods.value.map(({ name, goodsCount }) => ({
            name,
            value: goodsCount
          }));
        case "categroyGoodsRose":
          return categroyGoods.value
            .filter(({ goodsCount }) => Boolean(goodsCount))
            .map(({ name, goodsCount }) => ({ name, value: goodsCount }));
        default:
          return [];
      }
    });

    const LineChartsData = computed(() => {
      return categroySalesItems.value.reduce(
        (p, c) => {
          const { name, goodsCount } = c;
          if (goodsCount) {
            p["xLabels"].push(name);
            p["values"].push(goodsCount);
          }
          return p;
        },
        { xLabels: [], values: [] } as SalesData
      );
    });

    const BarChartsData = computed(() => {
      return categroyCollect.value.reduce(
        (p, c) => {
          const { name, goodsFavor } = c;
          if (goodsFavor) {
            p["xLabels"].push(name);
            p["values"].push(goodsFavor);
          }
          return p;
        },
        { xLabels: [], values: [] } as SalesData
      );
    });

    const mapData = computed(() => {
      return citySalesItems.value.map(({ address, count }) => ({
        name: address,
        value: count
      }));
    });

    const init = async () => {
      categroyGoods.value = (await goodsStatistics.getCategroyCount()).data;
      citySalesItems.value = (await goodsStatistics.getAddressSale()).data;
      categroySalesItems.value = (await goodsStatistics.getCategroySale()).data;
      categroyCollect.value = (await goodsStatistics.getCategroyFavor()).data;
    };
    init();
    return () => (
      <div ref={dashboard} class={$style.dashboard}>
        {/* 第一行 */}
        <el-row gutter={10}>
          <el-col span={7}>
            <el-card v-slots={{ header: () => "分类商品数量(饼图)" }}>
              <PieEcharts data={pieChartsData.value("categroyGoods")} />
            </el-card>
          </el-col>
          <el-col span={10}>
            <el-card v-slots={{ header: () => "不同城市商品销量" }}>
              <MapEcharts data={mapData.value} />
            </el-card>
          </el-col>
          <el-col span={7}>
            <el-card v-slots={{ header: () => "分类商品数量(玫瑰图)" }}>
              <RoseEcharts data={pieChartsData.value("categroyGoodsRose")} />
            </el-card>
          </el-col>
        </el-row>
        {/* 第二行 */}
        <el-row gutter={10}>
          <el-col span={12}>
            <el-card v-slots={{ header: () => "分类商品的销量" }}>
              <LineEcharts {...LineChartsData.value} />
            </el-card>
          </el-col>
          <el-col span={12}>
            <el-card v-slots={{ header: () => "分类商品的收藏" }}>
              <BarEcharts {...BarChartsData.value} />
            </el-card>
          </el-col>
        </el-row>
      </div>
    );
  }
});
