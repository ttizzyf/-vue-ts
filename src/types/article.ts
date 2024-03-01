import { reqPage } from "./index";
export interface articleList {
  params: {
    pageSize: number;
    pageNum: number;
    category: string | number;
    title: string;
  };
  searchData: string;
  total: number;
}

export interface commentParams extends reqPage {
  relatedArticleId: string;
}

export interface createCommentType {
  messagePid?: string;
  toUserId?: string;
  isSendEmail?: number;
  relatedArticleId: string;
  content: string;
}

// 文章点赞或者反对
export interface articleLikeType {
  id: string;
  likeOrOppose: string;
}
