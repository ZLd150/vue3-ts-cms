export const columns: System.Tabel.TabelItem[] = [
  {
    prop: "name",
    label: "菜单名称",
    align: "center",
    minWidth: 100
  },
  {
    prop: "type",
    label: "类型",
    align: "center",
    minWidth: 60
  },
  {
    prop: "url",
    label: "菜单地址",
    align: "center",
    minWidth: 100,
    slot: true
  },
  {
    prop: "icon",
    label: "菜单图标",
    align: "center",
    minWidth: 100,
    slot: true
  },
  {
    prop: "permission",
    label: "按钮权限",
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
