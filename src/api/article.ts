import request from "utils/request.ts";
import { responseData } from "@/types/index.ts";

// 文件上传
export const getArticleDetails = (data: { id: string }) => {
  return request.post<responseData>("/w1/blog/blog_article/details", data);
};

// 浏览记录
export const viewAriticle = (params: { id: string }) => {
  return request.get<responseData>("/w1/blog/blog_article/viewArticle", params);
};
