declare namespace System {
  declare namespace Form {
    type ItemlType = "input" | "select" | "datepicker" | "dataTree";
    type BreakpointType = {
      span?: number;
      offset?: number;
      pull?: number;
      push?: number;
    };
    type ColLayoutType = {
      span?: number;
      offset?: number;
      push?: number;
      pull?: number;
      xl?: number | BreakpointType;
      lg?: number | BreakpointType;
      md?: number | BreakpointType;
      sm?: number | BreakpointType;
      xs?: number | BreakpointType;
    };
    export type SelectType = {
      label: string;
      value: string | number | boolean;
      disabled?: boolean;
    };
    export type FormItem = {
      controlType: ItemlType;
      name: string;
      colLayout?: ColLayoutType;
      label: string;
      visible?: boolean;
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
