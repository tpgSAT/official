-- 予約枠ごとの空き状況。予約の正本は Google フォームの回答シートで、ここには集計値だけを持つ
CREATE TABLE slots (
  event_id   TEXT NOT NULL,              -- イベントID（例: "koudaisai-2026"）
  id         TEXT NOT NULL,              -- 枠ID（Apps Script の対応表と一致させる）
  label      TEXT NOT NULL,              -- 表示名（例: "14:00-15:00"）
  capacity   INTEGER NOT NULL,           -- 定員
  reserved   INTEGER NOT NULL DEFAULT 0, -- 予約済みの人数
  sort_order INTEGER NOT NULL DEFAULT 0, -- 表示順
  updated_at TEXT NOT NULL,
  PRIMARY KEY (event_id, id)
);
