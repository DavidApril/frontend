import axios from 'axios';
import { AUTH_TOKENS_KEY } from '../context';
import Cookies from 'js-cookie';

const inlazeAPI = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_PREFIX}`,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
});

inlazeAPI.interceptors.request.use((config) => {
  const token = Cookies.get(AUTH_TOKENS_KEY);
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export { inlazeAPI };
