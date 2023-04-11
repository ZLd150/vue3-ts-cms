<template>
  <div :class="mainModule['main']">
    <el-container :class="mainModule['main-content']">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <NavMenu :collapse="isCollapse" />
      </el-aside>
      <el-container :class="mainModule.page">
        <el-header :class="mainModule['page-header']">
          <NavHeader v-model="isCollapse" />
        </el-header>
        <el-main :class="mainModule['page-content']">
          <div :class="mainModule['page-content-main']">
            <div
              v-if="isMainPath"
              :class="mainModule['page-content-main-placeholder']"
            >
              <span>~ 欢迎来到吃瓜系统 ~</span>
            </div>
            <router-view v-else></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useStart } from "@hooks/useSystem";
import NavMenu from "@components/navMenu";
import NavHeader from "@components/navHeader";

const isCollapse = ref(false);
const route = useRoute();
const isMainPath = computed(() => route.path === "/main");
// 初始数据
useStart();
</script>

<style lang="less" module="mainModule">
@import url("./App.less");
</style>
