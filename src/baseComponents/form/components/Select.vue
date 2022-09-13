<template>
  <el-select :placeholder="placeholder">
    <el-option
      v-for="(t, i) in options"
      :key="i"
      :label="t.label"
      :value="t.value"
      :disabled="t.disabled"
    />
  </el-select>
</template>

<script setup lang="ts">
import { defineProps, PropType } from "vue";

const props = defineProps({
  options: {
    type: Array as PropType<System.Form.SelectType[]>,
    default: () => []
  },
  placeholder: { type: String, default: "" }
});
</script>

<style lang="less" module></style>
