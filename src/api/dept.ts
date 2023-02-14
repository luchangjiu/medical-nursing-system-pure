import { http, Result } from "@/utils/http";

type TableResult<T = any> = {
  list: Array<T>;
  total: number;
};

export type Dept = {
  deptId?: string;
  deptName?: string;
  deptCode?: string;
  parentDeptId?: string;
  orderNo?: number;
  state?: number;
  createUser?: string;
  updateUser?: string;
  updateTime?: Date;
};

export function getDeptList(params) {
  return http.request<Result<TableResult<Dept>>>("get", "/api/dept/list", {
    data: params
  });
}

export function addDept(dept) {
  return http.request<Result>("post", "/api/dept/add", { data: dept });
}

export function updDept(dept) {
  return http.request<Result>("post", "/api/dept/upd", { data: dept });
}

export function delDept(id: string) {
  return http.request<Result>("delete", "/api/dept/del/" + id);
}
