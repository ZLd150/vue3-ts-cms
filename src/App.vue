<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App"
});
</script>

<script lang="ts" setup>
import { onMounted } from "vue";
import store from "./store";

const setupStore = () => store.dispatch("login/loadLocalLogin");
onMounted(() => setupStore());
</script>

<style lang="less"></style>
