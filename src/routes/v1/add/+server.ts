import { sqids, getDb } from '$lib';
import { text } from '@sveltejs/kit';

const MAX_BODY_SIZE = 20 * 1024 * 1024;

export async function POST({ request }) {
  const contentLength = request.headers.get('content-length');

  if (contentLength && Number(contentLength) > MAX_BODY_SIZE) {
    return new Response('Request body too large', { status: 413 });
  }

  const data = await request.arrayBuffer();

  if (data.byteLength > MAX_BODY_SIZE) {
    return new Response('Request body too large', { status: 413 });
  }

  const db = getDb();
  const {
    rows: [row]
  } = await db.execute({
    sql: 'INSERT INTO profiles (contents) VALUES (?) RETURNING id',
    args: [data]
  });

  const hash = sqids.encode([row.id as number]);

  return text(`https://${request.headers.get('host')}/p/${hash}`);
}
