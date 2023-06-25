const formItems: System.Form.FormItem[] = [
  {
    controlType: "input",
    name: "name",
    label: "商品名称",
    colLayout: { xs: 24, sm: 24, md: 12, lg: 8, xl: 6 },
    props: {
      placeholder: "请输入商品名称！"
    }
  },
  {
    controlType: "input",
    name: "newPrice",
    label: "价格",
    colLayout: { xs: 24, sm: 24, md: 12, lg: 8, xl: 6 },
    props: {
      placeholder: "请输入价格！"
    }
  },
  {
    controlType: "input",
    name: "address",
    label: "地址",
    colLayout: { xs: 24, sm: 24, md: 12, lg: 8, xl: 6 },
    props: {
      placeholder: "请输入货源地址！"
    }
  },
  {
    controlType: "datepicker",
    name: "createAt",
    label: "创建时间",
    colLayout: { xs: 24, sm: 24, md: 12, lg: 8, xl: 6 },
    props: {
      type: "daterange",
      unlinkPanels: true,
      startPlaceholder: "开始时间",
      endPlaceholder: "结束时间"
    }
  }
];

export const goodsFormConfig = {
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
    label: "商品名称",
    align: "center",
    minWidth: 100
  },
  {
    prop: "oldPrice",
    label: "原价",
    align: "center",
    minWidth: 50
  },
  {
    prop: "newPrice",
    label: "现价",
    align: "center",
    minWidth: 50
  },
  {
    prop: "imgUrl",
    label: "商品图片",
    align: "center",
    minWidth: 100,
    slot: true
  },
  {
    prop: "status",
    label: "状态",
    align: "center",
    minWidth: 50,
    slot: true
  },
  {
    prop: "inventoryCount",
    label: "库存",
    align: "center",
    minWidth: 80
  },
  {
    prop: "address",
    label: "货源",
    align: "center",
    minWidth: 50
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
