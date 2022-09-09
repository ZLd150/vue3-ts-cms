<template>
  <div :class="cssModule['user-info']">
    <template v-for="{ title, cpn } in elseIcons" :key="title">
      <el-icon :size="20" :title="title" :class="cssModule['else-icons']">
        <component :is="cpn"></component>
      </el-icon>
    </template>
    <el-dropdown>
      <div class="el-dropdown-link">
        <el-avatar size="small" :src="avatar" />
        <span>{{ userName }}</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="User">用户信息</el-dropdown-item>
          <el-dropdown-item icon="Setting">系统管理</el-dropdown-item>
          <el-dropdown-item icon="SwitchButton">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { computed, useCssModule } from "vue";
import { useStore } from "vuex";

const store = useStore();
const cssModule = useCssModule();
const userName = computed(() => store.state.login.userInfo.name);
const avatar = require("@assets/img/avatar.png");
const elseIcons = [
  { title: "消息", cpn: "ChatDotRound" },
  { title: "待办", cpn: "CollectionTag" },
  { title: "提醒", cpn: "Bell" }
];
</script>

<style lang="less" module>
.user-info {
  display: flex;
  align-items: center;

  :global {
    .el-dropdown-link {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .el-avatar {
      margin-right: 10px;
    }
  }
}
.else-icons {
  margin-right: 10px;
  cursor: pointer;
}
</style>
