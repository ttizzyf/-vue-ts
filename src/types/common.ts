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

interface theme {
  main: string;
  primary: string;
  seconed: string;
}

export interface webSettingType {
  footerFiling: {
    auther: string;
    authorizationUrl: string;
    number: string;
  };
  selfIntroduce: {
    projectNum: string;
    selfSkill: string;
    time: string;
    webSkill: string;
  };
  theme: Array<theme>;
  webInfo: {
    aboutMe: string;
    aboutWxUrl: string;
    webConnect: string;
    webIntroduce: string;
    homeSaying: string;
    webName: string;
    webVersion: string;
  };
}
