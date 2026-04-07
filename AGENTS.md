# AGENTS.md

このファイルは、このリポジトリで作業するAIエージェント向けの実務ガイドです。

## 目的

- Astro製のTPG公式サイトを安全に更新する
- 既存の実装・運用フロー（GitHub Actions / WordPress連携）を壊さない
- 変更を最小限かつ明確に保つ

## プロジェクト概要

- フレームワーク: Astro
- コンテンツ:
  - 固定ページ: `src/pages/`
  - ブログ: WordPress GraphQL (`https://cms.tpgd.jp/graphql`)
- 生成物: `dist/`
- 主なデプロイ:
  - `develop` push -> 開発環境
  - `master` push -> 本番環境
  - `repository_dispatch (wp_published)` -> WordPress公開連動ビルド

## 基本コマンド

```sh
npm install
npm run dev
npm run build
npm run preview
npm run codegen
```

## 変更時のルール

1. 実装前に必ずContext7でAstroおよび関連ライブラリの公式ドキュメントを確認する。
2. まず既存パターンを確認してから編集する（命名・構成・スタイルを踏襲）。
3. 無関係なファイルやフォーマットを巻き込んで変更しない。
4. 影響範囲がある変更では、関連箇所（日本語/英語ページ、共通コンポーネント）をまとめて確認する。
5. GraphQLクエリや型に関わる変更時は `npm run codegen` を実行する。
6. 仕様が曖昧なときは独断で広げず、前提を明示して最小実装に留める。

## 実装上の注意

- イベント表示は `src/lib/events.ts` の配列順に依存する箇所があるため、順序変更は意図を持って行う。
- `src/components/Heading.astro` は `<slot />` を `<p>` で包むため、子要素はインライン前提で扱う。
- リダイレクトは `public/.htaccess` で管理されているため、URL変更時はここも確認する。

## 期待するコミット品質

- 変更理由を説明できる粒度でコミットする。
- 1コミットに複数の無関係な目的を混ぜない。
- レビューで追いやすい差分（不要な改行・整形のみ変更を避ける）にする。
