import request from "utils/request.ts";
import {
  responseData,
  commentParams,
  createCommentType,
  articleLikeType,
  reqPage,
} from "@/types/index.ts";

interface MessageListType extends reqPage {
  messageId?: string;
}

// 文件上传
export const getArticleDetails = (data: { id: string }) => {
  return request.post<responseData>("/w1/blog/blog_article/details", data);
};

// 浏览记录
export const viewAriticle = (params: { id: string }) => {
  return request.get<responseData>("/w1/blog/blog_article/viewArticle", params);
};

// 根据文章id获取评论
export const getCommentsListByArticleId = (params: commentParams) => {
  return request.get<responseData>(
    "/w1/blog/blog_article/Commentslist",
    params
  );
};

// 新建评论
export const createComment = (data: createCommentType) => {
  return request.post<responseData>("/w1/blog/blog_comment/create", data);
};

// 文章评论点赞或反对
export const updateBlogCommentLikeOrOppose = (data: articleLikeType) => {
  return request.post<responseData>("/w1/blog/blog_comment/likeOrOppose", data);
};

// 获取留言列表
export const getMessageList = (params: MessageListType) => {
  return request.get<responseData>("/w1/blog/blog_comment/Messagelist", params);
};

export const likeArticle = (data: { id: string }) => {
  return request.post<responseData>("/w1/blog/blog_article/like", data);
};
