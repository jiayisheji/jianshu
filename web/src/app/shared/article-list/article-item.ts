export interface ArticleItem {
  slug: string;
  title: string;
  abstract: string;
  images?: string;
  author: {
    slug: string;
    nickname: string;
    avatar: string;
  };
  meta: {
    read: number;
    comments: number;
    like: number;
  }
}
