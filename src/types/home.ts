import { GenerateThemeColor } from "./userInfo";
// 文章参数
export interface articleItem {
  category: number;
  cover: string;
  createdAt: string;
  isReship: number;
  likeNum: number;
  recommended: number;
  status: number;
  viewNum: number;
  title: string;
  userInfo: GenerateThemeColor;
  id: string;
  abstract: string;
  messageNum: number;
}
// 评论参数
export interface commentItem {
  content: string;
  createdAt: string;
  hidden: number;
  likeNum: number;
  messageId: string;
  opposeNum: number;
  messagePid: string | null;
  replyInfo: Array<commentItem>;
  toUserId: GenerateThemeColor | null;
  userInfo: GenerateThemeColor;
  userId: string;
  articleInfo: {
    id: string;
    title: string;
  };
}
