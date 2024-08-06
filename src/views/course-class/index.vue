<template>
  <div class="">
    <el-card>
      <h4>班期管理</h4>
    </el-card>
    <el-card class="table">
      <div class="filter-section">
        <el-date-picker
          v-model="queryParams.enrollTime"
          type="daterange"
          range-separator="至"
          start-placeholder="招生时间"
          end-placeholder="招生时间"
          class="filter"
          @change="getClassListFn"
        />
        <el-input
          v-model="queryParams.className"
          placeholder="请输入班期名称"
          class="filter"
          clearable
          @change="getClassListFn"
        ></el-input>
      </div>
      <el-table
        class="table-wrapper"
        v-loading="loading"
        :data="classList"
        :max-height="tableHeight"
      >
        <el-table-column width="200" label="招生时间">
          <template #default="{ row }">
            {{ formatTime(row.enrollTime[0]) }}
            <p>至</p>
            {{ formatTime(row.enrollTime[1]) }}
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          label="班期名称"
          prop="className"
        ></el-table-column>
        <el-table-column width="200" label="直播数量" prop="className">
          <template #default="{ row }">
            {{ row.liveList.liveList.length }}
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          label="学员人数"
          prop="studentNum"
        ></el-table-column>
        <el-table-column
          width="200"
          label="更新人"
          prop="updatePeople"
        ></el-table-column>
        <el-table-column width="200" label="更新时间">
          <template #default="{ row }">
            {{ formatTime(row.updateTime) }}
          </template>
        </el-table-column>
        <el-table-column width="200" label="操作" fixed="right" align="center">
          <template #default="{ row, $index }">
            <el-button disabled size="small">编辑班期</el-button>
            <el-button
              v-if="row.className === 'web-前端进阶框架-朱雀'"
              size="small"
              @click="openAddLive(row, $index)"
              >新增直播</el-button
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
        @size-change="getClassListFn"
        @current-change="getClassListFn"
        class="pagination"
      />
    </el-card>
    <AddLive
      ref="addLiveRef"
      :classObj="classObj"
      @change="getClassListFn"
    ></AddLive>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getClassList } from "@/api/class";
import { formatTime } from "@/utils/formatTime";
import { getAutoHeight } from "@/hooks/getAutoHeight";
import AddLive from "./components/AddLive.vue";
const queryParams = ref({
  enrollTime: "",
  currentPage: 1,
  pageSize: 10,
  className: "",
});
const total = ref(0);
const loading = ref(true);
const classList = ref([]);
const { tableHeight } = getAutoHeight(340);
const classObj = ref({});
const addLiveRef = ref(null);
const index = ref(0);
const getClassListFn = async () => {
  loading.value = true;
  const { data } = await getClassList(queryParams.value);
  classList.value = data.data;
  total.value = data.total;

  const row = classList.value[index.value];
  classObj.value = classObj.value = {
    className: row.className,
    courseName: row.courseName,
    liveList: row.liveList,
  };
  setTimeout(() => {
    loading.value = false;
  }, 500);
};

getClassListFn();

const openAddLive = (row, $index) => {
  index.value = $index;

  classObj.value = classObj.value = {
    className: row.className,
    courseName: row.courseName,
    liveList: row.liveList,
  };
  addLiveRef.value.open();
};
</script>

<style lang="scss" scoped>
:deep(.el-date-editor) {
  vertical-align: -2px;
  width: 30% !important;
}
.table-wrapper p {
  text-indent: 50px;
}
</style>
