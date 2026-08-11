import Sqids from 'sqids';
import { createClient, type Client } from '@libsql/client';
import { env } from '$env/dynamic/private';

let db: Client | undefined;

export function getDb(): Client {
  if (!db) {
    if (!env.DB_URL) {
      throw new Error('DB_URL is not configured');
    }

    db = createClient({
      url: env.DB_URL,
      ...(env.DB_KEY ? { authToken: env.DB_KEY } : {})
    });
  }

  return db;
}

export const sqids = new Sqids();