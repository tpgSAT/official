import { RESERVATION_API_SECRET } from 'astro:env/server';

// 空き状況の API（src/pages/api/）で使う共通処理

export const json = (body: unknown, init: ResponseInit = {}) => {
  const headers = new Headers(init.headers);
  headers.set('Content-Type', 'application/json; charset=utf-8');
  return new Response(JSON.stringify(body), { ...init, headers });
};

// Apps Script からのリクエストか確かめる（Authorization: Bearer <RESERVATION_API_SECRET>）
// secret が未設定のときは常に拒否する
export const isAuthorized = (request: Request) =>
  !!RESERVATION_API_SECRET &&
  request.headers.get('Authorization') === `Bearer ${RESERVATION_API_SECRET}`;

// JSON のオブジェクトとして読めなければ null を返す
export const readJson = async (request: Request): Promise<Record<string, unknown> | null> => {
  try {
    const body: unknown = await request.json();
    return body && typeof body === 'object' && !Array.isArray(body)
      ? (body as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
};

// イベントID・枠ID
export const isId = (value: unknown): value is string =>
  typeof value === 'string' && value.length > 0 && value.length <= 100;

// 人数（min 以上の整数）
export const isCount = (value: unknown, min: number): value is number =>
  Number.isSafeInteger(value) && (value as number) >= min;
