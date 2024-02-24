import { GenerateThemeColor } from "./userInfo";

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
