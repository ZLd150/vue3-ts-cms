<template>
  <div :class="cssModule['base-form']">Form组件</div>
</template>

<script setup lang="ts">
import { useCssModule, defineProps, PropType } from "vue";

const props = defineProps({
  items: Array as PropType<System.Form.FormItem[]>
});
console.log(props);
const cssModule = useCssModule();
</script>

<style lang="less" module>
@import url("./App.less");
</style>
