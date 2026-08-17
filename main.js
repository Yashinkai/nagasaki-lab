/* ================================
   NAGASAKI LAB — main.js
   ================================ */

/* ハンバーガーメニューの開閉 */
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('.nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('is-open');
  });
}

/* ヒーロー カルーセル（オートプレイ + 前後ボタン + ドット） */
(function () {
  const carousel = document.querySelector('.hero-carousel');
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll('.hero-slide'));
  if (slides.length <= 1) return;

  const prevBtn = carousel.querySelector('.hero-carousel-prev');
  const nextBtn = carousel.querySelector('.hero-carousel-next');
  const dotsWrap = carousel.querySelector('.hero-carousel-dots');

  let current = 0;
  let timer = null;
  const INTERVAL = 5000;

  /* ドットを生成 */
  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'hero-carousel-dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', (i + 1) + '枚目のスライド');
    dot.addEventListener('click', () => { goTo(i); restart(); });
    if (dotsWrap) dotsWrap.appendChild(dot);
    return dot;
  });

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('is-active', i === current));
    dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function start() { timer = setInterval(next, INTERVAL); }
  function stop()  { if (timer) { clearInterval(timer); timer = null; } }
  function restart() { stop(); start(); }

  if (nextBtn) nextBtn.addEventListener('click', () => { next(); restart(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); restart(); });

  /* ホバー中は自動再生を停止 */
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);

  start();
}());

/* 研究業績ページ — サイドバー年リンク + スクロールスパイ */
(function () {
  const sidebar = document.querySelector('.pub-sidebar');
  if (!sidebar) return;

  /* 年リンクをクリック → 対応する details を開いてスクロール */
  sidebar.addEventListener('click', function (e) {
    const link = e.target.closest('a[href^="#year-"]');
    if (!link) return;
    e.preventDefault();
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    target.open = true;
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: top, behavior: 'smooth' });
  });

  /* スクロールスパイ — IntersectionObserver で年ブロックを監視 */
  const yearLinks = sidebar.querySelectorAll('a[href^="#year-"]');
  if (!yearLinks.length) return;

  const yearBlocks = Array.from(
    document.querySelectorAll('.pub-year-block[id]')
  );

  const sectionLinks = sidebar.querySelectorAll('a.pub-sidenav-link');
  const sections = Array.from(sectionLinks).map(l =>
    document.querySelector(l.getAttribute('href'))
  ).filter(Boolean);

  function setActive(id) {
    yearLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + id);
    });
  }

  function setSectionActive(id) {
    sectionLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + id);
    });
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
        setSectionActive('papers');
      }
    });
  }, { rootMargin: '-80px 0px -60% 0px', threshold: 0 });

  yearBlocks.forEach(b => io.observe(b));

  const sectionIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setSectionActive(entry.target.id);
        if (entry.target.id !== 'papers') {
          yearLinks.forEach(a => a.classList.remove('active'));
        }
      }
    });
  }, { rootMargin: '-80px 0px -40% 0px', threshold: 0 });

  sections.forEach(s => sectionIO.observe(s));
}());

/* 書籍カード モーダル */
(function () {
  const modal       = document.getElementById('bookModal');
  if (!modal) return;

  const overlay     = document.getElementById('bookModalOverlay');
  const closeBtn    = document.getElementById('bookModalClose');
  const modalImg    = document.getElementById('bookModalImg');
  const titleBlock  = document.getElementById('bookModalTitleBlock');
  const modalText   = document.getElementById('bookModalText');

  function openModal(card) {
    const img   = card.querySelector('.book-cover img');
    const year  = card.querySelector('.book-year');
    const title = card.querySelector('.book-title');
    const meta  = card.querySelector('.book-meta');
    const isbn  = card.querySelector('.book-isbn');
    const detail = card.querySelector('.book-detail-text');

    modalImg.src = img ? img.src : '';
    modalImg.alt = img ? img.alt : '';

    titleBlock.innerHTML = '';
    if (year)  titleBlock.appendChild(year.cloneNode(true));
    if (title) titleBlock.appendChild(title.cloneNode(true));
    if (meta)  titleBlock.appendChild(meta.cloneNode(true));
    if (isbn)  titleBlock.appendChild(isbn.cloneNode(true));

    modalText.innerHTML = detail ? detail.innerHTML.trim() : '';

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.book-card--clickable').forEach(card => {
    card.addEventListener('click', () => openModal(card));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card); }
    });
  });

  overlay.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
}());

/* フォトギャラリー ライトボックス */
(function () {
  const lightbox  = document.getElementById('galleryLightbox');
  if (!lightbox) return;

  const closeBtn  = document.getElementById('galleryLightboxClose');
  const lbImg     = document.getElementById('galleryLightboxImg');
  const lbCaption = document.getElementById('galleryLightboxCaption');

  function openLightbox(src, alt, caption) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    lbCaption.textContent = caption || '';
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    const img = item.querySelector('.gallery-photo img');
    const activate = () => openLightbox(
      item.dataset.src || (img ? img.src : ''),
      img ? img.alt : '',
      item.dataset.caption || ''
    );
    item.addEventListener('click', activate);
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
    });
  });

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
  closeBtn.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
  });
}());
