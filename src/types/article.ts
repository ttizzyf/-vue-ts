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
