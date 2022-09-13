<template>
  <div :class="cssModule.user">
    <div :class="cssModule['user-search']">
      <BaseForm v-bind="config" />
    </div>
    <div :class="cssModule['user-content']">主要内容</div>
  </div>
</template>
<script setup lang="ts">
import { useCssModule } from "vue";
import { userFormConfig as config } from "./config/field";
import BaseForm from "@baseComponents/form";

const cssModule = useCssModule();
</script>

<style lang="less" module>
.user {
  height: 100%;
  .user-search {
    width: 100%;
  }

  .user-content {
    width: 100%;
  }
}
</style>
