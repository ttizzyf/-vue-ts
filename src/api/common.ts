import request from "utils/request.ts";
import {
  visitor,
  responseData,
  friendLink,
  webSettingType,
} from "@/types/index.ts";
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

// 创建友链
export const createFriendLink = (data: friendLink) => {
  return request.post<responseData>("/w1/sys/friend/create", data);
};

// 前台获取友链
export const getAdminFriendList = () => {
  return request.get<responseData>("/w1/sys/friend/adminList");
};

// 获取网站设置
export const getWebSetting = () => {
  return request.get<responseData<webSettingType>>("/w1/common/webSetting");
};
