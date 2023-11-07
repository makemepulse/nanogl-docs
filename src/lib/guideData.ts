import { RouteRecordNormalized } from "vue-router";

export type GuideArticle = {
  route: RouteRecordNormalized;
  name: string;
}

export type GuideSection = {
  name: string;
  slug: string;
  articles: GuideArticle[];
}