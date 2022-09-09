<template>
  <div :class="cssModule['nav-header']">
    <el-icon
      :size="25"
      @click="changeState"
      style="vertical-align: middle; cursor: pointer"
    >
      <Expand v-show="!isFold" />
      <Fold v-show="isFold" />
    </el-icon>
    <div :class="cssModule.content">
      <!-- 面包屑导航 -->
      <div>111</div>
      <!-- 用户信息 -->
      <UserInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, defineEmits, useCssModule } from "vue";
import UserInfo from "./components/user-info.vue";

const props = defineProps({
  modelValue: { type: Boolean, default: false }
});
const emit = defineEmits(["update:modelValue"]);
const isFold = computed({
  set: (newVal: boolean) => emit("update:modelValue", newVal),
  get: () => props.modelValue
});

const cssModule = useCssModule();

const changeState = () => (isFold.value = !isFold.value);
</script>

<style lang="less" module>
.nav-header {
  display: flex;
  width: 100%;
}
.content {
  flex: 1 1 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
}
</style>
