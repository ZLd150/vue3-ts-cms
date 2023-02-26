declare namespace System {
  declare namespace Tabel {
    type ItemlType = "input" | "select" | "datepicker";

    export type TabelItem = {
      filed: string;
      label: string;
      width: number;
      align: "left" | "center" | "right";
      visible?: boolean;
      renderer?(value: any, data?: Record<string, any>): any;
    };
  }
}
