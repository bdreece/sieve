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
import { Article } from 'scripts/article.server';
import ArticleModal from './ArticleModal';

export interface ArticleCardProps {
  article: Article;
  index: string;
}

const formatDate = (date: Date) => {
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

const ArticleCard = ({ article, index }: ArticleCardProps) => {
  return (
    <div className="card bg-base-100 max-w-xs shadow-xl">
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.urlToImage}
          alt="Article Image"
          width="400"
          height="300"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title display">{article.title}</h2>
        <ul className="list-none">
          <li>{article.source.name}</li>
          {article.sentiment ? <li>Sentiment {article.sentiment}</li> : null}
          {article.emotion ? <li>Emotion: {article.emotion}</li> : null}
        </ul>
        <div className="flex-1" />
        <div className="card-actions justify-end">
          <ArticleModal index={index} article={article} />
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
