<template>
  <div :class="$style['login-account']">
    <el-form
      ref="formRef"
      label-width="55px"
      :rules="accountRules"
      :model="account"
    >
      <el-form-item label="账号" prop="name">
        <el-input autocomplete="off" v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" show-password v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineExpose } from "vue";
import { useStore } from "vuex";
import { accountRules } from "../config/index";
import cache from "@/utils/cache";
import type { FormInstance } from "element-plus";

const store = useStore();
const formRef = ref<FormInstance>();
const { setCache, getCache, deleteCache } = cache;
// 字段
const account = reactive<Record<string, string>>({
  name: getCache("name"),
  password: getCache("password")
});

// 登录方法
const loginHandler = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1.判断是否需要记住密码
      const isKeepPassword: boolean | string = getCache("isKeepPassword");
      if (isKeepPassword) {
        setCache("name", account.name);
        setCache("password", account.password);
      } else {
        deleteCache("name");
        deleteCache("password");
      }
      // 2.进行登录验证
      store.dispatch("login/accountLoginAction", { ...account });
    }
  });
};

defineExpose({
  loginHandler
});
</script>

<style lang="less" module>
.login-account {
  display: inherit;
}
</style>
