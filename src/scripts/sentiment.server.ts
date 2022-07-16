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
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { BACKEND_API_HOST } from './env.server';

export type Sentiment = 'positive' | 'neutral' | 'negative';

const getSentiment = async (
  content: string
): Promise<Sentiment | undefined> => {
  const options: AxiosRequestConfig = {
    url: `${BACKEND_API_HOST}/sentiment`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      content,
    },
  };

  try {
    const response = await axios.request(options);
    return response.status == 200 ? response.data.sentiment : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export default getSentiment;
