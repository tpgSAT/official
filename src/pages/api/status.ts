import type { APIRoute } from 'astro';
import { isId, json } from '@lib/reservation';

// イベントの枠ごとの空き状況を返す。○△× への変換は表示側（SlotAvailability.astro）で行う
// GET /api/status?event=<eventId>
export const prerender = false;

type Row = {
  id: string;
  label: string;
  capacity: number;
  reserved: number;
  updated_at: string;
};

export const GET: APIRoute = async ({ url, locals }) => {
  const eventId = url.searchParams.get('event');
  if (!isId(eventId)) {
    return json({ error: 'event is required' }, { status: 400 });
  }

  const { results } = await locals.runtime.env.DB.prepare(
    'SELECT id, label, capacity, reserved, updated_at FROM slots WHERE event_id = ? ORDER BY sort_order, id',
  )
    .bind(eventId)
    .all<Row>();
  if (results.length === 0) {
    return json({ error: 'event not found' }, { status: 404 });
  }

  // updated_at は ISO 8601 の文字列なので、文字列の比較で一番新しいものを選べる
  const updatedAt = results.reduce((latest, row) => (row.updated_at > latest ? row.updated_at : latest), '');
  const slots = results.map(({ id, label, capacity, reserved }) => ({ id, label, capacity, reserved }));

  return json({ updatedAt, slots }, { headers: { 'Cache-Control': 'public, max-age=5' } });
};
