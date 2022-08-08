<template>
  <div :class="loginPhone.phone">
    <el-form label-width="70px" :rules="phoneRules" :model="phone">
      <el-form-item label="手机号" prop="phoneNum">
        <el-input v-model="phone.phoneNum" />
      </el-form-item>
      <el-form-item label="验证码" prop="verifyCode">
        <div :class="loginPhone.verifyCcode">
          <el-input v-model="phone.verifyCode" />
          <el-button type="primary" style="margin-left: 10px"
            >获取验证码</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { phoneRules } from "../config/index";

// 字段
const phone = reactive({
  phoneNum: "",
  verifyCode: ""
});
</script>

<style lang="less" module="loginPhone">
.phone {
  display: inherit;

  .verifyCcode {
    display: flex;
  }
}
</style>
