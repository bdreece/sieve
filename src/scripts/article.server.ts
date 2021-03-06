/* sieve - Sifting through the news with NLP models
 * Copyright (C) 2022 Brian Reece
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import axios, {AxiosRequestConfig} from 'axios';
import {Readability} from '@mozilla/readability';
import {JSDOM} from 'jsdom';

import {NEWS_API_HOST, NEWS_API_KEY} from './env.server';
import {Emotion} from './emotion.server';
import {Sentiment} from './sentiment.server';
import escapeString from './json';

export interface Article {
    source: {
        id: string | null;
        name: string;
    };
    title: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    sentiment: Sentiment | null;
    summary: string | null;
    emotion: Emotion | null;
}

export const getArticles = async (): Promise<Article[]> => {
    const options: AxiosRequestConfig = {
        url: `${NEWS_API_HOST}/everything?language=en&sources=reuters,bbc-news,the-washington-post,the-verge,usa-today,financial-times`,
        method: 'GET',
        headers: {
            'X-Api-Key': NEWS_API_KEY,
        },
    };

    const response = await axios.request(options);
    const {articles} = response.data;
    return articles as Article[];
};

export const getArticleContent = async (
    url: string
): Promise<string | undefined> => {
    const response = await axios.get(url);
    const dom = new JSDOM(response.data, {url});
    const article = new Readability(dom.window.document).parse();
    return escapeString(article?.textContent ?? '');
};
