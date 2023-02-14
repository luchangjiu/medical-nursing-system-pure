<script setup lang="ts">
import { ref, toRaw, watch } from "vue";
import { message } from "@/utils/message";
import { FormInstance } from "element-plus";
import { addDept, updDept } from "@/api/dept";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => {
      return {};
    }
  },
  treeSelectList: {
    type: Array<any>,
    default: () => {
      return [];
    }
  },
  reload: {
    type: Function
  }
});

const ruleFormRef = ref<FormInstance>();
const formVisible = ref(false);
const formData = ref(props.data);
const title = ref("新增部门");

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async valid => {
    if (valid) {
      const result = await saveDept(toRaw(formData.value));
      if (result.success) {
        message(result.message, {
          type: "success",
          onClose: () => props.reload()
        });
      } else {
        message(result.message, { type: "error" });
      }
      formVisible.value = false;
      resetForm(formEl);
    }
  });
};

function saveDept(value) {
  if (formData.value.deptId) {
    return updDept(value);
  } else {
    return addDept(value);
  }
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const closeDialog = () => {
  formVisible.value = false;
  resetForm(ruleFormRef.value);
};

const emit = defineEmits(["update:visible", "reload"]);
watch(
  () => formVisible.value,
  val => {
    emit("update:visible", val);
  }
);

watch(
  () => props.visible,
  val => {
    formVisible.value = val;
    if (val) {
      if (formData.value.deptId) {
        title.value = "编辑部门";
      } else {
        title.value = "新增部门";
      }
    }
  }
);

watch(
  () => props.data,
  val => {
    formData.value = val;
  }
);

const rules = {
  deptName: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
  deptCode: [{ required: true, message: "请输入部门代码", trigger: "blur" }]
};
</script>

<template>
  <el-dialog
    v-model="formVisible"
    :title="title"
    :width="680"
    draggable
    :before-close="closeDialog"
  >
    <input type="hidden" v-model="formData.createUser" />
    <!-- 表单内容 -->
    <el-form
      ref="ruleFormRef"
      :model="formData"
      :rules="rules"
      label-width="100px"
    >
      <input v-model="formData.createUesr" :style="{ display: 'none' }" />
      <el-form-item label="部门名称" prop="deptName">
        <el-input
          v-model="formData.deptName"
          :style="{ width: '480px' }"
          placeholder="请输入部门名称"
        />
      </el-form-item>
      <el-form-item label="部门代码" prop="deptCode">
        <el-input
          v-model="formData.deptCode"
          :style="{ width: '480px' }"
          placeholder="请输入部门名称"
        />
      </el-form-item>
      <el-form-item label="排序值" prop="orderNo">
        <el-input v-model="formData.orderNo" :style="{ width: '480px' }" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.state">
          <el-radio :label="0">已停用</el-radio>
          <el-radio :label="1">已启用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上级部门" prop="parentDept">
        <el-tree-select
          v-model="formData.parentDeptId"
          :data="props.treeSelectList"
          check-strictly
          :render-after-expand="false"
          clearable
          :style="{ width: '480px' }"
        />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="formData.remark"
          type="textarea"
          :style="{ width: '480px' }"
          placeholder="请输入内容"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped></style>
