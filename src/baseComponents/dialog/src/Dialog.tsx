import { ref, defineComponent } from "vue";
import $style from "./App.module.less";

export default defineComponent({
  emits: ["open", "opened", "close", "closed", "cancel", "confirm"],
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
    // 事件监听
    const onListeners = ref<Record<string, (...args: any[]) => void>>({});
    const firingEvent = ref<Record<string, boolean>>({});
    // 获取所有事件
    const getAllListenners = () => onListeners.value;
    // 添加监听事件
    const on = (name: string, fn: (...args: any[]) => void) => {
      onListeners.value[name] = fn;
    };
    // 触发事件
    const fireEvent = (name: string, ...args: any[]) => {
      const onListener = onListeners.value[name];
      // 节流阀,防止短时间内同一事件执行多次
      if (firingEvent.value[name] === true) return;
      firingEvent.value[name] = true;
      if (typeof onListener === "function") {
        onListener(args);
      }
      setTimeout(() => {
        firingEvent.value[name] = false;
      });
    };
    // 触发onLiseners事件和组件v-on事件
    const emitHandler = (name: any, ...args: any[]) => {
      emit(name, ...args);
      fireEvent(name, ...args);
    };
    // 导出的方法
    const exposeAPI = { show, hidden, close, on, fireEvent, getAllListenners };
    expose(exposeAPI);
    // 默认头部
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
    // 默认底部
    const footer = () => (
      <>
        <el-button
          type="warning"
          onClick={() => (emitHandler("cancel"), close())}
        >
          取消
        </el-button>
        <el-button
          type="primary"
          onClick={() => (emitHandler("confirm"), close())}
        >
          确认
        </el-button>
      </>
    );
    // 事件
    const emitAttr = {
      onOpen: () => emitHandler("open"),
      onOpened: () => emitHandler("opened"),
      onClose: () => emitHandler("close"),
      onClosed: () => emitHandler("closed")
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
