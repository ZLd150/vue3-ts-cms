<template>
  <el-select :placeholder="placeholder">
    <el-option
      v-for="(t, i) in items"
      :key="i"
      :label="t.label"
      :value="t.value"
      :disabled="t.disabled"
    />
  </el-select>
</template>

<script setup lang="ts">
import { PropType, ref } from "vue";
import useSystem from "@hooks/useSystem";

const props = defineProps({
  options: {
    type: Array as PropType<System.Form.SelectType[]>,
    default: () => []
  },
  placeholder: { type: String, default: "" },
  query: {
    type: String as PropType<"departmentList" | "roleList">,
    default: ""
  }
});

const system = useSystem();
const items: System.Form.SelectType[] = props.query
  ? system[props.query].value!.map((item) => ({
      label: item.name,
      value: item.id
    }))
  : props.options;
</script>

<style lang="less" module></style>
