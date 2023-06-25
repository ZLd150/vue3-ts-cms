import { dayjs } from "element-plus";

type CommonFormType = {
  items: System.Form.FormItem[];
  labelWidth?: number;
  itemStyle?: Record<string, string>;
};

const formItems: System.Form.FormItem[] = [
  {
    controlType: "input",
    name: "name",
    label: "用户名：",
    colLayout: { xs: 24, sm: 24, md: 12, lg: 8, xl: 6 },
    props: {
      placeholder: "请输入用户名"
    }
  },
  {
    controlType: "input",
    name: "realName",
    label: "真实姓名：",
    colLayout: { xs: 24, sm: 24, md: 12, lg: 8, xl: 6 },
    props: {
      placeholder: "请输入真实姓名"
    }
  },
  {
    controlType: "input",
    name: "cellPhone",
    label: "电话号码：",
    colLayout: { xs: 24, sm: 24, md: 12, lg: 8, xl: 6 },
    props: {
      placeholder: "请输入手机号"
    }
  },
  {
    controlType: "select",
    name: "enable",
    label: "状态：",
    colLayout: { xs: 24, sm: 24, md: 12, lg: 8, xl: 6 },
    props: {
      placeholder: "请选择状态",
      options: [
        {
          label: "启用",
          value: 1
        },
        {
          label: "禁用",
          value: 0
        }
      ]
    }
  },
  {
    controlType: "datepicker",
    name: "createAt",
    label: "创建时间：",
    colLayout: { xs: 24, sm: 24, md: 12, lg: 8, xl: 6 },
    props: {
      placeholder: "请选择创建时间范围",
      type: "daterange",
      unlinkPanels: true,
      valueFormat: "YYYY-MM-DD",
      startPlaceholder: "开始时间",
      endPlaceholder: "结束时间"
    }
  }
];

const addUserFormItems: System.Form.FormItem[] = [
  {
    controlType: "input",
    name: "name",
    label: "用户名称：",
    colLayout: { span: 24 },
    props: {
      placeholder: "请输入账户名称"
    }
  },
  {
    controlType: "input",
    name: "realname",
    label: "真实姓名：",
    colLayout: { span: 24 },
    props: {
      placeholder: "请输入真实姓名"
    }
  },
  {
    controlType: "input",
    name: "password",
    label: "用户密码：",
    colLayout: { span: 24 },
    props: {
      type: "password",
      showPassword: true,
      clearable: true,
      placeholder: "请输入账户密码"
    }
  },
  {
    controlType: "input",
    name: "cellphone",
    label: "电话号码：",
    colLayout: { span: 24 },
    props: {
      placeholder: "请输入电话号码"
    }
  },
  {
    controlType: "select",
    name: "roleId",
    label: "选择角色：",
    colLayout: { span: 24 },
    props: {
      placeholder: "请选择角色",
      query: "roleList"
    }
  },
  {
    controlType: "select",
    name: "departmentId",
    label: "选择部门：",
    colLayout: { span: 24 },
    props: {
      placeholder: "请选择部门",
      query: "departmentList"
    }
  }
];

export const userFormConfig: CommonFormType = {
  labelWidth: 120,
  itemStyle: { padding: "10px 40px" },
  items: formItems
};

export const addUserFormConfig: CommonFormType = {
  labelWidth: 100,
  items: addUserFormItems
};

export const columns: System.Tabel.TabelItem[] = [
  {
    label: "序号",
    align: "center",
    width: 60,
    renderer: "TABLEPAGEINDEX"
  },
  {
    prop: "name",
    label: "用户名",
    align: "center",
    minWidth: 100
  },
  {
    prop: "realname",
    label: "姓名",
    align: "center",
    minWidth: 100
  },
  {
    prop: "cellphone",
    label: "手机号码",
    align: "center",
    minWidth: 100
  },
  {
    prop: "enable",
    label: "状态",
    align: "center",
    minWidth: 100,
    slot: true
  },
  {
    prop: "createAt",
    label: "创建时间",
    align: "center",
    minWidth: 100,
    renderer: "FORMATDATE"
  },
  {
    prop: "updateAt",
    label: "更新时间",
    align: "center",
    minWidth: 100,
    renderer: "FORMATDATE"
  },
  {
    prop: "operation",
    label: "操作",
    align: "center",
    minWidth: 100,
    slot: true
  }
];
