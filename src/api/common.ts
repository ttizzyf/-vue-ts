import request from "utils/request.ts";
import { visitor, responseData } from "@/types/index.ts";
// 文件上传
export const uploadFile = (data: any) => {
  return request.post<responseData>("/w1/common/upload", data);
};

// 记录访客
export const visitorRecord = (data: visitor) => {
  return request.post<responseData>("/w1/sys/visitor/record", data);
};

// 私信作者
export const privateLetter = (data: { email: string; content: string }) => {
  return request.post<responseData>("/w1/sys/letter/create", data);
};
