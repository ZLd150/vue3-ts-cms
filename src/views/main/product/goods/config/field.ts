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
    minWidth: 100
  },
  {
    prop: "status",
    label: "状态",
    align: "center",
    minWidth: 100
  },
  {
    prop: "inventoryCount",
    label: "库存",
    align: "center",
    minWidth: 100
  },
  {
    prop: "address",
    label: "货源",
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
