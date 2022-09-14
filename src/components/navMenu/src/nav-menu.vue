<template>
  <div :class="menu.main">
    <div :class="menu.logo">
      <img :class="menu.img" src="~@assets/img/logo.svg" alt="logo" />
      <span v-if="!isCollapse" :class="menu.title">Vu3+TS</span>
    </div>
    <el-menu
      :default-active="activeMenuId"
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      unique-opened
      :collapse-transition="false"
    >
      <template v-for="t in userMenus" :key="t.id">
        <!-- 二级菜单 -->
        <template v-if="t.type === 1">
          <!-- 二级可展开标题 -->
          <el-sub-menu :index="t.id + ''">
            <template #title>
              <el-icon v-if="t.icon" style="vertical-align: middle">
                <component :is="getName(t.icon)"></component>
              </el-icon>
              <span>{{ t.name }}</span>
            </template>
            <!-- 二级菜单子项 -->
            <template v-for="y in t.children" :key="y.id">
              <el-menu-item :index="y.id + ''" @click="changeMenuHandler(y)">
                <el-icon v-if="y.icon" style="vertical-align: middle">
                  <component :is="getName(y.icon)"></component>
                </el-icon>
                <span>{{ y.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="t.type === 2">
          <el-menu-item :index="t.id + ''">
            <el-icon v-if="t.icon" style="vertical-align: middle">
              <component :is="getName(t.icon)"></component>
            </el-icon>
            <span>{{ t.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef, watch, ref } from "vue";
import { useStore } from "@store/index";
import { useRouter, useRoute } from "vue-router";
import { pathMapToMenu } from "@utils/mapRouter";
import type { RoleMenuType, RoleSecondLevelMenu } from "@api/login";
import type { MenuType } from "@utils/mapRouter";

const props = defineProps({
  collapse: { type: Boolean, default: false }
});
const router = useRouter();
const route = useRoute();
const store = useStore();
const isCollapse = computed(() => props.collapse);
const userMenus = computed(() => store.state.login.userMenus) as ComputedRef<
  RoleMenuType[]
>;

const getName = (icon: string) => icon.split("-").slice(2).join("-");

const changeMenuHandler = (item: RoleSecondLevelMenu) => {
  router.push({ path: item.url ?? "/not-found" });
};

// 默认点击的菜单选项
const activeMenuId = computed(() => {
  const currentMenu = pathMapToMenu(userMenus.value, route.path) as MenuType;
  return currentMenu ? currentMenu.id + "" : "0";
});
</script>

<style lang="less" module="menu">
.main {
  height: 100%;
  background-color: #001529;
}
.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
  }
}

:global {
  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }

  .el-menu-vertical:not(.el-menu--collapse) {
    width: 100%;
    height: calc(100% - 48px);
  }
}
</style>
