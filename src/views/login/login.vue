<template>
  <div :class="$style.login">
    <loginPanelVue />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import loginPanelVue from "./childComponents/login-panel.vue";

export default defineComponent({
  components: {
    loginPanelVue
  },
  setup() {
    return {};
  }
});
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
