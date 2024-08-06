<template>
  <div class="">
    <el-card>
      <h4>课程管理</h4>
    </el-card>
    <el-card class="table">
      <div class="filter-section">
        <el-select
          v-model="queryParams.kindName"
          clearable
          class="filter"
          placeholder="请选择项目"
          @change="getCourseListFn"
        >
          <el-option
            v-for="item in kindNameOptions"
            :key="item"
            :value="item"
            :label="item"
          ></el-option>
        </el-select>

        <el-input
          v-model="queryParams.courseName"
          clearable
          placeholder="请输入课程名称"
          class="filter"
          @change="getCourseListFn"
        ></el-input>
      </div>
      <el-table
        :data="courseList"
        v-loading="loading"
        class="table-wrapper"
        :max-height="tableHeight"
      >
        <el-table-column
          width="200"
          prop="courseName"
          label="课程名称"
          fixed="left"
        ></el-table-column>
        <el-table-column
          width="200"
          prop="sellingPrice"
          label="售价"
        ></el-table-column>
        <el-table-column
          width="200"
          prop="downPrice"
          label="底价"
        ></el-table-column>
        <el-table-column
          width="200"
          prop="kindName"
          label="项目"
        ></el-table-column>
        <el-table-column width="200" label="是否售卖">
          <template #default="{ row }">
            <el-switch
              v-model="row.isSale"
              active-color="#13ce66"
              active-text="上架"
              disabled
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          prop="updatePeople"
          label="更新人"
        ></el-table-column>
        <el-table-column width="200" label="更新时间">
          <template #default="{ row }">
            {{ formatTime(row.updateTime) }}
          </template>
        </el-table-column>
        <el-table-column width="200" label="操作" fixed="right" align="center">
          <template #default="{ row }">
            <el-button size="small" @click="openEditCourse(row)"
              >编辑课程</el-button
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
        @size-change="getCourseListFn"
        @current-change="getCourseListFn"
        class="pagination"
      />
    </el-card>
    <EditCourse
      ref="editCourseRef"
      :course="course"
      @change="getCourseListFn"
    ></EditCourse>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getCourseList } from "@/api/course";
import { formatTime } from "@/utils/formatTime";
import { getAutoHeight } from "@/hooks/getAutoHeight";
import EditCourse from "./components/EditCourse.vue";

const queryParams = ref({
  pageSize: 10,
  currentPage: 1,
  kindName: "",
  courseName: "",
});

const kindNameOptions = ref([]);
const courseList = ref([]);
const total = ref(0);
const loading = ref(true);
const editCourseRef = ref(null);
const course = ref({});

const { tableHeight } = getAutoHeight(340);

const getCourseListFn = async () => {
  loading.value = true;
  const { data } = await getCourseList(queryParams.value);
  courseList.value = data.data;
  total.value = data.total;
  kindNameOptions.value = data.kindNameOptions;
  setTimeout(() => {
    loading.value = false;
  }, 500);
};
getCourseListFn();

const openEditCourse = (row) => {
  course.value = row;
  editCourseRef.value.open();
};
</script>

<style lang="scss" scoped></style>
