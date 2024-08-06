<template>
  <div class="">
    <el-card class="table">
      <el-form :model="queryParams" :rules="rules" ref="formRef">
        <el-form-item prop="title" label="文章标题">
          <el-input
            v-model="queryParams.title"
            clearable
            placeholder="请输入文章标题"
          ></el-input>
        </el-form-item>
        <el-form-item prop="description" label="文章描述">
          <el-input
            v-model="queryParams.description"
            clearable
            placeholder="请输入文章描述"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-tabs v-model="activeName">
        <el-tab-pane name="first" label="markdown">
          <Markdown @success="successFn" ref="markdownRef"></Markdown>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Markdown from "./components/Markdown.vue";
import { addArticle } from "@/api/article";
import { ElMessage } from "element-plus";
const queryParams = ref({
  title: "",
  description: "",
  content: "",
});
const activeName = ref("first");
const formRef = ref(null);
const rules = ref({
  title: [{ required: true, trigger: "blur", message: "文章标题是必填项" }],
  description: [
    { required: true, trigger: "blur", message: "文章描述是必填项" },
  ],
});
const markdownRef = ref(null);
const successFn = (content) => {
  queryParams.value.content = content;
  formRef.value.validate(async (value) => {
    if (value) {
      const { data } = await addArticle(queryParams.value);
      if (!data.code) {
        ElMessage.success(data.txt);
        formRef.value.resetFields();

        markdownRef.value.clearEditor();
      } else {
        ElMessage.error(data.txt);
      }
    }
  });
};
</script>

<style lang="scss" scoped>
:deep(.el-input) {
  width: 50% !important;
}
</style>
