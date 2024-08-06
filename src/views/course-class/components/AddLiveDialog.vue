<template>
  <div class="">
    <el-dialog v-model="isOpen" :before-close="close">
      <template #header> 新建直播 </template>
      <el-form :model="queryParams" :rules="rules" ref="formRef" class="form">
        <el-form-item prop="liveName" label="直播标题">
          <el-input
            v-model="queryParams.liveName"
            clearable
            placeholder="请输入直播标题"
          ></el-input>
        </el-form-item>
        <el-form-item prop="liveTime" label="直播开始时间">
          <el-date-picker
            v-model="queryParams.liveTime"
            type="datetime"
            placeholder="直播开始时间"
            :default-time="defaultTime"
            clearable
            :disabled-date="disabledDateFn"
          ></el-date-picker>
        </el-form-item>
        <el-form-item prop="liveDuration" label="直播时长">
          <el-input
            v-model="queryParams.liveDuration"
            placeholder="请输入直播时长(分钟)"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="teacher" label="讲师">
          <el-select v-model="queryParams.teacher" clearable>
            <el-option value="朱雀" label="朱雀"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submitAddLive">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, defineExpose, defineProps, defineEmits } from "vue";
import { quitFn } from "@/hooks/quitFn";
import { addLive } from "@/api/live";
import { ElMessage } from "element-plus";
const props = defineProps(["classObj"]);
const emit = defineEmits(["change"]);
const isOpen = ref(false);
const queryParams = ref({
  liveName: "",
  liveTime: "",
  liveDuration: "",
  teacher: "",
});
const formRef = ref(null);
const rules = ref({
  liveName: [{ required: true, message: "直播标题是必填项", trigger: "blur" }],
  liveTime: [
    { required: true, message: "直播开始时间是必填项", trigger: "blur" },
  ],
  liveDuration: [
    { required: true, message: "直播时长是必填项", trigger: "blur" },
  ],
  teacher: [{ required: true, message: "讲师是必填项", trigger: "blur" }],
});
const defaultTime = new Date(2000, 1, 1, 20, 30, 0);

const disabledDateFn = (value) => {
  const date = new Date();
  return date >= value; // true disabled  false 可以操作
};
const close = () => {
  quitFn({}, () => {
    isOpen.value = false;
    formRef.value.resetFields();
  });
};
const open = () => {
  isOpen.value = true;
};

const submitAddLive = () => {
  formRef.value.validate(async (value) => {
    if (value) {
      const classObj = props.classObj;
      const { data } = await addLive({
        ...queryParams.value,
        _id: classObj.liveList._id,
        className: classObj.className,
        courseName: classObj.courseName,
      });

      if (!data.code) {
        // 成功了
        ElMessage.success(data.txt);
        isOpen.value = false;
        formRef.value.resetFields();
        emit("change");
      }
    }
  });
};

defineExpose({ open });
</script>
<style lang="scss" scoped>
:deep(.el-form-item__label) {
  width: 130px;
}
.form :deep(.el-input) {
  width: 80% !important;
}
</style>
