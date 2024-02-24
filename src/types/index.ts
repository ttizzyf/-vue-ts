export * from "./userInfo";
export * from "./common";
export * from "./article";

// 响应数据
export interface responseData<T = any> {
  status: number;
  message: string;
  time: number;
  data: T;
}

// 请求数量
export interface reqPage {
  pageSize: number;
  pageNum: number;
}
