<template>
  <div class="select-class">
    <el-dialog v-model="dialogVisible">
      <template #header>
        <h2>选择班期</h2>
      </template>
      <el-table :data="[studentClassObj]">
        <el-table-column prop="courseName" label="课程名称"></el-table-column>
        <el-table-column label="班期名称">
          <template #default>
            <el-select v-model="className">
              <el-option
                v-for="item in studentClassObj.classOptions"
                :key="item"
                :value="item"
                :label="item"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>

      <template #footer>
        <el-button @click="close">取消</el-button>
        <el-button @click="reviseStudentClassFn">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, defineExpose, defineProps, nextTick, defineEmits } from "vue";
import { reviseStudentClass } from "@/api/student";
import { ElMessage } from "element-plus";

const props = defineProps(["studentClassObj"]);
const emit = defineEmits(["change"]);

const className = ref(null);

const initClassName = () => {
  className.value = props.studentClassObj.className;
};

const dialogVisible = ref(false);

const open = () => {
  dialogVisible.value = true;

  nextTick(initClassName);
};

const close = () => {
  dialogVisible.value = false;
};

const reviseStudentClassFn = async () => {
  const { data } = await reviseStudentClass({
    phoneNumber: props.studentClassObj.phoneNumber,
    className: className.value,
  });
  ElMessage.success(data.txt);

  emit("change");
  close();
};

defineExpose({
  open,
});
</script>
<style lang="scss" scoped></style>
