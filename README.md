# TPG公式サイト

TPGの公式Webサイトのソースコードです。Astroフレームワークを使用して構築されています。

## 📖 概要

このプロジェクトは、TPG(Taki Plaza Gardener)の公式Webサイトです。静的サイトジェネレーター「Astro」を使用し、WordPress（cms.tpgd.jp）からブログ記事を取得して表示しています。

### 主な機能

- 静的サイト生成（SSG）によるパフォーマンスの最適化
- WordPress GraphQL APIを利用したブログ記事の取得
- WordPressで記事が公開されたときの自動ビルド・デプロイ
- 多言語対応（日本語・英語）
- レスポンシブデザイン

## 🚀 セットアップ

### 前提条件

- `Node.js`（推奨: v18以上）
- `npm` または `pnpm`

### インストール手順

1. リポジトリをクローン

```sh
git clone https://github.com/tpgSAT/official.git
cd official
```

1. 依存関係をインストール

`npm`の場合

```sh
npm install
```

`pnpm`の場合

```sh
pnpm install
```

1. 開発サーバーを起動

`npm`の場合

```sh
npm run dev
```

`pnpm`の場合

```sh
pnpm dev
```

ブラウザで `http://localhost:4321` にアクセスすると、サイトが表示されます。

## 💻 開発

### 利用可能なコマンド

プロジェクトのルートディレクトリから、以下のコマンドを実行できます：

| `npm` | `pnpm` | 説明 |
| :--- | :--- | :--- |
| `npm install` | `pnpm install` | 依存関係をインストール |
| `npm run dev` | `pnpm dev` | 開発サーバーを起動（`localhost:4321`） |
| `npm run build` | `pnpm build` | 本番用サイトを `./dist/` にビルド |
| `npm run preview` | `pnpm preview` | ビルドしたサイトをローカルでプレビュー |
| `npm run astro ...` | `pnpm astro ...` | Astro CLIコマンドを実行（例: `astro add`, `astro check`） |

### プロジェクト構造

```text
/
├── migrations/          # D1（予約の空き状況）のテーブル定義
├── public/              # 静的ファイル（画像、フォント等）
├── src/
│   ├── assets/          # ビルド時に処理される画像等のアセット
│   ├── components/      # Astroコンポーネント
│   ├── content/         # Markdownコンテンツ
│   ├── i18n/            # 多言語対応の設定とUI翻訳
│   ├── layouts/         # ページレイアウトコンポーネント
│   ├── lib/             # ユーティリティ関数（API連携等）
│   │   ├── generated/   # GraphQL Codegenで自動生成された型定義・SDK
│   │   └── queries/     # GraphQLクエリファイル（.graphql）
│   └── pages/           # ページファイル（ルーティング）
├── astro.config.mjs     # Astroの設定ファイル
├── codegen.yml          # GraphQL Codegenの設定ファイル
└── package.json         # プロジェクトの依存関係とスクリプト
```

## 🏗️ ビルドとデプロイ

GitHub Actions で自動デプロイされています。  
`develop` / `master` ブランチへの push をトリガーに、

1. `npm ci` で依存をインストール  
2. `npm run build` で Astro をビルド  
3. `dist/` を rsync でサーバーへ配置  

という流れになっています。

`develop` ブランチの内容が`dev.tpgd.jp`へ、
`master` ブランチの内容が`tpgd.jp`へ自動的に反映されるようになっています。

### WordPress記事公開時の自動ビルド

WordPressで記事が公開されると、WordPressのWebhookからGitHub Actionsの `repository_dispatch` イベント（`wp_published`）がトリガーされ、自動的にビルド・デプロイが実行されます。  
対応するワークフローは `.github/workflows/wp-trigger-build.yml` です。

---

## 🔄 ブランチとPRのワークフロー

### ブランチ戦略

- **`develop`**: 開発用のメインブランチ
- **`main`**: 本番環境用のブランチ
- **`feat/*`**: 作業用のブランチ

### 開発の流れ

詳細は [`docs/development-flow.md`](./docs/development-flow.md) を参照してください。

## 📝 WordPress連携について

このサイトでは、WordPress（HeadlessCMS）からブログ記事を取得して表示しています。

### 実装詳細

**APIクライアント**: `src/lib/api.ts`

- `graphql-request` ライブラリの `GraphQLClient` を使用して `https://cms.tpgd.jp/graphql` に接続
- GraphQL Codegen（`codegen.yml`）で自動生成した型定義・SDK（`src/lib/generated/graphql.ts`）を利用
- `getAllPosts()` 関数で全記事を取得
- `getAllCategories()` 関数で全カテゴリーを取得

**GraphQLクエリ**: `src/lib/queries/`

- `getAllPosts.graphql` - 記事一覧取得クエリ（スラッグ・タイトル・本文・アイキャッチ画像・カテゴリー・タグ等）
- `getAllCategories.graphql` - カテゴリー一覧取得クエリ

**使用箇所**:

- `src/pages/blog/index.astro` - ブログ記事一覧ページ
- `src/pages/blog/[...slug].astro` - 個別記事ページ（動的ルーティング）
- `src/components/Sections/Blog.astro` - トップページのブログセクション（最新3件表示）

実装の詳細を確認したい場合は、上記のファイルを参照してください。

## 📅 予約の空き状況

Googleフォームで受け付けた予約の空き状況を、ページに ○（空きあり）△（残りわずか）×（満席）で表示します。ページ自体は静的なままで、空き状況だけをブラウザが API から取得して30秒ごとに更新します。

```text
Googleフォーム送信 → Apps Script（onFormSubmit）→ POST /api/reserve → D1（枠ごとの予約数）
Apps Script（10分ごと、回答シートを集計）→ POST /api/sync → D1（全枠を上書き）
ページ（SlotAvailability）→ GET /api/status → D1
```

- 予約の正本は Google の回答シートです。D1 には枠ごとの予約数だけを持ち、名前や連絡先は送りません
- キャンセルは回答シートの行を削除して行います。onFormSubmit では拾えないので、定期実行の `/api/sync` で数が戻ります
- 満席になってもフォームの受付は止まりません。確定の連絡の前に回答シートで人数を確認してください

### 実装

| ファイル | 内容 |
|---|---|
| `migrations/0001_create_slots.sql` | `slots` テーブル（`event_id`, `id`, `label`, `capacity`, `reserved`, `sort_order`, `updated_at`） |
| `src/pages/api/status.ts` | `GET /api/status?event=<eventId>`：枠ごとの定員と予約数を返す（認証なし） |
| `src/pages/api/reserve.ts` | `POST /api/reserve`：`{ eventId, slotId, count }` の人数を枠の予約数に足す |
| `src/pages/api/sync.ts` | `POST /api/sync`：`{ eventId, slots: [{ id, reserved }] }` で全枠を上書きする（送られなかった枠は0） |
| `src/lib/reservation.ts` | 認証と入力チェックの共通処理 |
| `src/components/SlotAvailability.astro` | 空き状況の表示。残りが定員の20%（切り上げ）以下で △ |

`/api/reserve` と `/api/sync` は `Authorization: Bearer <RESERVATION_API_SECRET>` がないと 401 を返します。

### 初回の設定

1. D1 データベースを作り、表示された `database_id` を `wrangler.jsonc` の `d1_databases` に書く
   ```sh
   npx wrangler d1 create official-reservations
   ```
2. テーブルを作る
   ```sh
   npx wrangler d1 migrations apply DB --remote
   ```
3. Cloudflare の Worker（`official`）に secret `RESERVATION_API_SECRET`（十分に長いランダムな文字列）を登録する（ダッシュボード、または `npx wrangler secret put RESERVATION_API_SECRET`）

### イベントごとの設定

1. 枠を D1 に登録する（`id` はフォームの選択肢と対応させる枠ID、`sort_order` は表示順）
   ```sh
   npx wrangler d1 execute DB --remote --command "INSERT INTO slots (event_id, id, label, capacity, sort_order, updated_at) VALUES ('koudaisai-2026', '1400', '14:00-15:00', 10, 1, strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))"
   ```
2. ページにコンポーネントを置く
   ```astro
   <SlotAvailability eventId="koudaisai-2026" />
   ```
3. フォームの回答先スプレッドシートで、拡張機能 → Apps Script を開き、スクリプトを貼り付ける
   - ファイル先頭の設定に、API のURL、イベントID、枠と人数の質問のタイトル、**選択肢の文言 → 枠ID の対応表** を書く。フォームの選択肢の文言を変えたら、この対応表も直す
   - プロジェクトの設定 → スクリプト プロパティに `RESERVATION_API_SECRET` を登録する
   - トリガーを2つ追加する：`onFormSubmit`（スプレッドシートから・フォーム送信時）、`syncAll`（時間主導型・10分ごと）

動作を確かめるときは、テスト用の `event_id` で枠を登録して試し、終わったら `DELETE FROM slots WHERE event_id = '<テスト用のID>'` で消してください。

ローカルでは `.dev.vars.example` を `.dev.vars` にコピーして `RESERVATION_API_SECRET` を入れ、`npx wrangler d1 migrations apply DB --local` でテーブルを作り、`--local` を付けて枠を登録してから `npm run preview` で起動します。

## 📚 参考リンク

- [Astro公式ドキュメント](https://docs.astro.build)
- [Astroチュートリアル](https://docs.astro.build/ja/tutorial/0-introduction/)
- [pnpm公式サイト](https://pnpm.io/)
- [pnpmを使う動機](https://pnpm.io/motivation)
- [WPGraphQL](https://www.wpgraphql.com/)
- [graphql-request](https://github.com/jasonkuhrt/graphql-request)
- [GraphQL Code Generator](https://the-guild.dev/graphql/codegen)
