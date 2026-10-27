import type { APIRoute } from 'astro';
import { isAuthorized, isCount, isId, json, readJson } from '@lib/reservation';

// Google フォームの送信1件ぶんの人数を、該当する枠の予約数に足す（Apps Script の onFormSubmit から呼ぶ）
// POST /api/reserve  { eventId, slotId, count }
export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  if (!isAuthorized(request)) {
    return json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = await readJson(request);
  if (!body || !isId(body.eventId) || !isId(body.slotId) || !isCount(body.count, 1)) {
    return json({ error: 'invalid body' }, { status: 400 });
  }

  // 1文で足すので、同時に送信されても数がずれない
  const result = await locals.runtime.env.DB.prepare(
    'UPDATE slots SET reserved = reserved + ?, updated_at = ? WHERE event_id = ? AND id = ?',
  )
    .bind(body.count, new Date().toISOString(), body.eventId, body.slotId)
    .run();
  if (result.meta.changes === 0) {
    return json({ error: 'slot not found' }, { status: 404 });
  }

  return json({ ok: true });
};
