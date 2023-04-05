import { dayjs } from "element-plus";

type userFormConfigType = {
  items: System.Form.FormItem[];
  labelWidth?: number;
  itemStyle?: Record<string, string>;
  colLayout?: Record<string, number>;
};

const formItems: System.Form.FormItem[] = [
  {
    controlType: "input",
    name: "name",
    label: "用户名",
    xs: 8,
    props: {
      placeholder: "请输入用户名！"
    }
  },
  {
    controlType: "input",
    name: "realName",
    label: "真实姓名",
    xs: 8,
    props: {
      placeholder: "请输入真实姓名！"
    }
  },
  {
    controlType: "input",
    name: "cellPhone",
    label: "电话号码",
    xs: 8,
    props: {
      placeholder: "请输入手机号！"
    }
  },
  {
    controlType: "select",
    name: "enable",
    label: "状态",
    xs: 8,
    props: {
      placeholder: "请选择状态！",
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

export const userFormConfig: userFormConfigType = {
  labelWidth: 120,
  itemStyle: { padding: "10px 40px" },
  colLayout: { span: 8 },
  items: formItems
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
