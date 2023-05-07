import { ref, defineComponent } from "vue";
import $style from "./App.module.less";

export default defineComponent({
  emits: ["open", "opened", "close", "closed"],
  props: {
    title: { type: String, default: "" },
    width: { type: [String, Number], default: 500 },
    fullscreen: { type: Boolean, default: false },
    delay: { type: Number, default: 100 }
  },
  setup(props, { slots, expose, attrs, emit }) {
    const visible = ref(false);
    const destroy = ref(true);
    // 显示
    const show = () => {
      visible.value = true;
    };
    // 隐藏
    const hidden = () => {
      destroy.value = false;
      visible.value = false;
    };
    // 关闭
    const close = () => {
      destroy.value = true;
      visible.value = false;
    };
    // 导出的方法
    const exposeAPI = { show, hidden, close };
    expose(exposeAPI);

    const header = () => (
      <>
        {/* 标题 */}
        <span class="el-dialog__title" style={{ fontWeight: 600 }}>
          {props.title}
        </span>
        {/* 关闭按钮 */}
        <el-button
          icon="CloseBold"
          class="el-dialog__headerbtn"
          style={{ width: "40px", height: "40px", fontSize: "22px" }}
          circle
          onClick={() => close()}
        />
      </>
    );
    const footer = () => (
      <>
        <el-button type="warning" onClick={() => close()}>
          取消
        </el-button>
        <el-button type="primary">确认</el-button>
      </>
    );
    // 事件
    const emitAttr = {
      onOpen: () => emit("open"),
      onOpened: () => emit("opened"),
      onClose: () => emit("close"),
      onClosed: () => emit("closed")
    };
    return () => (
      <el-dialog
        class={$style.dialog}
        v-model={visible.value}
        width={props.width}
        fullscreen={props.fullscreen}
        open-delay={props.delay}
        close-delay={props.delay}
        close-on-press-escape={false}
        close-on-click-modal={false}
        show-close={false}
        destroy-on-close={destroy.value}
        append-to-body
        align-center
        draggable
        {...attrs}
        {...emitAttr}
        v-slots={{ header: () => header(), footer: () => footer(), ...slots }}
      />
    );
  }
});
