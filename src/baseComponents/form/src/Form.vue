<template>
  <div :class="cssModule['base-form']">
    <el-form :label-width="labelWidth + 'px'">
      <el-row>
        <template v-for="{ label, rules = [], ...args } in items" :key="label">
          <el-col v-bind="colLayout">
            <el-form-item v-bind="{ label, rules, style: itemStyle }">
              <component
                v-bind="args.props"
                :is="components[args.controlType]"
                style="width: 100%"
              >
              </component>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useCssModule, PropType, defineAsyncComponent } from "vue";

const props = defineProps({
  items: {
    type: Array as PropType<System.Form.FormItem[]>,
    default: () => []
  },
  labelWidth: { type: Number, default: 100 },
  itemStyle: { type: Object, default: () => ({ padding: "10px 40px" }) },
  colLayout: {
    type: Object,
    default: () => ({ xl: 6, lg: 8, md: 12, sm: 24, xs: 24 })
  }
});
const cssModule = useCssModule();
const components: Record<string, ReturnType<typeof defineAsyncComponent>> = {
  input: defineAsyncComponent(() => import("element-plus/es/components/input")),
  select: defineAsyncComponent(() => import("../components/Select.vue")),
  datepicker: defineAsyncComponent(
    () => import("element-plus/es/components/date-picker")
  )
};
</script>

<style lang="less" module>
@import url("./App.less");
</style>
