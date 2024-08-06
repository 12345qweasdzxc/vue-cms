<template>
  <div class="import-student">
    <el-card><h4>导入学员</h4></el-card>
    <el-card class="table">
      <div class="import-intro">
        <el-collapse v-model="activeName">
          <el-collapse-item name="1">
            <template #title>
              <span class="title">导入说明</span>
            </template>
            <ul class="content">
              <li>
                1.导入前请先下载相应的模板，严格按照模板规则进行数据输入；
              </li>
              <li>2.只支持excel文件，文件大小要求在2M以内；</li>
              <li>3.在本页面导入学员，学员会进入学员管理模块</li>
            </ul>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="import-template">
        <!-- 在这里 a换成el-button了 -->
        <el-button type="primary" @click="importTemplateFn">下载模板</el-button>

        <div class="import">
          <el-input
            readonly
            placeholder="请选择Excel文件"
            v-model="fileName"
          ></el-input>
          <el-icon class="icon" v-show="fileName" @click="clearFile"
            ><Delete
          /></el-icon>
          <el-upload
            action="/import/student"
            accept=".xlsx, .xls"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="onChange"
            :on-success="successFn"
            :file-list="fileList"
            ref="uploadRef"
          >
            <el-button type="primary" v-if="!fileName">选择文件</el-button>
            <el-button type="primary" v-else @click.prevent.stop="submitFile"
              >导入文件</el-button
            >
          </el-upload>
        </div>
      </div>
      <div class="import-table">
        <el-table
          v-loading="loading"
          :data="importList"
          class="table-wrapper"
          :max-height="tableHeight"
        >
          <el-table-column label="文件名称" prop="filename"></el-table-column>
          <el-table-column label="导入时间">
            <template #default="{ row }">{{ formatTime(row.time) }} </template>
          </el-table-column>
          <el-table-column label="导入人" prop="importPeople"></el-table-column>
          <el-table-column label="导入状态">
            <template #default="{ row }">
              <i class="dot" :style="bgStatus(row.status)"></i>
              <span>{{ txtStatus(row.status) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="数据总量" prop="total"></el-table-column>
          <el-table-column label="成功数" prop="succeedNum"></el-table-column>
          <el-table-column label="失败数" prop="errNum"></el-table-column>
          <el-table-column label="上传详情">
            <template #default="{ row }">
              <el-button size="small" @click="openDetail(row)"
                >上传详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:current-page="queryParams.currentPage"
          v-model:page-size="queryParams.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="getImportListFn"
          @current-change="getImportListFn"
          class="pagination"
        />
      </div>
    </el-card>
    <ImportDetail ref="importDetailRef" :detailObj="detailObj"></ImportDetail>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { getImportList, importTemplate } from "@/api/import";
import { Delete } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { formatTime } from "@/utils/formatTime";
import ImportDetail from "./components/ImportDetail.vue";
import { getAutoHeight } from "@/hooks/getAutoHeight";
const activeName = ref("1");
const fileName = ref("");
const fileList = ref([]);
const uploadRef = ref(null);
const queryParams = ref({
  currentPage: 1,
  pageSize: 10,
});
const total = ref(0);
const importList = ref([]);
const loading = ref(true);
const detailObj = ref({});
const importDetailRef = ref(null);

const { tableHeight, refresh } = getAutoHeight(540);

watch(activeName, () => {
  if (!activeName.value.length) {
    // 关闭了 折叠
    refresh(410);
  } else {
    // 打开了折叠
    refresh(540);
  }
});
const getImportListFn = async () => {
  loading.value = true;
  const { data } = await getImportList(queryParams.value);
  importList.value = data.data;
  total.value = data.total;
  setTimeout(() => {
    loading.value = false;
  }, 500);
};
getImportListFn();

const onChange = (value) => {
  if (value.percentage) {
    // 文件成功上传至后端 也会触发
    clearFile();
  } else {
    // 文件上传至 upload 会触发
    fileName.value = value.name;
  }
};
// 清空文件
const clearFile = () => {
  fileName.value = "";
  fileList.value = [];
};

const submitFile = () => {
  uploadRef.value.submit();
};

const successFn = (result) => {
  if (!result.code) {
    // 0 全部成功
    ElMessage.success(result.txt);
  } else if (result.code === 1) {
    // 部分成功
    ElMessage.warning(result.txt);
  } else {
    // 全部失败
    ElMessage.error(result.txt);
  }
};

const bgStatus = (status) => {
  let background = "";
  switch (status) {
    case 0:
      background = "green";
      break;

    case 1:
      background = "orange";
      break;
    case 2:
      background = "red";
      break;
  }
  return { background };
};

const txtStatus = (status) => {
  let txt = "";
  switch (status) {
    case 0:
      txt = "全部成功";
      break;

    case 1:
      txt = "部分成功";
      break;
    case 2:
      txt = "全部失败";
      break;
  }
  return txt;
};

const openDetail = (row) => {
  detailObj.value = row;
  importDetailRef.value.open();
};

// 记得修改
const importTemplateFn = async () => {
  const { data } = await importTemplate();

  const downloadUrl = window.URL.createObjectURL(data);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = "模板.xlsx";
  link.click();
};
</script>

<style lang="scss" scoped>
.import-intro {
  border: 1px solid #eee;
  font-size: 13px;
}
.import-template {
  display: flex;
  margin-top: 15px;
 
  .import {
    position: relative;
    display: flex;
    margin-left: 40px;
    width: 400px;
    height: 34px;
    .icon {
      position: absolute;
      right: 100px;
      top: 10px;
      font-size: 13px;
      cursor: pointer;
    }
  }
}
:deep(.el-collapse) {
  border: 0 !important;
  .el-collapse-item__wrap {
    border: 0 !important;
  }
  .el-collapse-item__header {
    position: relative;
    border-bottom: 1px solid #eee;
    background-color: #fafafa;
  }
  .el-collapse-item__arrow {
    margin: 0 !important;
    position: absolute;
    left: 20px;
  }
  .title {
    position: absolute;
    left: 40px;
  }
  .content {
    padding-top: 15px;
    padding-left: 20px;
    list-style: none;
    line-height: 30px;
  }
  .el-collapse-item:last-child {
    margin: 0 !important;
  }
}
.table-wrapper {
  margin-top: 20px;
  border: 1px solid #eee !important;
}
.dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  vertical-align: 2px;
  margin-right: 5px;
}
</style>
