# TPG公式サイト

TPGの公式Webサイトのソースコードです。Astroフレームワークを使用して構築されています。

## 📖 概要

このプロジェクトは、TPG(Taki Plaza Gardener)の公式Webサイトです。静的サイトジェネレーター「Astro」を使用し、Directus（directus.tpgd.jp）からブログ記事を取得して表示しています。

### 主な機能

- 静的サイト生成（SSG）によるパフォーマンスの最適化
- Directus の GraphQL API を利用したブログ記事の取得
- Directus で記事が公開されたときの自動ビルド・デプロイ
- Directus の編集画面からのブログ記事のプレビュー
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

Cloudflare Workers にデプロイしています。ビルドとデプロイは Cloudflare Workers Builds（Cloudflare 側の GitHub 連携）で行われ、設定は Cloudflare のダッシュボードで管理しています。

`develop` ブランチの内容が`dev.tpgd.jp`へ、
`master` ブランチの内容が`tpgd.jp`へ自動的に反映されるようになっています。

ほとんどのページはビルド時に生成した静的ファイルとして配信しています。サーバー側で描画するのはブログのプレビュー（`/blog/preview/*`）だけです。

### リダイレクト

リダイレクトは `public/_redirects` で管理しています（Cloudflare Workers の静的アセットの機能。`.htaccess` は使えません）。  
WordPress 時代のブログ記事URL（`/blog/<slug>`、`/blog/<WPの記事ID>`）は、ここで新しいURL（`/blog/<UUID>/`）へ転送しています。

### Directus で記事が公開されたときの自動ビルド

Directus の Flow から Cloudflare の Deploy Hook を呼び出して、ビルド・デプロイを実行します。設定手順は次のとおりです。

1. Cloudflare のダッシュボードで Workers & Pages → `official` → Settings → Builds → Deploy Hooks を開き、`master` ブランチの Deploy Hook を作成してURLを控える
2. Directus の Settings → Flows で Flow を作成する
   - トリガー: Event Hook（Type: Action）、Scope: `items.create` / `items.update` / `items.delete`、Collections: `Post`
   - 下書きの保存のたびにビルドが走らないよう、Read Data で対象の記事を読み、Condition で `Status` が `published` のとき（または公開を取り下げたとき）だけ次へ進める
   - Webhook / Request URL で、控えた Deploy Hook のURLに `POST` する

Content Versioning のバージョンへの保存では `Post` の更新イベントは発火しないため、バージョンで書いている間はビルドは走りません。

---

## 🔄 ブランチとPRのワークフロー

### ブランチ戦略

- **`develop`**: 開発用のメインブランチ
- **`main`**: 本番環境用のブランチ
- **`feat/*`**: 作業用のブランチ

### 開発の流れ

詳細は [`docs/development-flow.md`](./docs/development-flow.md) を参照してください。

## 📝 Directus連携について

このサイトでは、Directus（HeadlessCMS）からブログ記事を取得して表示しています。

### 実装詳細

**APIクライアント**: `src/lib/api.ts`

- `graphql-request` ライブラリの `GraphQLClient` を使用して `https://directus.tpgd.jp/graphql` に接続
- GraphQL Codegen（`codegen.yml`）で自動生成した型定義・SDK（`src/lib/generated/graphql.ts`）を利用
- Directus の `Post` を `BlogPost`（`id` / `title` / `content` / `date` / `thumbnail` / `categories` / `tags`）に変換して各ページに渡す
- `getAllPosts()` 関数で公開中（`Status = published`）の全記事を新しい順に取得
- `getAllCategories()` 関数で全カテゴリーを取得
- `getPreviewPost()` 関数でプレビュー用に下書きを含む記事を1件取得

ビルド時は Directus の Public ロールで読み取ります。Public ロールには `Post`（`Status = published` のみ）、`categories`、`directus_files` の読み取り権限が必要です。

**GraphQLクエリ**: `src/lib/queries/`

- `postFields.graphql` - 記事の共通フィールド（UUID・タイトル・本文・公開日・サムネイル・カテゴリー・タグ）
- `getAllPosts.graphql` - 記事一覧取得クエリ
- `getAllCategories.graphql` - カテゴリー一覧取得クエリ
- `getPreviewPost.graphql` - プレビュー用の記事取得クエリ

**使用箇所**:

- `src/pages/blog/[...page].astro` - ブログ記事一覧ページ
- `src/pages/blog/[id].astro` - 個別記事ページ（URLは `/blog/<UUID>/`）
- `src/pages/blog/tags/[tag]/[...page].astro` - カテゴリー別の記事一覧ページ（親カテゴリーには子カテゴリーの記事も並ぶ）
- `src/pages/blog/preview/[id].astro` - プレビューページ（サーバー側で描画）
- `src/components/BlogArticle.astro` - 記事本文の表示（個別記事ページとプレビューで共通）
- `src/components/Sections/Blog.astro` - トップページのブログセクション（最新3件表示）

GraphQLクエリを変更したら `npm run codegen` で型定義を再生成してください。

### 記事のプレビュー

Directus の編集画面で、保存した内容をサイトと同じ見た目で確認できます（保存するたびに表示が更新されます）。新しい記事は、一度下書きとして保存するとプレビューできるようになります。

設定手順:

1. Directus で読み取り専用の Preview ユーザーとポリシーを作り、静的トークンを発行する
   - 権限: `Post`（すべての Status）、`categories`、`directus_files`、`directus_versions` の Read
2. Cloudflare の Worker（`official`）に secret を2つ登録する（ダッシュボード、または `npx wrangler secret put <KEY>`）
   - `DIRECTUS_PREVIEW_TOKEN`: 1 のトークン
   - `PREVIEW_SECRET`: プレビューURLに付ける合言葉（十分に長いランダムな文字列）
3. Directus の Settings → Data Model → `Post` の Preview URL を次のように設定する  
   `https://tpgd.jp/blog/preview/{{UUID}}?secret=<PREVIEW_SECRET>&version={{$version}}`
4. Directus サーバーの環境変数 `CONTENT_SECURITY_POLICY_DIRECTIVES__FRAME_SRC` に `https://tpgd.jp` を追加する（編集画面の iframe でサイトを表示するため）

ローカルで試すときは、`.dev.vars.example` を `.dev.vars` にコピーして値を入れ、`npm run preview` で起動します。

## 📚 参考リンク

- [Astro公式ドキュメント](https://docs.astro.build)
- [Astroチュートリアル](https://docs.astro.build/ja/tutorial/0-introduction/)
- [pnpm公式サイト](https://pnpm.io/)
- [pnpmを使う動機](https://pnpm.io/motivation)
- [Directus公式ドキュメント](https://directus.com/docs)
- [graphql-request](https://github.com/jasonkuhrt/graphql-request)
- [GraphQL Code Generator](https://the-guild.dev/graphql/codegen)
