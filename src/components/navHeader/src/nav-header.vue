<template>
  <div :class="navHeader.main">
    <el-icon
      :size="25"
      @click="changeState"
      style="vertical-align: middle; cursor: pointer"
    >
      <Expand v-show="!isFold" />
      <Fold v-show="isFold" />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, defineEmits } from "vue";

const props = defineProps({
  modelValue: { type: Boolean, default: false }
});
const emit = defineEmits(["update:modelValue"]);
const isFold = computed({
  set: (newVal: boolean) => emit("update:modelValue", newVal),
  get: () => props.modelValue
});

const changeState = () => (isFold.value = !isFold.value);
</script>

<style lang="less" module="navHeader">
.main {
  font-size: inherit;
}
</style>
