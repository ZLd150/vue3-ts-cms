declare namespace System {
  declare namespace Form {
    type itemlType = "input" | "select" | "datepicker";
    export type FormItem = {
      controlType: itemlType;
      name: string;
      xs?: number;
      label: string;
      props?: {
        placeholder?: string;
        options?: any[];
        [key: string]: any;
      };
      on?: {
        [key: string]: (...args: any[]) => void;
      };
      rules?: any[];
      renderer?(value: any, data?: Record<string, any>): any;
    };
  }
}
