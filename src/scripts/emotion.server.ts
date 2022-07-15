import axios, { AxiosRequestConfig } from 'axios';
import { BACKEND_API_HOST } from './env.server';

export type Emotion =
  | 'sadness'
  | 'joy'
  | 'love'
  | 'anger'
  | 'fear'
  | 'surprise';

const getEmotion = async (content: string): Promise<Emotion | undefined> => {
  const options: AxiosRequestConfig = {
    url: `${BACKEND_API_HOST}/emotion`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      content,
    },
  };

  const response = await axios.request(options);
  return response.status == 200 ? response.data.emotion : undefined;
};

export default getEmotion;
