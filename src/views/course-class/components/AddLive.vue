<template>
  <div class="">
    <el-drawer v-model="isDrawer" size="50%" :before-close="close">
      <template #header>
        <h4>新增直播</h4>
      </template>
      <div class="header">
        <h3>{{ classObj.courseName }}</h3>
        <p><span>班期名称:</span> {{ classObj.className }}</p>
        <el-button type="primary" @click="openAddLiveDialog"
          >新增直播</el-button
        >
      </div>
      <div class="live-list">
        <ul>
          <li
            v-for="item in classObj.liveList.liveList"
            :key="item._id"
            class="live-item"
          >
            <div class="tag">{{ tagTxt(item) }}</div>
            <div class="live-content">
              <h5>{{ item.liveName }}</h5>
              <div>
                <span>讲师 {{ item.teacher }}</span>
                <span>直播时间: {{ formatTime(item.liveTime) }}</span>
                <span
                  >时长:
                  {{
                    item.liveTime - new Date() > 0 ? "--.--" : "02:04:30"
                  }}</span
                >
              </div>
              <div class="delete" @click="deleteLiveFn(item)">
                <el-icon>
                  <Delete />
                </el-icon>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <AddLiveDialog
        ref="addLiveDialogRef"
        :classObj="classObj"
        @change="refreshClassObj"
      ></AddLiveDialog>
    </el-drawer>
  </div>
</template>
<script setup>
import { ref, defineExpose, defineProps, defineEmits } from "vue";
import { formatTime } from "@/utils/formatTime";
import { Delete } from "@element-plus/icons-vue";
import AddLiveDialog from "./AddLiveDialog.vue";
import { deleteLive } from "@/api/live";
import { ElMessage } from "element-plus";

const isDrawer = ref(false);
const props = defineProps(["classObj"]);
const addLiveDialogRef = ref(null);
const emit = defineEmits(["change"]);
const open = () => {
  isDrawer.value = true;
};

const close = () => {
  document.querySelector(".el-drawer__body").scrollTo(0, 0);
  isDrawer.value = false;
};
const tagTxt = (item) => {
  return item.liveTime - new Date() > 0 ? "直播" : "回放";
};
const openAddLiveDialog = () => {
  addLiveDialogRef.value.open();
};
const refreshClassObj = () => {
  emit("change");
};
const deleteLiveFn = async (item) => {
  const queryParams = {};
  // 外层_id
  queryParams._id = props.classObj.liveList._id;

  queryParams.id = item._id;

  const { data } = await deleteLive(queryParams);

  if (!data.code) {
    ElMessage.success(data.txt);
    emit("change");
  } else {
    ElMessage.error(data.txt);
  }
};
defineExpose({ open });
</script>
<style lang="scss" scoped>
:deep(.el-drawer__body) {
  padding-top: 0;
}
.header {
  position: absolute;
  box-sizing: border-box;
  width: 92%;
  top: 70px;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
  background-color: #fff;
  z-index: 100;
  h3 {
    font-size: 15px;
    color: #000;
  }
  p {
    font-size: 13px;
    color: #666;
    margin-top: 20px;
    margin-bottom: 20px;
    span {
      color: #ccc;
    }
  }
}
.live-list {
  margin-top: 130px;
  .live-item {
    position: relative;
    padding: 25px 60px;
    &:hover {
      .delete {
        display: block;
      }
    }
    .live-content {
      h5 {
        font-size: 14px;
      }
      div {
        margin-top: 15px;
        font-size: 12px;
        color: #bfbfbf;
        span {
          margin-right: 50px;
        }
      }
    }
    .tag {
      position: absolute;
      left: 12px;
      top: 25px;
      width: 38px;
      height: 20px;
      border: 1px solid #eee;
      text-align: center;
      line-height: 20px;
      font-size: 12px;
      background-color: #fafafa;
      border-radius: 5px;
    }
    .delete {
      display: none;
      position: absolute;
      left: 50%;
      top: 26px;
      margin-left: 200px;
      width: 20px;
      height: 20px;
      color: #e37777 !important;
      cursor: pointer;
      font-size: 15px !important;
    }
  }
}
</style>
