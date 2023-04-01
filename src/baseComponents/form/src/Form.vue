<template>
  <div :class="cssModule['base-form']">
    <!-- 头 -->
    <div :class="cssModule['base-form-header']">
      <slot name="header"></slot>
    </div>
    <!-- 表单 -->
    <el-form :label-width="labelWidth + 'px'">
      <el-row>
        <template v-for="{ label, rules = [], ...args } in items" :key="label">
          <el-col v-bind="colLayout">
            <el-form-item v-bind="{ label, rules, style: itemStyle }">
              <component
                v-bind="args.props"
                :is="components[args.controlType]"
                style="width: 100%"
                :modelValue="values[args.name]"
                @update:modelValue="(val:any) => values[args.name] = val"
              >
              </component>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- 尾 -->
    <div :class="cssModule['base-form-footer']">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCssModule, reactive, PropType, defineAsyncComponent } from "vue";

import { watchDebounced } from "@vueuse/core";

const props = defineProps({
  items: {
    type: Array as PropType<System.Form.FormItem[]>,
    default: () => []
  },
  form: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
  labelWidth: { type: Number, default: 100 },
  itemStyle: { type: Object, default: () => ({ padding: "10px 40px" }) },
  colLayout: {
    type: Object,
    default: () => ({ xl: 6, lg: 8, md: 12, sm: 24, xs: 24 })
  }
});
const emits = defineEmits(["update:form"]);

const cssModule = useCssModule();
const components: Record<string, ReturnType<typeof defineAsyncComponent>> = {
  input: defineAsyncComponent(() => import("element-plus/es/components/input")),
  select: defineAsyncComponent(() => import("../components/Select.vue")),
  datepicker: defineAsyncComponent(
    () => import("element-plus/es/components/date-picker")
  )
};

const values = reactive({ ...props.form });
// 防抖监听
watchDebounced(values, (val: typeof values) => emits("update:form", val), {
  debounce: 500
});
</script>

<style lang="less" module>
@import url("./App.less");
</style>
