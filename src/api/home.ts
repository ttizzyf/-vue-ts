import request from "utils/request.ts";
import { responseData, reqPage } from "@/types/index.ts";

interface artileListType extends reqPage {
  status?: 1;
  recommended?: 0 | 1;
  category?: string | number;
  title?: string;
}

// 获取文章列表
export const getArticleList = (params: artileListType) => {
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
