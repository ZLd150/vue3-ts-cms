import { ref, reactive, computed, defineComponent } from "vue";
import { useStore } from "@/store";
import { userFormConfig as config } from "./config/field";
import type { QueryInfo } from "@/api/main/system";
import PageSearch from "@components/pageSearch";
import styles from "./App.module.less";

export default defineComponent({
  props: {},
  emits: [],
  setup(props, { slots, expose, attrs, emit }) {
    const store = useStore();
    const searchValues = reactive({
      userId: "",
      userName: "",
      realName: "",
      phone: "",
      status: "",
      createDate: ""
    });
    const userList = computed(
      () => store.state.system?.userList as QueryInfo[]
    );
    const userCount = computed(() => store.state.system?.userCount as number);
    // 请求用户列表数据
    store.dispatch("system/getPageListAction", {
      pageUrl: "/users/list",
      queryInfo: {
        offset: 0,
        size: 10
      }
    });

    return () => (
      <div class={styles.user}>
        {/* 搜索模块 */}
        <PageSearch config={config} formData={searchValues} />
        {/* 内容模块 */}
        <div class={styles["user-content"]}>
          <el-table
            data={userList.value}
            border
            style={{ width: "100%", borderTop: "20px solid #f5f5f5" }}
          >
            <el-table-column
              prop="realname"
              align="center"
              label="姓名"
              min-width="100"
            />
            <el-table-column
              prop="name"
              align="center"
              label="姓名拼音"
              min-width="100"
            />
            <el-table-column prop="cellphone" align="center" label="电话号码" />
          </el-table>
        </div>
      </div>
    );
  }
});
