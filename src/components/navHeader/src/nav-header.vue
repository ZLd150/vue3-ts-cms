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
      <Breadcrumb :list="breadcrumbList" />
      <!-- 用户信息 -->
      <UserInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  computed,
  defineEmits,
  useCssModule,
  ComputedRef
} from "vue";
import { useStore } from "@store/index";
import { useRoute } from "vue-router";
import Breadcrumb from "@baseComponents/breadcrumb";
import UserInfo from "./components/user-info.vue";
import { pathMaptoBreadcrumb } from "@utils/mapRouter";
import type { RoleMenuType } from "@api/login";

const props = defineProps({
  modelValue: { type: Boolean, default: false }
});
const emit = defineEmits(["update:modelValue"]);
const isFold = computed({
  set: (newVal: boolean) => emit("update:modelValue", newVal),
  get: () => props.modelValue
});

const cssModule = useCssModule();
const store = useStore();
const route = useRoute();

const changeState = () => (isFold.value = !isFold.value);
const breadcrumbList: ComputedRef<System.Breadcrumb.ListItem[]> = computed(
  () => {
    const userMenus = store.state.login.userMenus as RoleMenuType[];
    return pathMaptoBreadcrumb(userMenus, route.path);
  }
);
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
