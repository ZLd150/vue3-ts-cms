declare namespace System {
  declare namespace Tabel {
    type ItemlType = "input" | "select" | "datepicker";

    export type TabelItem = {
      prop?: string;
      label: string;
      align: "left" | "center" | "right";
      width?: string | number;
      minWidth?: string | number;
      type?: "selection" | "index" | "expand";
      visible?: boolean;
      slot?: boolean | Record<string, (...args: any[]) => JSX>;
      renderer?:
        | string
        | JSX
        | ((
            value: string,
            data?: Record<string, any>,
            index?: number,
            curPage?: number,
            pageSize?: number
          ) => any);
    };
  }
}
