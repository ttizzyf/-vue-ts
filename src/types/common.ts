// 用户访问记录
export interface visitor {
  type: number;
  nickname: string;
}

// 创建友链
export interface friendLink {
  email: string;
  linkName: string;
  link: string;
  describe: string;
}

// 友链参数
export interface friendLinkItem {
  id: string;
  linkName: string;
  link: string;
  describe: string;
  isShow: number;
  status: number;
  createdAt: string;
}
