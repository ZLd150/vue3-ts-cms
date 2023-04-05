import { dayjs } from "element-plus";
type RowType = Record<string, any>;

export const FORMATDATE = (val: string) => {
  return val ? dayjs(val).format("YYYY-MM-DD HH:mm") : "";
};

export const TABLEPAGEINDEX = (
  val: string,
  row: RowType,
  i: number,
  curPage: number,
  size: number
) => {
  return (curPage - 1) * size + (i + 1);
};
