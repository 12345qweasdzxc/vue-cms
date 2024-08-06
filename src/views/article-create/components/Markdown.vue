<template>
  <div class="markdown-container">
    <div id="markdown-box" ref="boxRef"></div>
    <div class="bottom">
      <el-button type="primary" @click="submitFn">提交</el-button>
    </div>
  </div>
</template>
<script setup>
// npm i @toast-ui/editor
import { nextTick, ref, onMounted, defineExpose, defineEmits } from "vue";

import MKEditor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/zh-cn";
import { ElMessage } from "element-plus";

const emit = defineEmits(["success"]);
const boxRef = ref(null);
let mkEditor;

const initEditor = () => {
  mkEditor = new MKEditor({
    el: boxRef.value,
    height: "500px",
    previewStyle: "vertical",
    language: "zh-CN",
  });

  mkEditor.getMarkdown();
};

const clearEditor = () => {
  mkEditor.reset();
};

const submitFn = () => {
  const htmlStr = mkEditor.getHTML();
  if (htmlStr === "<p><br></p>") {
    // 没有输入内容
    ElMessage.warning("内容不能为空");
  } else {
    emit("success", htmlStr);
  }
};
onMounted(async () => {
  await nextTick();
  initEditor();
});
defineExpose({ clearEditor });
</script>
<style lang="scss" scoped>
.markdown-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
