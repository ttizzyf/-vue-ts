import request from "utils/request.ts";
import { responseData, reqPage } from "@/types/index.ts";

export const getArticleList = (params: reqPage) => {
  return request.get<responseData>("/w1/blog/blog_article/list", params);
};
