<template>
  <div class="article-ranking-container">
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">动态展示</span>
        <el-checkbox-group v-model="selectDynamic">
          <el-checkbox
            v-for="item in dynamicData"
            :label="item.label"
            :key="item.label"
            :disabled="item.prop === 'title'"
          ></el-checkbox>
        </el-checkbox-group>
      </div>
    </el-card>
    <el-card class="table">
      <el-table
        :data="articleList"
        v-loading="loading"
        border
        :max-height="tableHeight"
        ref="tableRef"
      >
        <el-table-column
          v-for="item in tableColumns"
          :key="item.label"
          :label="item.label"
          :prop="item.prop"
        >
          <template v-if="item.prop === 'date'" #default="{ row }">
            {{ formatTime(row.date) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="openDetail(row)"
              >查看详情</el-button
            >
            <el-button type="danger" size="small" @click="deleteArticleFn(row)"
              >删除</el-button
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
        @size-change="getArticleListFn"
        @current-change="getArticleListFn"
        class="pagination"
      />
    </el-card>
    <articleDetail ref="articleDetailRef" :content="content"></articleDetail>
  </div>
</template>

<script setup>
import { nextTick, onActivated, onMounted, ref } from "vue";
import { selectDynamic, tableColumns, dynamicData } from "./dynamic";
import { getArticleList, deleteArticle } from "@/api/article";
import { formatTime } from "@/utils/formatTime";
import { getAutoHeight } from "@/hooks/getAutoHeight";
import { tableRef, initSortable } from "./sortable";
import articleDetail from "./components/articleDetail.vue";
import { ElMessage } from "element-plus";
const queryParams = ref({
  pageSize: 10,
  currentpage: 1,
});
const articleList = ref([]);
const total = ref(0);
const loading = ref(true);
const { tableHeight } = getAutoHeight(340);
const articleDetailRef = ref(null);
const content = ref(null);
const getArticleListFn = async () => {
  loading.value = true;
  const { data } = await getArticleList(queryParams.value);
  articleList.value = data.data;
  total.value = data.total;
  setTimeout(() => {
    loading.value = false;
  }, 500);
};
getArticleListFn();
onMounted(async () => {
  await nextTick();
  initSortable(articleList, getArticleListFn);
});

onActivated(getArticleListFn);

const openDetail = (row) => {
  content.value = row.content;
  articleDetailRef.value.open();
};

const deleteArticleFn = async (row) => {
  const { data } = await deleteArticle({ _id: row._id });
  if (!data.code) {
    ElMessage.success(data.txt);
    getArticleListFn();
  }
};
</script>
<style lang="scss" scoped>
:deep(.el-card__body) {
  overflow: hidden;
}
.article-ranking-container {
  .header {
    margin-bottom: 20px;
    .dynamic-box {
      display: flex;
      align-items: center;
      .title {
        margin-right: 20px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }

  :deep(.el-table__row) {
    cursor: pointer;
    height: 75px !important;
  }

  :deep(.sortable-ghost) {
    opacity: 0.6;
    color: #fff !important;
    background: #304156 !important;
  }
}
</style>
