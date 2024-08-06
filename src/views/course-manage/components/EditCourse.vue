<template>
  <div class="course-edit">
    <el-drawer v-model="isDrawer" size="50%" :before-close="close">
      <template #header>
        <h4>编辑课程</h4>
      </template>
      <el-tabs v-model="activeName">
        <el-tab-pane name="first" label="基础信息">
          <el-form :model="courseQuery" :rules="rules" ref="baseFormRef">
            <el-form-item label="项目" prop="kindName"
              ><el-input v-model="courseQuery.kindName"></el-input
            ></el-form-item>
            <el-form-item label="课程名称" prop="courseName"
              ><el-input v-model="courseQuery.courseName"></el-input
            ></el-form-item>
            <el-form-item label="原价" prop="originalPrice">
              <el-input v-model="courseQuery.originalPrice">
                <template #prefix> ￥ </template>
              </el-input></el-form-item
            >
            <el-form-item label="售价" prop="sellingPrice"
              ><el-input v-model="courseQuery.sellingPrice">
                <template #prefix> ￥ </template></el-input
              ></el-form-item
            >
            <el-form-item label="底价" prop="downPrice"
              ><el-input v-model="courseQuery.downPrice">
                <template #prefix> ￥ </template></el-input
              ></el-form-item
            >
          </el-form>
        </el-tab-pane>
        <el-tab-pane name="second" label="课程封面">
          <el-form :model="coverInfo">
            <el-form-item label="课程描述">
              <el-input
                v-model="coverInfo.description"
                :placeholder="course.description"
              ></el-input>
            </el-form-item>
            <el-form-item label="更换封面">
              <el-upload
                v-model:file-list="coverInfo.file"
                :auto-upload="false"
                :limit="1"
                accept=".png,.jpg"
              >
                <el-button type="primary">选择文件</el-button>
                <template #tip>
                  建议:课程封面大小建议上传1125*633，不超过5M，格式为jpg、png</template
                >
              </el-upload>
            </el-form-item>
            <div class="cover-image">
              <el-image
                style="width: 100px; height: 100px"
                :src="course.coverImage"
                :preview-src-list="[course.coverImage]"
                :initial-index="0"
                fit="cover"
              />
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <template #footer>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submitFn">确认</el-button>
      </template>
    </el-drawer>
  </div>
</template>
<script setup>
import { ref, defineExpose, defineProps, nextTick, defineEmits } from "vue";
import { reviseCourseBase, reviseCourseCover } from "@/api/course";
import { quitFn } from "@/hooks/quitFn";
import { ElMessage } from "element-plus";
const props = defineProps(["course"]);
const emit = defineEmits(["change"]);
const isDrawer = ref(false);
const activeName = ref("first");
const courseQueryRaw = {
  kindName: "",
  courseName: "",
  originalPrice: "",
  sellingPrice: "",
  downPrice: "",
};
const courseQuery = ref(courseQueryRaw);
const rules = ref({
  kindName: [{ required: true, message: "项目名是必填项", trigger: "blur" }],
  courseName: [{ required: true, message: "课程名是必填项", trigger: "blur" }],
  originalPrice: [{ required: true, message: "原价是必填项", trigger: "blur" }],
  sellingPrice: [{ required: true, message: "售价是必填项", trigger: "blur" }],
  downPrice: [{ required: true, message: "底价是必填项", trigger: "blur" }],
});
const baseFormRef = ref(null);

const coverInfo = ref({
  description: "",
  file: [],
});

const initCourseQuery = async () => {
  await nextTick();
  const courseQueryValue = courseQuery.value;
  const course = props.course;
  for (const key in courseQueryValue) {
    courseQueryValue[key] = course[key];
  }
};

const open = () => {
  isDrawer.value = true;
  initCourseQuery();
};
const close = () => {
  quitFn({}, () => {
    closeNoFn();
  });
};

const closeNoFn = () => {
  isDrawer.value = false;
  activeName.value = "first";
  baseFormRef.value.clearValidate();
};

const submitFn = async () => {
  if (activeName.value === "first") {
    // 基础信息数据提交
    baseFormRef.value.validate(async (value) => {
      if (value) {
        // 校验通过
        const { data } = await reviseCourseBase(courseQuery.value);
        if (!data.code) {
          // 成功
          ElMessage.success(data.txt);
          closeNoFn();
          emit("change");
        }
      } else {
        ElMessage.warning("信息填写不规范");
      }
    });
  } else {
    // 封面修改提交

    const coverInfoValue = coverInfo.value;

    if (coverInfoValue.description || coverInfoValue.file.length) {
      // 任一数据有值 走进来

      let formData = new FormData();

      formData.append("courseName", props.course.courseName);

      if (coverInfoValue.description) {
        formData.append("description", coverInfoValue.description);
      }

      if (coverInfoValue.file.length) {
        formData.append("file", coverInfoValue.file[0].raw);
      }

      const { data } = await reviseCourseCover(formData);
      if (!data.code) {
        // 成功
        ElMessage.success(data.txt);
        closeNoFn();
        emit("change");
        coverInfoValue.file = [];
      } else {
        ElMessage.error(data.txt);
      }
    }
  }
};
defineExpose({ open });
</script>
<style lang="scss" scoped>
:deep(.el-drawer__footer) {
  border-top: 1px solid #eee;
}
:deep(.el-form-item__label) {
  width: 80px;
  text-align: right;
}
:deep(.el-input) {
  width: 380px;
}
.cover-image {
  width: 90px;
  margin-left: 80px;
  margin-top: -18px;
  img {
    width: 100%;
  }
}
</style>
