<template>
  <div class="student-manage">
    <el-card><h4>学员管理</h4></el-card>
    <el-card class="table">
      <div class="filter-section">
        <el-select
          v-model="queryParams.kindName"
          class="filter"
          placeholder="请选择项目"
          clearable
          filterable
          @change="kindNameChanged"
        >
          <el-option
            v-for="item in courseObj.kindName"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          />
        </el-select>

        <el-select
          v-model="queryParams.courseName"
          class="filter"
          placeholder="请选择课程名称"
          clearable
          filterable
          @change="getStudentData"
        >
          <el-option
            v-for="item in courseName"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          />
        </el-select>

        <el-input
          v-model="queryParams.className"
          class="filter"
          clearable
          placeholder="请输入班期名称"
          @change="getStudentData"
        ></el-input>
      </div>
      <el-table
        :data="studentList"
        v-loading="loading"
        :max-height="tableHeight"
      >
        <el-table-column prop="phoneNumber" label="手机号码" width="200" />
        <el-table-column prop="courseName" label="课程名称" width="200" />
        <el-table-column prop="className" label="班期名称" width="200" />
        <el-table-column prop="origin" label="学员来源" width="200" />
        <el-table-column label="是否启用" width="200">
          <template #default="{ row }">
            <el-switch
              v-model="row.isEnable"
              active-color="#13ce66"
              active-text="启用"
              :before-change="isEnableChanged(row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="updatePeople" label="更新人" width="200" />
        <el-table-column label="更新时间" width="200">
          <template #default="{ row }">
            <span>{{ formatTime(row.updateTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300" fixed="right" align="center">
          <template #default="{ row }">
            <el-button size="small" @click="openDetail(row)"
              >学员详情</el-button
            >
            <el-button size="small" @click="openClass(row)">选择班期</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="queryParams.currentPage"
        v-model:page-size="queryParams.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="getStudentData"
        @current-change="getStudentData"
        class="pagination"
      />
    </el-card>
    <StudentDetail
      ref="studentDetailRef"
      :studentObj="studentObj"
      @change="getStudentData"
    ></StudentDetail>
    <StudentClass
      :studentClassObj="studentClassObj"
      ref="studentClassRef"
      @change="getStudentData"
    ></StudentClass>
  </div>
</template>

<script setup>
import { computed, onActivated, ref } from "vue";
import { getStudentList, getCourseObj, reviseIsEnable } from "@/api/student";
import { ElMessage } from "element-plus";
import { formatTime } from "@/utils/formatTime";
import { getAutoHeight } from "@/hooks/getAutoHeight";
import StudentDetail from "./components/StudentDetail.vue";
import StudentClass from "./components/StudentClass.vue";

const queryParams = ref({
  kindName: "", // 分类
  courseName: "",
  className: "",
  currentPage: 1,
  pageSize: 10,
});

const studentList = ref([]);
const total = ref(0);
const courseObj = ref({});
const loading = ref(true);
const studentDetailRef = ref(null);
const studentClassRef = ref(null);

const studentObj = ref({});
const studentClassObj = ref({});

const { tableHeight } = getAutoHeight(340);

const getStudentData = async () => {
  loading.value = true;
  const { data } = await getStudentList(queryParams.value);
  studentList.value = data.data;
  total.value = data.total;
  setTimeout(() => {
    loading.value = false;
  }, 500);
};
const getCourse = async () => {
  const { data } = await getCourseObj();
  courseObj.value = data;
};

getStudentData();
getCourse();

const courseName = computed(() => {
  const kindName = queryParams.value.kindName;
  const courseObjValue = courseObj.value;

  if (!kindName) {
    // 第一个未筛选时
    return courseObjValue.courseName;
  } else {
    return courseObjValue.kindName.find((item) => item.value === kindName)
      .courseName;
  }
});

const kindNameChanged = (value) => {
  if (value) {
    // 拿出 kindName数组中对应value(前端/后端)的数组项中的 courseName
    const courseName = courseObj.value.kindName.find(
      (item) => item.value === value
    ).courseName;

    // 判断第二个筛选框中的课程 是否属于第一个筛选框选中的 项目类别
    const obj = courseName.find(
      (item) => item.value === queryParams.value.courseName
    );

    if (!obj) {
      // 不匹配 要清空第二个筛选框
      queryParams.value.courseName = "";
    }
  }
  getStudentData();
};

const isEnableChanged = (row) => {
  return async () => {
    const { data } = await reviseIsEnable(row);
    if (!data.code) {
      ElMessage.success(data.txt);
      return true; // 允许按钮修改
    } else {
      ElMessage.error(data.txt);
      return false; // 不允许按钮修改
    }
  };
};

const openDetail = (row) => {
  studentObj.value = row;
  studentDetailRef.value.open();
};
const openClass = (row) => {
  const classOptions = courseName.value.find(
    (item) => item.value === row.courseName
  ).className;

  studentClassObj.value = {
    phoneNumber: row.phoneNumber,
    className: row.className,
    courseName: row.courseName,
    classOptions,
  };

  studentClassRef.value.open();
};
onActivated(getStudentData);
</script>

<style lang="scss" scoped></style>
