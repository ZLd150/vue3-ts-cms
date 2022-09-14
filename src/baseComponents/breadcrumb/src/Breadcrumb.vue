<template>
  <el-breadcrumb separator-icon="ArrowRightBold">
    <template v-for="{ name } in list" :key="name">
      <el-breadcrumb-item>{{ name }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useCssModule, PropType } from "vue";

const props = defineProps({
  list: {
    type: Array as PropType<System.Breadcrumb.ListItem[]>,
    default: () => []
  }
});
</script>

<style lang="less" module>
@import url("./App.less");
</style>
