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
          <router-view></router-view>
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
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content,
.page {
  height: 100%;
}

.page-header {
  font-size: inherit;
}

.page-content {
  height: calc(100% - 48px);

  .page-info {
    background-color: #fff;
    border-radius: 5px;
  }
}

:global {
  .el-header,
  .el-footer {
    display: flex;
    color: #333;
    text-align: center;
    align-items: center;
  }

  .el-header {
    height: 48px !important;
  }

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.15s linear;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    color: #333;
    text-align: center;
    background-color: #f0f2f5;
  }
}
</style>
