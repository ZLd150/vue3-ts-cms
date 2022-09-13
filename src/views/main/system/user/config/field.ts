type userFormConfigType = {
  items: System.Form.FormItem[];
  labelWidth?: number;
  itemStyle?: Record<string, string>;
  colLayout?: Record<string, number>;
};

const formItems: System.Form.FormItem[] = [
  {
    controlType: "input",
    name: "userId",
    label: "ID",
    xs: 8,
    props: {
      placeholder: "请输入查询ID！"
    }
  },
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
    name: "realName",
    label: "真实姓名",
    xs: 8,
    props: {
      placeholder: "请输入真实姓名！"
    }
  },
  {
    controlType: "input",
    name: "phone",
    label: "电话号码",
    xs: 8,
    props: {
      placeholder: "请输入手机号！"
    }
  },
  {
    controlType: "select",
    name: "status",
    label: "状态",
    xs: 8,
    props: {
      placeholder: "请选择状态！",
      options: [
        {
          label: "正常",
          value: "normal"
        },
        {
          label: "异常",
          value: "abnormal"
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

export const userFormConfig: userFormConfigType = {
  labelWidth: 120,
  itemStyle: { padding: "10px 40px" },
  colLayout: { span: 8 },
  items: formItems
};
