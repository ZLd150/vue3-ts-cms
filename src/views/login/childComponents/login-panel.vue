<template>
  <div :class="login['panel']">
    <h1>吃瓜系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span>
            <el-icon style="top: 1px"><UserFilled /></el-icon>
            <span> 账号登录</span>
          </span>
        </template>
        <loginAccount ref="loginAccountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span>
            <el-icon style="top: 1px"><Iphone /></el-icon>
            <span> 手机登录</span>
          </span>
        </template>
        <loginPhone ref="loginPhoneRef" />
      </el-tab-pane>
    </el-tabs>
    <!-- 底部 -->
    <div>
      <div :class="login['footer']">
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
        :class="login['bottom']"
        @click="loginHandler"
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
import type { CheckboxValueType } from "element-plus";

const keepStatus = cache.getCache("isKeepPassword");
const isKeepPassword = ref(keepStatus === "" ? false : !!keepStatus);
const currentTab = ref("account");
const isAccountLogin = computed(() => currentTab.value === "account");
const loginAccountRef = ref<InstanceType<typeof loginAccount>>();
const loginPhoneRef = ref<InstanceType<typeof loginPhone>>();
// 登录方法
const loginHandler = () => {
  if (isAccountLogin.value) {
    loginAccountRef.value?.loginHandler();
  } else {
    // 调用手机登录方法
  }
};

const keepChange = (value: CheckboxValueType) => {
  cache.setCache("isKeepPassword", value);
};
</script>

<style lang="less" module="login">
.panel {
  :global {
    #tab-1 {
      margin-right: -1px;
    }
  }
  width: 320px;
  margin-bottom: 200px;
  text-align: center;

  .footer {
    display: flex;
    height: 32px;
  }

  .bottom {
    width: 100%;
  }
}
</style>
