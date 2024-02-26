import request from "utils/request.ts";
import { responseData, reqPage } from "@/types/index.ts";
// 获取文章列表
export const getArticleList = (params: reqPage) => {
  return request.get<responseData>("/w1/blog/blog_article/list", params);
};
// 获取首页评论列表
export const getCommentsList = (params: reqPage) => {
  return request.get<responseData>("/w1/blog/blog_comment/list", params);
};
// 获取留言列表
export const getMessageList = (params: reqPage) => {
  return request.get<responseData>("/w1/blog/blog_comment/Messagelist", params);
};
