# TPG公式サイト

TPGの公式Webサイトのソースコードです。Astroフレームワークを使用して構築されています。

> 💡 このREADMEは、Astroの公式チュートリアルを終えた方を対象にしています。

## 📖 概要

このプロジェクトは、TPG（東京プログラミング学園）の公式Webサイトです。静的サイトジェネレーター「Astro」を使用し、WordPress（HeadlessCMS）からブログ記事を取得して表示しています。

### 主な機能
- 静的サイト生成（SSG）によるパフォーマンスの最適化
- WordPress REST APIを利用したブログ記事の取得
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
│   └── pages/           # ページファイル（ルーティング）
├── astro.config.mjs     # Astroの設定ファイル
└── package.json         # プロジェクトの依存関係とスクリプト
```

## 🏗️ ビルドとデプロイ

### 本番ビルド

```sh
npm run build
```

ビルドされたファイルは `./dist/` ディレクトリに出力されます。

### プレビュー

ビルド後、デプロイ前にローカルで確認する場合：

```sh
npm run preview
```

## 🔄 ブランチとPRのワークフロー

### ブランチ戦略
- **`develop`**: 開発用のメインブランチ
- **`main`**: 本番環境用のブランチ
- **`feature/*`**: 機能追加・修正用のブランチ

### 開発の流れ

1. **フィーチャーブランチを作成**
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

**API取得ロジック**: `src/lib/api.ts`
- `getPosts()` 関数でWordPress REST APIからすべての記事を取得
- ページネーション対応（1ページあたり100件）
- `_embed` パラメータで画像やカテゴリーなどの関連データも含めて取得

**使用箇所**:
- `src/pages/blog/index.astro` - ブログ記事一覧ページ
- `src/pages/blog/[...slug].astro` - 個別記事ページ（動的ルーティング）
- `src/components/Sections/Blog.astro` - トップページのブログセクション（最新3件表示）

実装の詳細を確認したい場合は、上記のファイルを参照してください。

## 📚 参考リンク

- [Astro公式ドキュメント](https://docs.astro.build)
- [Astroチュートリアル](https://docs.astro.build/ja/tutorial/0-introduction/)
- [WordPress REST API](https://developer.wordpress.org/rest-api/)

## 🤝 コントリビューション

プロジェクトへの貢献を歓迎します！上記のブランチ・PRワークフローに従って、変更を提案してください。

---

Happy coding! 🚀
