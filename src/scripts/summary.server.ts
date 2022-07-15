import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { BACKEND_API_HOST } from './env.server';

const getSummary = async (content: string): Promise<string | undefined> => {
  const options: AxiosRequestConfig = {
    url: `${BACKEND_API_HOST}/summary`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      content,
    },
  };

  const response = await axios.request(options);
  return response.status == 200 ? response.data.summary : undefined;
};

export default getSummary;
