import dayjs from "dayjs";
import { handleTreeSelect, handleTree } from "@/utils/tree";
import { reactive, ref, onMounted, toRaw } from "vue";
import { getDeptList, delDept, Dept } from "@/api/dept";
import { message } from "@/utils/message";

export function useDept() {
  const form = reactive({
    deptName: "",
    user: "",
    state: ""
  });
  const rowItem = ref({
    deptId: null
  } as Dept);
  const dataList = ref([]);
  const loading = ref(true);
  const treeSelectList = ref([]);
  const isShowEditForm = ref(false);

  const columns: TableColumnList = [
    {
      type: "selection",
      width: 55,
      align: "left",
      hide: ({ checkList }) => !checkList.includes("勾选列")
    },
    {
      label: "序号",
      type: "index",
      minWidth: 70,
      hide: ({ checkList }) => !checkList.includes("序号列")
    },
    {
      label: "部门名称",
      prop: "deptName",
      width: 180,
      align: "left"
    },
    {
      label: "排序",
      prop: "orderNo",
      minWidth: 70
    },
    {
      label: "状态",
      prop: "state",
      minWidth: 100,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={row.state === 0 ? "danger" : "success"}
          effect="plain"
        >
          {row.state === 0 ? "已停用" : "已启用"}
        </el-tag>
      )
    },
    {
      label: "创建时间",
      minWidth: 200,
      prop: "createTime",
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "备注",
      prop: "remark",
      minWidth: 200
    },
    {
      label: "操作",
      fixed: "right",
      width: 160,
      slot: "operation"
    }
  ];

  function handleUpdate(row) {
    rowItem.value = toRaw(row);
    console.log(rowItem);
    isShowEditForm.value = true;
  }

  async function confirmDelete() {
    console.log(rowItem);
    if (rowItem.value.deptId) {
      const res = await delDept(rowItem.value.deptId);
      if (res.success) {
        message(res.message, {
          type: "success",
          onClose: () => {
            onSearch();
          }
        });
      } else {
        message(res.message, { type: "warning" });
      }
    }
  }

  function handleDelete(row) {
    rowItem.value = row;
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  function resetForm(formEl) {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getDeptList({});

    treeSelectList.value = handleTreeSelect(
      data.list,
      "deptId",
      "parentDeptId",
      "deptName"
    );

    dataList.value = handleTree(
      data.list,
      "deptId",
      "parentDeptId",
      "children"
    );
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  function showAddForm() {
    isShowEditForm.value = true;
    rowItem.value = {
      deptId: null,
      createUser: "joe",
      state: 1,
      parentDeptId: null,
      orderNo: 0
    };
  }

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    rowItem,
    isShowEditForm,
    loading,
    columns,
    dataList,
    treeSelectList,
    onSearch,
    resetForm,
    handleUpdate,
    handleDelete,
    handleSelectionChange,
    showAddForm,
    confirmDelete
  };
}
