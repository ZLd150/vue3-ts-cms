import { defineComponent } from "vue";
import $style from "./App.module.less";

export default defineComponent({
  setup(props, { slots }) {
    const { start, end } = slots;
    return () => (
      <div class={$style.toolbar}>
        <div>{start?.()}</div>
        <div style="flex-grow: 1;"></div>
        <div>{end?.()}</div>
      </div>
    );
  }
});
