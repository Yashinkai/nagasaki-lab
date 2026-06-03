# member.html Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 長崎大学 運動障害リハビリテーション学研究室の member.html を作成する。教員カードグリッド・客員研究員・大学院生・研究協力員・ゼミ生の各セクションを含む。

**Architecture:** 既存の style.css / main.js を共用する静的 HTML ページ。新規 CSS クラスを style.css に追記する。index.html と同一の header / footer / section パターンに従う。

**Tech Stack:** HTML5, CSS3（CSS Grid・CSS Custom Properties）, vanilla JS（既存 main.js）

---

### Task 1: ページスケルトン作成

**Files:**
- Create: `nagasaki-lab/member.html`

- [ ] **Step 1: member.html を作成（ヘッダー・フッターのみ）**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>メンバー — 長崎大学 運動障害リハビリテーション学研究室</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- ========== HEADER / NAV ========== -->
  <header class="header">
    <div class="container header-inner">
      <a href="index.html" class="logo">
        <span class="logo-ja">運動障害リハビリテーション学研究室</span>
        <span class="logo-en">Laboratory of Locomotive Rehabilitation Science — Nagasaki University</span>
      </a>
      <nav class="nav">
        <ul class="nav-list">
          <li><a href="index.html">トップ</a></li>
          <li><a href="research.html">研究紹介</a></li>
          <li><a href="member.html" class="nav-active">メンバー</a></li>
          <li><a href="article.html">研究業績</a></li>
          <li><a href="pressrelease.html">プレスリリース</a></li>
          <li><a href="photo.html">フォトギャラリー</a></li>
          <li><a href="access.html">アクセス</a></li>
        </ul>
      </nav>
      <button class="hamburger" id="hamburger" aria-label="メニューを開く">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>

  <!-- ========== PAGE HERO ========== -->
  <section class="page-hero">
    <div class="container">
      <h1 class="page-hero-title-en">Members</h1>
      <span class="page-hero-title-ja">メンバー</span>
    </div>
  </section>

  <!-- セクションはここに追加 -->

  <!-- ========== FOOTER ========== -->
  <footer class="footer">
    <div class="container footer-inner">
      <p class="footer-copy">
        Copyright © 2025 Laboratory of Locomotive Rehabilitation Science,<br>
        Nagasaki University Graduate School of Biomedical Sciences
      </p>
      <div class="footer-sns">
        <a href="https://x.com/nu_locomo_lab" target="_blank" rel="noopener" aria-label="X（旧Twitter）">X</a>
        <a href="https://www.facebook.com/people/%E9%95%B7%E5%B4%8E%E5%A4%A7%E5%AD%A6%E9%81%8B%E5%8B%95%E9%9A%9C%E5%AE%B3%E3%83%AA%E3%83%8F%E3%83%93%E3%83%AA%E3%83%86%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E5%AD%A6%E7%A0%94%E7%A9%B6%E5%AE%A4/100065706000926/" target="_blank" rel="noopener" aria-label="Facebook">Facebook</a>
      </div>
    </div>
  </footer>

  <script src="main.js"></script>
</body>
</html>
```

- [ ] **Step 2: style.css に page-hero と nav-active を追記**

`style.css` の末尾（`@media` ブロックの前）に追記：

```css
/* ---------- PAGE HERO（サブページ共通） ---------- */
.page-hero {
  background: var(--color-black);
  padding: calc(var(--header-height) + 3rem) 0 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.page-hero-title-en {
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 500;
  color: var(--color-white);
  letter-spacing: -0.02em;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.page-hero-title-ja {
  font-size: 13px;
  color: var(--color-gray);
}

/* アクティブナビ */
.nav-active {
  color: var(--color-white) !important;
}
```

- [ ] **Step 3: ブラウザで確認**

`nagasaki-lab/member.html` をブラウザで開く。
期待値: 黒ヘッダー・ナビ・「Members / メンバー」の見出し・フッターが表示される。

---

### Task 2: 教員セクション

**Files:**
- Modify: `nagasaki-lab/member.html`（page-hero の直後に追記）
- Modify: `nagasaki-lab/style.css`

- [ ] **Step 1: 教員セクション HTML を追加**

`<!-- セクションはここに追加 -->` を以下で置き換え：

```html
  <!-- ========== FACULTY ========== -->
  <section class="section" id="faculty">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title-en">Faculty</h2>
        <span class="section-title-ja">教員</span>
      </div>

      <div class="member-grid">

        <div class="member-card">
          <div class="member-photo">
            <img src="images/members/okita.jpg" alt="沖田 実" onerror="this.parentElement.classList.add('member-photo--placeholder'); this.remove();">
          </div>
          <div class="member-info">
            <p class="member-role">教授</p>
            <h3 class="member-name">沖田 実</h3>
            <p class="member-credentials">理学療法士 / 博士（医学）</p>
            <p class="member-research">関節拘縮の発生メカニズムの解明とリハビリテーションの効果</p>
          </div>
        </div>

        <div class="member-card">
          <div class="member-photo">
            <img src="images/members/origuchi.jpg" alt="折口 智樹" onerror="this.parentElement.classList.add('member-photo--placeholder'); this.remove();">
          </div>
          <div class="member-info">
            <p class="member-role">教授</p>
            <h3 class="member-name">折口 智樹</h3>
            <p class="member-credentials">医師（リウマチ内科） / 博士（医学）</p>
            <p class="member-research">関節リウマチの発生メカニズム解明と治療開発、生化学的解析</p>
          </div>
        </div>

        <div class="member-card">
          <div class="member-photo">
            <img src="images/members/sakamoto.jpg" alt="坂本 淳哉" onerror="this.parentElement.classList.add('member-photo--placeholder'); this.remove();">
          </div>
          <div class="member-info">
            <p class="member-role">教授</p>
            <h3 class="member-name">坂本 淳哉</h3>
            <p class="member-credentials">理学療法士 / 博士（医学）</p>
            <p class="member-research">肉眼解剖学的手法による運動器理学療法学、関節拘縮治療、慢性痛予防</p>
          </div>
        </div>

        <div class="member-card">
          <div class="member-photo">
            <img src="images/members/honda.jpg" alt="本田 祐一郎" onerror="this.parentElement.classList.add('member-photo--placeholder'); this.remove();">
          </div>
          <div class="member-info">
            <p class="member-role">助教</p>
            <h3 class="member-name">本田 祐一郎</h3>
            <p class="member-credentials">理学療法士 / 博士（医学）</p>
            <p class="member-research">筋性拘縮の発生機序に関わる分子メカニズム</p>
          </div>
        </div>

        <div class="member-card">
          <div class="member-photo">
            <img src="images/members/nishi.jpg" alt="西 祐樹" onerror="this.parentElement.classList.add('member-photo--placeholder'); this.remove();">
          </div>
          <div class="member-info">
            <p class="member-role">助教</p>
            <h3 class="member-name">西 祐樹</h3>
            <p class="member-credentials">理学療法士 / 博士（健康科学）</p>
            <p class="member-research">しびれ感・疼痛の病態、運動制御障害（腰痛・脳卒中・パーキンソン病）</p>
          </div>
        </div>

        <div class="member-card">
          <div class="member-photo">
            <img src="images/members/takahashi.jpg" alt="高橋 あゆみ" onerror="this.parentElement.classList.add('member-photo--placeholder'); this.remove();">
          </div>
          <div class="member-info">
            <p class="member-role">助教</p>
            <h3 class="member-name">高橋 あゆみ</h3>
            <p class="member-credentials">理学療法士 / 博士（医学）</p>
            <p class="member-research">筋萎縮に対する理学療法学の生物学的効果の検証</p>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- セクションはここに追加 -->
```

- [ ] **Step 2: 教員カード用 CSS を style.css に追記**

```css
/* ---------- MEMBER GRID（教員） ---------- */
.member-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.member-card {
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.2s;
}

.member-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.member-photo {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--color-gray-light);
}

.member-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

.member-photo--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0ee;
}

.member-photo--placeholder::after {
  content: "Photo";
  font-size: 11px;
  color: var(--color-gray);
}

.member-info {
  padding: 1rem 1.1rem 1.25rem;
}

.member-role {
  font-size: 10px;
  font-weight: 500;
  color: var(--color-accent);
  letter-spacing: 0.08em;
  margin-bottom: 0.25rem;
}

.member-name {
  font-size: 17px;
  font-weight: 500;
  color: var(--color-black);
  margin-bottom: 0.3rem;
  letter-spacing: -0.01em;
}

.member-credentials {
  font-size: 11px;
  color: var(--color-gray);
  margin-bottom: 0.6rem;
}

.member-research {
  font-size: 12px;
  color: var(--color-gray-dark);
  line-height: 1.7;
}
```

- [ ] **Step 3: ブラウザで確認**

`member.html` をリロード。
期待値: 教員が 3 列のカードグリッドで表示される。写真未設置のためプレースホルダー "Photo" が表示される。

---

### Task 3: 客員研究員・大学院生・研究協力員・ゼミ生セクション

**Files:**
- Modify: `nagasaki-lab/member.html`
- Modify: `nagasaki-lab/style.css`

- [ ] **Step 1: 残り 4 セクションの HTML を追加**

`<!-- セクションはここに追加 -->` を以下で置き換え：

```html
  <!-- ========== VISITING RESEARCHERS ========== -->
  <section class="section section-alt" id="visiting">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title-en">Visiting Researchers</h2>
        <span class="section-title-ja">客員研究員</span>
      </div>
      <ul class="staff-list">
        <li class="staff-item">
          <span class="staff-name">片岡 英樹</span>
          <span class="staff-affil">長崎記念病院・理学療法士 / 博士（医学）</span>
        </li>
        <li class="staff-item">
          <span class="staff-name">後藤 響</span>
          <span class="staff-affil">長崎記念病院・理学療法士 / 博士（医学）</span>
        </li>
        <li class="staff-item">
          <span class="staff-name">佐々木 遼</span>
          <span class="staff-affil">日本学術振興会 / 畿央大学・理学療法士 / 博士（医学）</span>
        </li>
        <li class="staff-item">
          <span class="staff-name">中川 晃一</span>
          <span class="staff-affil">長崎記念病院・理学療法士 / 博士（医学）</span>
        </li>
      </ul>
    </div>
  </section>

  <!-- ========== GRADUATE STUDENTS ========== -->
  <section class="section" id="graduate">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title-en">Graduate Students</h2>
        <span class="section-title-ja">大学院生</span>
      </div>
      <div class="grad-list">
        <div class="grad-row">
          <span class="grad-year">博士課程 D4</span>
          <span class="grad-names">坂本有希倫、沖田星馬</span>
        </div>
        <div class="grad-row">
          <span class="grad-year">博士課程 D3</span>
          <span class="grad-names">三宅純平</span>
        </div>
        <div class="grad-row">
          <span class="grad-year">博士課程 D2</span>
          <span class="grad-names">石木雄大、小川祥広、瀬口千晶</span>
        </div>
        <div class="grad-row">
          <span class="grad-year">修士課程 M2</span>
          <span class="grad-names">沖田隼斗</span>
        </div>
        <div class="grad-row">
          <span class="grad-year">修士課程 M1</span>
          <span class="grad-names">岩本倫太朗、恩河優真、木寺郁人、平田悠真、藤井遥大、堀脇千愛</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== RESEARCH COLLABORATORS ========== -->
  <section class="section section-alt" id="collaborators">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title-en">Research Collaborators</h2>
        <span class="section-title-ja">研究協力員</span>
      </div>
      <ul class="staff-list">
        <li class="staff-item">
          <span class="staff-name">近藤 康隆</span>
          <span class="staff-affil">日赤長崎原爆病院・理学療法士</span>
        </li>
        <li class="staff-item">
          <span class="staff-name">沖田 勇帆</span>
          <span class="staff-affil">Soaring Health・作業療法士</span>
        </li>
        <li class="staff-item">
          <span class="staff-name">井上 凜子</span>
          <span class="staff-affil">長崎記念病院・理学療法士</span>
        </li>
      </ul>
    </div>
  </section>

  <!-- ========== SEMINAR STUDENTS ========== -->
  <section class="section" id="seminar">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title-en">Seminar Students</h2>
        <span class="section-title-ja">ゼミ生（学部4年）</span>
      </div>
      <div class="seminar-grid">
        <div class="seminar-group">
          <p class="seminar-supervisor">沖田ゼミ</p>
          <p class="seminar-names">足穂日向、中川和奏</p>
        </div>
        <div class="seminar-group">
          <p class="seminar-supervisor">折口ゼミ</p>
          <p class="seminar-names">伊藤千咲、徳永駿之介、横山優希</p>
        </div>
        <div class="seminar-group">
          <p class="seminar-supervisor">坂本ゼミ</p>
          <p class="seminar-names">前田瑛香、安松優衣、若杉琉慧</p>
        </div>
        <div class="seminar-group">
          <p class="seminar-supervisor">本田ゼミ</p>
          <p class="seminar-names">相良泰充、田村和大</p>
        </div>
        <div class="seminar-group">
          <p class="seminar-supervisor">西ゼミ</p>
          <p class="seminar-names">牧山惇哉、水本紗亜弥</p>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: 補助セクション用 CSS を style.css に追記**

```css
/* ---------- STAFF LIST（客員研究員・研究協力員） ---------- */
.staff-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
}

.staff-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0.9rem 0;
  border-bottom: 1px solid #e8e8e8;
}

.staff-item:nth-child(odd) {
  padding-right: 2rem;
  border-right: 1px solid #e8e8e8;
}

.staff-item:nth-child(even) {
  padding-left: 2rem;
}

.staff-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-black);
}

.staff-affil {
  font-size: 12px;
  color: var(--color-gray);
}

/* ---------- GRAD LIST（大学院生） ---------- */
.grad-list {
  display: flex;
  flex-direction: column;
}

.grad-row {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 1.5rem;
  align-items: baseline;
  padding: 0.85rem 0;
  border-bottom: 1px solid #ebebeb;
  font-size: 14px;
}

.grad-row:first-child {
  border-top: 1px solid #ebebeb;
}

.grad-year {
  font-size: 12px;
  color: var(--color-gray);
  font-weight: 500;
  white-space: nowrap;
}

.grad-names {
  color: var(--color-dark);
  line-height: 1.7;
}

/* ---------- SEMINAR GRID（ゼミ生） ---------- */
.seminar-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.seminar-group {
  background: var(--color-gray-light);
  border-radius: 6px;
  padding: 1rem 1.1rem;
}

.seminar-supervisor {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-accent);
  margin-bottom: 0.4rem;
}

.seminar-names {
  font-size: 13px;
  color: var(--color-dark);
  line-height: 1.7;
}
```

- [ ] **Step 3: ブラウザで全セクション確認**

`member.html` をリロード。
期待値:
- 客員研究員が 2 カラムのリストで表示される
- 大学院生が学年ラベル付きの行で表示される
- 研究協力員が 2 カラムのリストで表示される
- ゼミ生が 3 カラムのカードで表示される

---

### Task 4: レスポンシブ対応

**Files:**
- Modify: `nagasaki-lab/style.css`

- [ ] **Step 1: スマホ用メディアクエリを追記**

`style.css` の `@media (max-width: 768px)` ブロック内に追記：

```css
  /* メンバーグリッド */
  .member-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  /* スタッフリスト */
  .staff-list {
    grid-template-columns: 1fr;
  }

  .staff-item:nth-child(odd) {
    padding-right: 0;
    border-right: none;
  }

  .staff-item:nth-child(even) {
    padding-left: 0;
  }

  /* 大学院生 */
  .grad-row {
    grid-template-columns: 110px 1fr;
    gap: 1rem;
  }

  /* ゼミ生 */
  .seminar-grid {
    grid-template-columns: repeat(2, 1fr);
  }
```

`@media (max-width: 480px)` ブロック内に追記：

```css
  .member-grid {
    grid-template-columns: 1fr;
  }

  .seminar-grid {
    grid-template-columns: 1fr;
  }
```

- [ ] **Step 2: ブラウザのデベロッパーツールでスマホ表示を確認**

Chrome DevTools → Toggle Device Toolbar → iPhone SE サイズ（375px）で確認。
期待値: 全セクションが 1 〜 2 カラムに切り替わり、テキストが見切れない。
