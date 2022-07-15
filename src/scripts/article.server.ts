import axios, { AxiosRequestConfig } from 'axios';
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';

import { NEWS_API_HOST, NEWS_API_KEY } from './env.server';
import { Emotion } from './emotion.server';
import { Sentiment } from './sentiment.server';

export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  sentiment?: Sentiment;
  emotion?: Emotion;
}

export const getArticles = async (): Promise<Article[]> => {
  const options: AxiosRequestConfig = {
    url: `${NEWS_API_HOST}/top-headlines?country=us&pageSize=100`,
    method: 'GET',
    headers: {
      'X-Api-Key': NEWS_API_KEY,
    },
  };

  const response = await axios.request(options);
  const { articles } = response.data;
  return articles as Article[];
};

export const getArticleContent = async (
  url: string
): Promise<string | undefined> => {
  const response = await axios.get(url);
  const dom = new JSDOM(response.data, { url });
  const article = new Readability(dom.window.document).parse();
  return article?.textContent;
};
