import request from "utils/request.ts";
import {} from "@/types/userInfo";

export const uploadFile = (data: any) => {
  return request.post("/w1/common/upload", data);
};
