<template>
  <div class="">
    <el-card>
      <h4>我的直播</h4>
    </el-card>
    <el-card class="table">
      <div class="filter-section">
        <el-date-picker
          v-model="queryParams.liveTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开播时间"
          end-placeholder="开播时间"
          class="filter"
          @change="getLiveListFn"
        />
        <el-input
          v-model="queryParams.liveName"
          placeholder="请输入直播名称"
          class="filter"
          clearable
          @change="getLiveListFn"
        ></el-input>
      </div>
      <el-table
        class="table-wrapper"
        v-loading="loading"
        :data="liveList.liveList"
        :max-height="tableHeight"
      >
        <el-table-column width="200" label="上课日期/星期">
          <template #default="{ row }">
            {{ formatDate(row.liveTime) }}
          </template>
        </el-table-column>
        <el-table-column width="200" label="上课时间">
          <template #default="{ row }">
            {{ formatDetail(row.liveTime) }}
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          label="直播标题"
          prop="liveName"
        ></el-table-column>
        <el-table-column width="200" label="直播状态" prop="className">
          <template #default="{ row }">
            {{ statusTxt(row.liveTime) }}
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          label="直播时长"
          prop="liveDuration"
        ></el-table-column>
        <el-table-column
          width="200"
          label="班期名称"
          prop="className"
        ></el-table-column>
        <el-table-column
          width="200"
          label="课程名称"
          prop="courseName"
        ></el-table-column>
        <el-table-column
          width="200"
          label="讲师"
          prop="teacher"
        ></el-table-column>

        <el-table-column width="200" label="操作" fixed="right" align="center">
          <template #default="{ row }">
            <el-button
              size="small"
              :disabled="row.liveTime < Date.now()"
              @click="openReviseLive(row)"
              >编辑直播</el-button
            >

            <el-tooltip effect="dark" placement="top">
              <template #content>
                <a href="http://www.baidu.com" target="_new"
                  >http://www.baidu.com</a
                >
              </template>

              <el-button v-show="row.liveTime >= Date.now()" size="small"
                >进入直播</el-button
              >
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="queryParams.currentPage"
        v-model:page-size="queryParams.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="getLiveListFn"
        @current-change="getLiveListFn"
        class="pagination"
      />
    </el-card>
    <reviseLiveDialog
      ref="reviseLiveRef"
      :liveObj="liveObj"
      @change="getLiveListFn"
    ></reviseLiveDialog>
  </div>
</template>

<script setup>
import { onActivated, ref } from "vue";
import { getLiveList } from "@/api/live";
import { getAutoHeight } from "@/hooks/getAutoHeight";
import { formatDate, formatDetail } from "@/utils/formatTime";
import reviseLiveDialog from "./components/reviseLiveDialog.vue";
const queryParams = ref({
  liveTime: "",
  liveName: "",
  currentPage: 1,
  pageSize: 10,
});
const total = ref(0);
const loading = ref(true);
const liveList = ref([]);
const { tableHeight } = getAutoHeight(340);
const liveObj = ref({});
const reviseLiveRef = ref(null);

const getLiveListFn = async () => {
  loading.value = true;
  const { data } = await getLiveList(queryParams.value);
  liveList.value = data.data;
  total.value = data.total;
  setTimeout(() => {
    loading.value = false;
  }, 500);
};
getLiveListFn();

const statusTxt = (time) => {
  let date = new Date();

  let txt = "未开播";
  if (time >= date / 1) {
    // 开课时间大于现在  未开播
    txt = "未开播";
  } else if (time < date / 1 && time / 1 + 1000 * 60 * 60 * 2 >= date) {
    // 开课时间 小于 现在     开课时间 + 2小时 大于 现在
    txt = "直播中";
  } else {
    txt = "已结束";
  }

  return txt;
};

const openReviseLive = (row) => {
  liveObj.value = row; // 里面有内_id;
  // 外层id
  liveObj.value.id = liveList.value._id;
  reviseLiveRef.value.open();
};
onActivated(getLiveListFn);
</script>

<style lang="scss" scoped>
:deep(.el-date-editor) {
  vertical-align: -2px;
  width: 30% !important;
}
</style>
