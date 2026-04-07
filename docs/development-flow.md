# 開発の流れ

## 基本の流れ

1. **作業用ブランチを作成**
   ```sh
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **変更を加えてコミット**
   ```sh
   git add .
   git commit -m "feat: 機能の説明"
   ```

3. **リモートにプッシュ**
   ```sh
   git push origin feature/your-feature-name
   ```

4. **プルリクエストを作成**
   - GitHubでPRを作成
   - ターゲットブランチ: `develop`
   - レビュー依頼: Slack `sys-連絡` チャンネルでレビューを依頼

5. **レビュー後にマージ**
   - レビューが承認されたら、`develop` ブランチにマージ

## 具体例1: イベントページを作成する場合

1. **素材を配置**
   - 画像などを `src/assets/events/<year>/<event-slug>/` に配置する

2. **イベントページを作成**
   - `src/pages/events/<year>/<event-slug>.astro` を作成する
   - 既存ページ（例: `src/pages/events/2025/freshman-meetup.astro`）を参考に、`Layout` と必要なコンポーネントを使って構成する

3. **一覧に追加**
   - `src/lib/events.ts` にサムネイル画像のimportを追加する
   - `events` 配列に新しいイベント情報（`title`, `titleEn`, `year`, `path`, `thumbnail`, `date`）を追加する
   - `/events` は `events` 配列をそのまま表示するため、表示順も意識して並べる

4. **表示確認**
   - `npm run dev` で `/events/` と作成したイベントページの表示を確認する

## 具体例2: Newsを更新する場合

1. **記事ファイルを追加・更新**
   - 日本語: `src/content/news-ja/<id>.mdx`
   - 英語: `src/content/news-en/<id>.mdx`
   - 形式は既存記事（例: `src/content/news-ja/260301.mdx`）に合わせる

2. **フロントマターを設定**
   - 必須項目: `title`, `description`, `date`, `tags`
   - News一覧とトップページの表示順は `date` の降順
   - tagは開催報告、ニュースから選択

3. **本文・画像を編集**
   - 画像を使う場合は `src/assets/news/<id>/` 配下に配置し、MDX内でimportして利用する
   - 必要に応じて `ArticleImage` など既存コンポーネントを使う

4. **表示確認**
   - `npm run dev` で `/news/` と記事詳細ページの表示を確認する
