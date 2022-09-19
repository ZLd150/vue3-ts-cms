<template>
  <div :class="cssModule['page-search']">
    <BaseForm v-bind="{ ...config, ...$attrs }">
      <template #header>
        <h1 :class="cssModule.header">高级检索</h1>
      </template>
      <template #footer>
        <h1 :class="cssModule.footer">
          <el-button type="success" auto-insert-space icon="Refresh"
            >重置</el-button
          >
          <el-button type="primary" auto-insert-space icon="Search"
            >查询</el-button
          >
        </h1>
      </template>
    </BaseForm>
  </div>
</template>

<script setup lang="ts">
import { useCssModule } from "vue";
import BaseForm from "@baseComponents/form";

const props = defineProps({
  config: { type: Object, required: true }
});
const cssModule = useCssModule();
</script>

<style lang="less" module>
@import url("./App.less");
</style>
