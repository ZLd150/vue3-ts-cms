<template>
  <div :class="mianModule['main']">
    <el-container :class="mianModule['main-content']">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <NavMenu :collapse="isCollapse" />
      </el-aside>
      <el-container :class="mianModule.page">
        <el-header :class="mianModule['page-header']">
          <NavHeader v-model="isCollapse" />
        </el-header>
        <el-main :class="mianModule['page-content']">
          <div :class="mianModule['page-content-main']">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import NavMenu from "@components/navMenu";
import NavHeader from "@components/navHeader";

const isCollapse = ref(false);
</script>

<style lang="less" module="mianModule">
@import url("./App.less");
</style>
