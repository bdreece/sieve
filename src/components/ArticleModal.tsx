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

export interface ArticleModalProps {
  article: Article;
  index: string;
}

const ArticleModal = ({ article, index }: ArticleModalProps) => {
  return (
    <>
      <label htmlFor={index} className="btn modal-button">
        See More
      </label>

      <input type="checkbox" id={index} className="modal-toggle" />
      <label htmlFor={index} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg display">{article.title}</h3>
          <p className="py-4">{article.summary}</p>
          <div className="modal-action">
            <a className="btn btn-primary" href={article.url}>
              View Article
            </a>
            <label htmlFor={index} className="btn btn-secondary">
              Close
            </label>
          </div>
        </div>
      </label>
    </>
  );
};

export default ArticleModal;
