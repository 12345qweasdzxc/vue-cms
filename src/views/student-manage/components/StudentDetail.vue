<template>
  <div class="student-detail">
    <el-drawer v-model="isDrawer" size="50%" :before-close="close">
      <template #header>
        <h4>学员详情</h4>
      </template>
      <div class="content-title">
        学员信息
        <span v-if="!isEdit" @click="toEditPage">编辑</span>
        <template v-else>
          <span @click="submitEdit">保存</span>
          <span @click="cancelEdit">取消</span>
        </template>
      </div>
      <div class="content">
        <div v-if="!isEdit">
          <el-row>
            <el-col :span="7">
              <span class="property">手机号 :</span>
              <span class="value">{{ studentInfo.phoneNumber }}</span>
            </el-col>
            <el-col :span="7">
              <span class="property">姓名 :</span>
              <span class="value">{{ studentInfo.name || "--" }}</span></el-col
            >
            <el-col :span="8">
              <span class="property">QQ :</span>
              <span class="value">{{ studentInfo.QQ || "--" }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7">
              <span class="property">微信 :</span>
              <span class="value">{{ studentInfo.wechat || "--" }}</span>
            </el-col>
            <el-col :span="7">
              <span class="property">身份证 :</span>
              <span class="value">{{ studentInfo.card || "--" }}</span></el-col
            >
            <el-col :span="8">
              <span class="property">年龄 :</span>
              <span class="value">{{ studentInfo.age || "--" }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7">
              <span class="property">性别 :</span>
              <span class="value">{{ studentInfo.sex || "--" }}</span>
            </el-col>
            <el-col :span="7">
              <span class="property">地域 :</span>
              <span class="value">{{
                studentInfo.location || "--"
              }}</span></el-col
            >
            <el-col :span="8">
              <span class="property">原学历层次 :</span>
              <span class="value">{{ studentInfo.education || "--" }}</span>
            </el-col>
          </el-row>
        </div>
        <el-form
          v-else
          class="edit-page"
          :model="editQuery"
          :rules="rules"
          ref="formRef"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="手机号">
                <el-input
                  v-model="editQuery.phoneNumber"
                  size="small"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="姓名" prop="name">
                <el-input
                  v-model="editQuery.name"
                  size="small"
                  placeholder="请输入姓名"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="QQ">
                <el-input
                  v-model="editQuery.QQ"
                  size="small"
                  placeholder="请输入QQ"
                ></el-input> </el-form-item
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="微信号">
                <el-input
                  v-model="editQuery.wechat"
                  size="small"
                  placeholder="请输入微信号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号">
                <el-input
                  v-model="editQuery.card"
                  size="small"
                  placeholder="请输入身份证号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="年龄">
                <el-input
                  v-model="editQuery.age"
                  size="small"
                  placeholder="请输入年龄"
                ></el-input> </el-form-item
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="性别">
                <el-radio-group v-model="editQuery.sex">
                  <el-radio label="">未知</el-radio>
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号">
                <el-cascader
                  v-model="editQuery.location"
                  :options="options"
                  placeholder="请输入所在城市"
                  size="small"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="学历层次">
                <el-select v-model="editQuery.education" size="small">
                  <el-option
                    v-for="item in educationOptions"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select> </el-form-item
            ></el-col>
          </el-row>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>
<script setup>
import { ref, defineExpose, defineProps, computed, defineEmits } from "vue";
import options from "@/assets/js/city";
import { quitFn } from "@/hooks/quitFn";
import { reviseStudent } from "@/api/student";
import { ElMessage } from "element-plus";

const props = defineProps(["studentObj"]);
const emit = defineEmits(["change"]);

const isDrawer = ref(false);
// 是否在编辑界面
const isEdit = ref(false);

const studentInfo = computed(() => props.studentObj && props.studentObj.info);
const editQueryRaw = {
  QQ: "",
  age: "",
  card: "",
  education: "",
  location: "",
  name: "",
  phoneNumber: "",
  sex: "",
  wechat: "",
};

const editQuery = ref(editQueryRaw);

const educationOptions = [
  { value: "无文凭", label: "无文凭" },
  { value: "小学", label: "小学" },
  { value: "初中", label: "初中" },
  { value: "高中/中专", label: "高中/中专" },
  { value: "大专", label: "大专" },
  { value: "本科", label: "本科" },
  { value: "硕士", label: "硕士" },
  { value: "博士", label: "博士" },
];
const formRef = ref(null);
const rules = {
  name: [{ required: true, message: "姓名是必填项", trigger: "blur" }],
};
const open = () => {
  isDrawer.value = true;
};

const close = () => {
  if (isEdit.value) {
    // 在编辑界面
    quitFn({}, () => {
      isDrawer.value = false;
      isEdit.value = false;
    });
  } else {
    // 不在编辑界面
    isDrawer.value = false;
  }
};

const toEditPage = () => {
  initEdit();
  isEdit.value = true;
};

// 初始化 editQuery
const initEdit = () => {
  const editQueryValue = editQuery.value;
  const studentInfoValue = studentInfo.value;

  for (const key in editQueryValue) {
    if (studentInfoValue.location) {
      // 湖南省/长沙市 => [湖南省,长沙市]
      editQueryValue.location = studentInfoValue.location.split("/");
    } else {
      editQueryValue[key] = studentInfoValue[key];
    }
  }
};

const cancelEdit = () => {
  quitFn({}, () => {
    // 点击确定之后 执行的回调函数
    isEdit.value = false;
  });
};
const submitEdit = () => {
  formRef.value.validate(async (value, err) => {
    if (value) {
      // 校验通过
      const { data } = await reviseStudent(editQuery.value);
      ElMessage.success(data.txt);

      isEdit.value = false;
      close();

      // 告诉父组件 重新获取数据
      emit("change");
    } else {
      ElMessage.error(err.name[0].message);
    }
  });
};

defineExpose({
  open,
  close,
});
</script>

<script></script>
<style lang="scss" scoped>
.content-title {
  font-size: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  padding-left: 30px;
  span {
    color: #5281ba;
    cursor: pointer;
    margin-left: 10px;
  }
}
.content {
  margin-top: 10px;
  line-height: 50px;
  font-size: 14px;
  padding-left: 30px;
  .property {
    color: #999;
    margin-right: 5px;
  }
  .value {
    color: #666;
  }
  .edit-page {
    margin-top: 10px;
    :deep(.el-row) {
      text-align: right !important;
      .el-form-item__label {
        width: 70px;
      }
      .el-form-item {
        margin-top: 20px;
      }
      .el-radio {
        margin-right: 5px;
      }
      .el-input {
        width: 150px;
      }
    }
  }
}
</style>
