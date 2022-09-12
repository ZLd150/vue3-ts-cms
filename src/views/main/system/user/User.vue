<template>
  <div :class="cssModule.user">
    <div :class="cssModule['user-search']">
      <BaseForm :items="formItems" />
    </div>
    <div :class="cssModule['user-content']">主要内容</div>
  </div>
</template>
<script setup lang="ts">
import { useCssModule } from "vue";
import BaseForm from "@baseComponents/form";

const cssModule = useCssModule();
const formItems: System.Form.FormItem[] = [
  {
    controlType: "input",
    name: "userName",
    label: "用户名",
    xs: 8,
    props: {
      placeholder: "请输入用户名！"
    }
  },
  {
    controlType: "input",
    name: "password",
    label: "密码",
    xs: 8,
    props: {
      type: "password",
      placeholder: "请输入用密码！",
      showPassword: true
    }
  },
  {
    controlType: "select",
    name: "motion",
    label: "喜欢的运动",
    xs: 8,
    props: {
      placeholder: "请选择喜欢的运动！",
      options: [
        {
          label: "足球",
          value: "football"
        },
        {
          label: "篮球",
          value: "basketball"
        },
        {
          label: "排球",
          value: "volleyball"
        }
      ]
    }
  },
  {
    controlType: "datepicker",
    name: "createDate",
    label: "创建时间",
    xs: 8,
    props: {
      placeholder: "请选择创建时间范围！",
      type: "daterange",
      unlinkPanels: true,
      startPlaceholder: "开始时间",
      endPlaceholder: "结束时间"
    }
  }
];
</script>

<style lang="less" module>
.user {
  height: 100%;
  .user-search {
    width: 100%;
  }

  .user-content {
    width: 100%;
  }
}
</style>
