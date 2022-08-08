<template>
  <div :class="$style['login-panel']">
    <h1>吃瓜系统</h1>
    <el-tabs type="border-card" stretch v-model="activeTab">
      <el-tab-pane>
        <template #label>
          <span>
            <el-icon style="top: 1px"><UserFilled /></el-icon>
            <span> 账号登录</span>
          </span>
        </template>
        <loginAccount ref="loginAccountRef" />
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span>
            <el-icon style="top: 1px"><Iphone /></el-icon>
            <span> 手机登录</span>
          </span>
        </template>
        <loginPhone />
      </el-tab-pane>
    </el-tabs>
    <!-- 底部 -->
    <div>
      <div :class="$style['login-footer']">
        <el-checkbox
          v-model="isKeepPassword"
          label="记住密码"
          v-show="isAccountLogin"
          @change="keepChange"
        />
        <span class="space"></span>
        <el-link type="primary" :underline="false">忘记密码</el-link>
      </div>
      <el-button
        size="large"
        type="primary"
        :class="$style.bottom"
        @click="login"
        >立即登录</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import loginAccount from "./login-account.vue";
import loginPhone from "./login-phone.vue";
import cache from "@/utils/cache";

const keepStatus = cache.getCache("isKeepPassword");
const isKeepPassword = ref(keepStatus === "" ? false : !!keepStatus);
const activeTab = ref(0);
const isAccountLogin = computed(() => activeTab.value == 0);
const loginAccountRef = ref<InstanceType<typeof loginAccount>>();

const login = () => {
  loginAccountRef.value?.loginHandler();
};

const keepChange = (value: boolean) => cache.setCache("isKeepPassword", value);
</script>

<style lang="less" module>
.login-panel {
  :global {
    #tab-1 {
      margin-right: -1px;
    }
  }
  width: 320px;
  margin-bottom: 200px;
  text-align: center;

  .login-footer {
    display: flex;
    height: 32px;
  }

  .bottom {
    width: 100%;
  }
}
</style>
