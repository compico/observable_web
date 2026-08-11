import Sqids from 'sqids';
import { createClient } from '@libsql/client';
import { env } from '$env/dynamic/private';

export const db = createClient({
  url: env.DB_URL ?? 'file:/data/observable.db',
  ...(env.DB_KEY ? { authToken: env.DB_KEY } : {})
});

export const sqids = new Sqids();
