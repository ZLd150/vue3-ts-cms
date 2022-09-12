<template>
  <div :class="cssModule['base-form']">
    <el-form label-width="100px">
      <el-row>
        <template v-for="t in items" :key="t.label">
          <el-col :span="t.xs || 24">
            <el-form-item :label="t.label">
              <component
                v-bind="t.props"
                :is="components[t.controlType]"
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
import { useCssModule, defineProps, PropType, defineAsyncComponent } from "vue";

const props = defineProps({
  items: {
    type: Array as PropType<System.Form.FormItem[]>,
    default: () => []
  }
});
const cssModule = useCssModule();
const components: Record<string, ReturnType<typeof defineAsyncComponent>> = {
  input: defineAsyncComponent(() => import("element-plus/es/components/input")),
  password: defineAsyncComponent(
    () => import("element-plus/es/components/input")
  ),
  select: defineAsyncComponent(
    () => import("element-plus/es/components/select")
  ),
  datepicker: defineAsyncComponent(
    () => import("element-plus/es/components/date-picker")
  )
};
</script>

<style lang="less" module>
@import url("./App.less");
</style>
