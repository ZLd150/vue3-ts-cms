declare namespace System {
  declare namespace Form {
    type ItemlType = "input" | "select" | "datepicker";
    export type SelectType = {
      label: string;
      value: string | number | boolean;
      disabled?: boolean;
    };
    export type FormItem = {
      controlType: ItemlType;
      name: string;
      xs?: number;
      label: string;
      props?: {
        placeholder?: string;
        options?: SelectType[];
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
