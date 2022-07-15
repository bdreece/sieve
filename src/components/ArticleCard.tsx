import Image from 'next/image';
import Article from 'scripts/article.server';

export interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure>
        <Image src={article.urlToImage} alt="Article Image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{article.title}</h2>
        <p>{article.source.name}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">View Summary</button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
