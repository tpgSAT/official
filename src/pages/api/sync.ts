import type { APIRoute } from 'astro';
import { isAuthorized, isCount, isId, json, readJson } from '@lib/reservation';

// 回答シートを集計した予約数で、イベントの全枠を上書きする（Apps Script の定期実行から呼ぶ）
// キャンセル（回答シートの行の削除）や onFormSubmit の取りこぼしはここで補正される
// POST /api/sync  { eventId, slots: [{ id, reserved }] }
export const prerender = false;

type SlotCount = { id: string; reserved: number };

const isSlotCount = (value: unknown): value is SlotCount =>
  !!value &&
  typeof value === 'object' &&
  isId((value as SlotCount).id) &&
  isCount((value as SlotCount).reserved, 0);

export const POST: APIRoute = async ({ request, locals }) => {
  if (!isAuthorized(request)) {
    return json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = await readJson(request);
  if (!body || !isId(body.eventId) || !Array.isArray(body.slots) || !body.slots.every(isSlotCount)) {
    return json({ error: 'invalid body' }, { status: 400 });
  }
  const { eventId } = body;
  const slots: SlotCount[] = body.slots;

  const { DB } = locals.runtime.env;
  const now = new Date().toISOString();
  // batch は1つのトランザクションとして実行されるので、途中の状態（全枠0など）が見えることはない
  // 送られてこなかった枠は予約0として扱う
  const [reset, ...updates] = await DB.batch([
    DB.prepare('UPDATE slots SET reserved = 0, updated_at = ? WHERE event_id = ?').bind(now, eventId),
    ...slots.map(({ id, reserved }) =>
      DB.prepare('UPDATE slots SET reserved = ?, updated_at = ? WHERE event_id = ? AND id = ?').bind(
        reserved,
        now,
        eventId,
        id,
      ),
    ),
  ]);
  if (reset.meta.changes === 0) {
    return json({ error: 'event not found' }, { status: 404 });
  }

  // D1 に登録されていない枠ID（Apps Script の対応表の誤りなど）は、ログで気づけるように返す
  const unknownSlots = slots.filter((_, i) => updates[i].meta.changes === 0).map(({ id }) => id);
  return json({ ok: true, unknownSlots });
};
