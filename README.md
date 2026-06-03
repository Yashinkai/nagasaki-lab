# 長崎大学 運動障害リハビリテーション学研究室 — サイトリニューアル

## ファイル構成

```
nagasaki-lab/
├── index.html      ← トップページ
├── style.css       ← 全ページ共通スタイル
├── main.js         ← ハンバーガーメニューなどのJS
└── README.md       ← このファイル
```

## 今後追加するページ（現サイトと同じ構成）

```
├── research.html       ← 研究紹介
├── member.html         ← メンバー
├── article.html        ← 研究業績
├── pressrelease.html   ← プレスリリース
├── photo.html          ← フォトギャラリー
├── book.html           ← 書籍紹介
├── access.html         ← アクセス
└── link.html           ← リンク
```

## 画像フォルダ

```
├── images/
│   ├── hero.jpg            ← ヒーロー画像（index.htmlで使用）
│   ├── header-logo.png     ← ロゴ画像（あれば）
│   └── members/            ← メンバー写真
│       ├── okita.jpg
│       └── ...
```

## カスタマイズのポイント

### アクセントカラーの変更
`style.css` の `:root` 内：
```css
--color-accent: #2e7d32;     /* 現在：グリーン系 → お好みの色に変更 */
--color-accent-bg: #e8f5e9;  /* アクセントの薄い背景色 */
```

### ヒーロー画像の設定
`index.html` のこの部分のコメントを外して画像パスを設定：
```html
<!-- <img src="images/hero.jpg" alt="研究室の様子"> -->
```

### ニュースの追加
`index.html` の `<ul class="news-list">` に以下の形式で追加：
```html
<li class="news-item">
  <span class="news-date">2026.01.01</span>
  <span class="news-tag tag-paper">論文</span>  ← tag-paper / tag-award / tag-news
  <p class="news-text">ここにニュース本文を書く</p>
</li>
```

## Claude Code への渡し方

1. このフォルダをそのまま Claude Code に渡す
2. 「このファイルをベースに〇〇ページを作って」と指示する
3. 変更したい時は「style.cssの〇〇を変えて」と具体的に伝える
