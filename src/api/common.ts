import request from "utils/request.ts";
import { visitor } from "@/types/common.ts";
// 文件上传
export const uploadFile = (data: any) => {
  return request.post("/w1/common/upload", data);
};

// 记录访客
export const visitorRecord = (data: visitor) => {
  return request.post("/w1/sys/visitor/record", data);
};
