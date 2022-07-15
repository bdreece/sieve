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

  const response = await axios.request(options);
  return response.status == 200 ? response.data.sentiment : undefined;
};

export default getSentiment;
