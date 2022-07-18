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
import type { GetStaticProps, NextPage } from 'next';
import {
  Article,
  getArticleContent,
  getArticles,
} from 'scripts/article.server';

import Head from 'next/head';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import FilterMenu from 'components/FilterMenu';
import SortMenu from 'components/SortMenu';
import ArticleCard from 'components/ArticleCard';
import getSentiment from 'scripts/sentiment.server';
import getEmotion from 'scripts/emotion.server';
import getSummary from 'scripts/summary.server';

interface HomeProps {
  articles: Article[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const articles = await Promise.all(
    (
      await getArticles()
    ).filter(async article => {
      try {
        const content = (await getArticleContent(article.url)) ?? '';
        article.summary = await getSummary(content);
        console.debug({ summary: article.summary });
        article.sentiment = await getSentiment(content);
        article.emotion = await getEmotion(content);
      } catch (e) {
        console.error('zoinks');
      }
      return article;
    })
  );
  return {
    props: {
      articles,
    },
    revalidate: 3600,
  };
};

const Home: NextPage<HomeProps> = ({ articles }: HomeProps) => {
  return (
    <div className="bg-base-200">
      <Head>
        <title>Sieve</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="sticky top-0 z-50">
        <Navbar />
        <div className="flex py-4 mb-4 shadow-md bg-base-200 justify-center">
          <FilterMenu />
          <SortMenu />
        </div>
      </div>
      <div className="flex flex-wrap gap-x-1 gap-y-5 mx-4 ">
        {articles.map((article, i) => (
          <div key={i} className="flex-auto self-stretch flex justify-center">
            <ArticleCard index={i.toString()} article={article} />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
