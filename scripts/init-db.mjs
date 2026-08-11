import { createClient } from '@libsql/client';

const url = process.env.DB_URL;

if (!url) {
    throw new Error('DB_URL is not configured');
}

const client = createClient({
    url,
    ...(process.env.DB_KEY ? { authToken: process.env.DB_KEY } : {})
});

await client.execute(`
  CREATE TABLE IF NOT EXISTS profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    contents BLOB NOT NULL
  )
`);

console.log('Database initialized');

client.close();
