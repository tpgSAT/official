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
- Node.js（推奨: v18以上）
- npm

### インストール手順

1. リポジトリをクローン
```sh
git clone https://github.com/tpgSAT/official.git
cd official
```

2. 依存関係をインストール
```sh
npm install
```

3. 開発サーバーを起動
```sh
npm run dev
```

ブラウザで `http://localhost:4321` にアクセスすると、サイトが表示されます。

## 💻 開発

### 利用可能なコマンド

プロジェクトのルートディレクトリから、以下のコマンドを実行できます：

| コマンド | 説明 |
| :--- | :--- |
| `npm install` | 依存関係をインストール |
| `npm run dev` | 開発サーバーを起動（`localhost:4321`） |
| `npm run build` | 本番用サイトを `./dist/` にビルド |
| `npm run preview` | ビルドしたサイトをローカルでプレビュー |
| `npm run astro ...` | Astro CLIコマンドを実行（例: `astro add`, `astro check`） |

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

## 📚 参考リンク

- [Astro公式ドキュメント](https://docs.astro.build)
- [Astroチュートリアル](https://docs.astro.build/ja/tutorial/0-introduction/)
- [WPGraphQL](https://www.wpgraphql.com/)
- [graphql-request](https://github.com/jasonkuhrt/graphql-request)
- [GraphQL Code Generator](https://the-guild.dev/graphql/codegen)
