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

interface HomeProps {
  articles: Article[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const articles = await Promise.all(
    (
      await getArticles()
    ).map(async article => {
      const content = (await getArticleContent(article.url)) ?? '';
      article.sentiment = await getSentiment(content);
      article.emotion = await getEmotion(content);
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
    <>
      <Head>
        <title>Sieve</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="flex justify-center">
        <FilterMenu />
        <SortMenu />
      </div>
      <div className="flex flex-wrap">
        {articles.map((article, i) => (
          <div key={i} className="flex-none">
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Home;
