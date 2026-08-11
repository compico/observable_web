import Sqids from 'sqids';
import { createClient } from '@libsql/client';
import { env } from '$env/dynamic/private';

if (!env.DB_URL) {
  throw new Error('DB_URL is not configured');
}

export const db = createClient({
  url: env.DB_URL,
  ...(env.DB_KEY ? { authToken: env.DB_KEY } : {})
});

export const sqids = new Sqids();
