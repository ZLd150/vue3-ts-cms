<template>
  <div :class="$style.login">
    <loginPanelVue />
  </div>
</template>

<script lang="ts" setup>
import loginPanelVue from "./childComponents/login-panel.vue";
</script>

<style lang="less" module>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url("../../assets/img/login-bg.svg");
}
</style>
