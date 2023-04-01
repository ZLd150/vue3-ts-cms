import { dayjs } from "element-plus";

export const FORMATDATE = (val: string) => {
  return val ? dayjs(val).format("YYYY-MM-DD HH:mm") : "";
};
