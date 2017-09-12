/**
 * Created by jiayi on 2017/9/9.
 */
/**
 * 用户
 */
export class InterfaceUser {
  createdAt?: Date;   // 创建时间
  updatedAt?: Date;   // 更新时间
}


export class User {
  constructor(private nickname: string,
              private avatar: string,
              private slug: string,
              private author: string,
              private intro: string,
              private gender: number,
              private article_count: number,
              private total_wordage: number,
              private followers_count: number,
              private total_likes_count: number,
              private following_count: number) {
  }
}
