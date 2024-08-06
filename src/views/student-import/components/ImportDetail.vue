<template>
  <div class="import-detail">
    <el-dialog v-model="isShow">
      <template #header>
        <h2>上传详情</h2>
      </template>
      <el-row>
        <el-col :span="12">
          <h3>成功数据</h3>
          <el-table :data="detailObj.succeedStudent" max-height="200">
            <el-table-column
              label="手机号码"
              prop="phoneNumber"
              align="center"
            ></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <h3>失败数据</h3>
          <el-table :data="detailObj.errorStudent" max-height="200">
            <el-table-column
              label="手机号码"
              prop="phoneNumber"
              align="center"
            ></el-table-column>
            <el-table-column
              class-name="reason"
              label="手机号码"
              prop="reason"
              align="center"
            ></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, defineExpose, defineProps } from "vue";
const isShow = ref(false);

const props = defineProps(["detailObj"]);

const open = () => {
  isShow.value = true;
};

defineExpose({ open });
</script>
<style lang="scss" scoped>
.import-detail {
  .btn {
    display: inline-block;
    width: 80px;
    height: 30px;
    line-height: 30px;
    border-radius: 10px;
    text-align: center;
    background-color: #eee;
    font-size: 14px;
    cursor: pointer;
  }
  :deep(.el-col) {
    text-align: center;
  }
  h3 {
    line-height: 50px;
    background: #eee;
  }

  :deep(.reason) {
    div {
      color: red !important;
    }
  }
}
</style>
