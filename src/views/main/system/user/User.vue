<template>
  <div :class="cssModule.user">
    <!-- 搜索模块 -->
    <PageSearch :config="config" :formData="searchValues" />
    <!-- 内容模块 -->
    <div :class="cssModule['user-content']">主要内容</div>
  </div>
</template>
<script setup lang="ts">
import { useCssModule, reactive } from "vue";
import { userFormConfig as config } from "./config/field";
import PageSearch from "@components/pageSearch";

const cssModule = useCssModule();
const searchValues = reactive({
  userId: "",
  userName: "",
  realName: "",
  phone: "",
  status: "",
  createDate: ""
});
</script>

<style lang="less" module>
.user {
  height: 100%;

  .user-content {
    width: 100%;
  }
}
</style>
