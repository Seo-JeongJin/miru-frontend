# MIRU (みる)

> 日本での就職を目指す韓国人のための自己分析サービス
> 🔗 [miru.io.kr](https://miru.io.kr/)

---

## 目次

- [プロジェクト概要](#-プロジェクト概要)
- [サービスの流れ](#-サービスの流れ)
- [技術スタック](#-技術スタック)
- [チーム構成と期間](#-チーム構成と期間)
- [担当領域](#-担当領域)

---

## 📌 プロジェクト概要

日本での就職において、自己分析は欠かせないプロセスです。
しかし、韓国語による自己分析情報は著しく不足しており、日本語で探そうとしても言語の壁があります。

**MIRU**は、日本での就職を目指す韓国人学生が、自己分析をより簡単に始め、完了できるよう支援するために作られました。  
現在は、日本での就職を目標とする学科内の学生を対象に開始しており、今後はより多くの韓国人就職準備生へと拡大していく予定です。

---

## 🔄 サービスの流れ

ログイン → 利用規約への同意 → 自己分析の作成 → コミュニティ / お問い合わせによる情報の補完


### 1. 認証
- Google OAuthソーシャルログイン
- 初回ログイン時、利用規約同意ページ（`/terms`）へ強制遷移
- 同意完了後、自己分析ページ（`/analysis`）へ遷移
![Image](https://github.com/user-attachments/assets/af3e2ff7-6d05-459d-ae4b-bde2c42e8350)

### 2. 主要機能

**自己分析（`/analysis`）**
- 日本での就職に必要な自己分析の質問リストを提供
- フィルター：全体 / 未作成 / 作成中 / 作成完了
- Tiptapエディターで回答を作成
  - 一時保存 / 作成完了の2段階保存
  - 作成完了後、閲覧モードに切り替え
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/61ad0bd2-2ed2-4ea9-bb18-4f13e8f6f62d" /></td>
    <td><img src="https://github.com/user-attachments/assets/877e70fa-890b-4627-ba3d-f828d24bfaf7" /></td>
    <td><img src="https://github.com/user-attachments/assets/698705b4-1fad-4d8d-9c0a-0637d236753e" /></td>
  </tr>
</table>

**コミュニティ掲示板 (`/boards`)**
- 就職準備の経験共有および検索
- 自己分析内容に対するレビューおよびディスカッション
- コメント / 返信
![Image](https://github.com/user-attachments/assets/2754d1fa-43ea-4c12-8571-9767a7f068dc)

**1対1のお問い合わせ (`/inquiries`)**
- ユーザー → 管理者への質問送信
- 管理者の回答確認
![Image](https://github.com/user-attachments/assets/a08c1e32-7f3f-4667-9fbc-5e1219b009de)

**通知 (`/alarms`)**
- コメント、お問い合わせへの回答などの通知一覧（無限スクロール）
![Image](https://github.com/user-attachments/assets/ec4fa28e-f8ad-4ee8-8e20-4759b7254673)


### 3. マイページ (`/mypage`)
- 自己分析の完了率、投稿／コメント数の統計
- 自分の投稿／自分のコメントの閲覧
![Image](https://github.com/user-attachments/assets/48f4da57-acad-49ac-8f80-fa209e5d90ee)

### 4. 付加ページ
- `/about` — 自己分析とは何か
- `/tips` — 自己分析作成のヒント
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/16285041-7d95-491d-aef8-acd4d3fb4ae3" /></td>
    <td><img src="https://github.com/user-attachments/assets/72c360cf-46da-4c67-9fdd-f11b32ae914d" /></td>
  </tr>
</table>

### 5. 管理者 (`/admin`)
- お問い合わせの管理および回答
- ユーザー管理
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/a6138801-e66f-46f5-9789-39d08fafe057" /></td>
    <td><img src="https://github.com/user-attachments/assets/907defed-2494-4458-94fa-116bc4a0c153" /></td>
  </tr>
</table>

---

## 🛠 技術スタック

| 分類 | 技術 |
|------|------|
| フレームワーク | Next.js 16, React 19 |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS v4, shadcn/ui |
| サーバー状態 | TanStack Query v5 |
| クライアント状態 | Zustand |
| エディター | Tiptap |
| HTTPクライアント | Axios |
| アーキテクチャ | FSD (Feature-Sliced Design) |

---

## 👥 チーム構成と期間

- **期間:** 2026年1月中旬～3月中旬（約2ヶ月）
- **チーム:** 3名（フロントエンド2名、バックエンド1名）

---

## 🙋 担当領域

| 領域 | 内容 |
|------|------|
| 利用規約への同意 (`/terms`) | 初回ログイン時の利用規約同意フローの実装 |
| 自己分析 (`/analysis`) | 質問リスト、フィルタリング、詳細ページ、Tiptapエディタ、2段階保存、ビューモードの全実装 |
| マイページ (`/mypage`) | 完了率の統計、自分の投稿/コメントの閲覧機能の全実装 |
| 管理者 (`/admin`) | お問い合わせの管理および回答、ユーザー管理の全実装 |
