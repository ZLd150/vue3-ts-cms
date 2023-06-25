type CommonFormType = {
  items: System.Form.FormItem[];
  labelWidth?: number;
  itemStyle?: Record<string, string>;
};

const formItems: System.Form.FormItem[] = [
  {
    controlType: "input",
    name: "name",
    label: "角色名称",
    colLayout: { xs: 24, sm: 24, md: 12, lg: 8, xl: 8 },
    props: {
      placeholder: "请输入角色名称！"
    }
  },
  {
    controlType: "input",
    name: "intro",
    label: "权限介绍",
    colLayout: { xs: 24, sm: 24, md: 12, lg: 8, xl: 8 },
    props: {
      placeholder: "请输入权限介绍！"
    }
  },
  {
    controlType: "datepicker",
    name: "createAt",
    label: "创建时间",
    colLayout: { xs: 24, sm: 24, md: 12, lg: 8, xl: 8 },
    props: {
      type: "daterange",
      unlinkPanels: true,
      startPlaceholder: "开始时间",
      endPlaceholder: "结束时间"
    }
  }
];

export const roleFormConfig = {
  labelWidth: 120,
  itemStyle: { padding: "10px 40px" },
  colLayout: { span: 8 },
  items: formItems
};

const addRoleFormItems: System.Form.FormItem[] = [
  {
    controlType: "input",
    name: "name",
    label: "角色名：",
    colLayout: { span: 24 },
    props: {
      placeholder: "请输入角色名称"
    }
  },
  {
    controlType: "input",
    name: "intro",
    label: "权限介绍：",
    colLayout: { span: 24 },
    props: {
      placeholder: "请输入角色权限介绍"
    }
  },
  {
    controlType: "dataTree",
    name: "menuList",
    label: "角色权限：",
    colLayout: { span: 24 },
    props: {
      items: "menuList",
      nodeKey: "id",
      childProps: {
        children: "children",
        label: "name"
      },
      style: { height: "150px", overflow: "auto" }
    }
  }
];

export const addRoleFormConfig: CommonFormType = {
  labelWidth: 100,
  items: addRoleFormItems
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
    label: "角色名称",
    align: "center",
    minWidth: 100
  },
  {
    prop: "intro",
    label: "权限介绍",
    align: "center",
    minWidth: 100
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
