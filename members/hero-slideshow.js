/* =========================================================
   メンバー個人ページ ヒーロー画像スライドショー
   ---------------------------------------------------------
   各メンバー専用フォルダ（例：../images/members/okita/）に
   1.jpg, 2.jpg, 3.jpg … と連番で画像を入れると、
   1 から順に自動で読み込み、見つからなくなったら停止します。
   ・拡張子は .jpg / .jpeg / .png に対応（小文字で保存してください）
   ・画像が 0 枚のフォルダはスライドショーを非表示にします
   ・画像が 1 枚なら前後ボタン・ドット・自動再生なしで静止表示
   ・data-slides-dir 属性でフォルダを、data-slides-max で最大探索枚数を指定
   ========================================================= */
(function () {
  var EXTS = ['jpg', 'jpeg', 'png'];

  var carousels = document.querySelectorAll('.hero-carousel[data-slides-dir]');
  Array.prototype.forEach.call(carousels, setup);

  function setup(carousel) {
    var dir = carousel.getAttribute('data-slides-dir');
    var max = parseInt(carousel.getAttribute('data-slides-max') || '30', 10);
    var track = carousel.querySelector('.hero-carousel-track');
    if (!dir || !track) return;

    var sources = [];
    probe(1);

    function probe(i) {
      if (i > max) return done();
      tryExt(i, 0);
    }
    function tryExt(i, e) {
      if (e >= EXTS.length) return done(); // この番号が見つからなければ連番終了
      var src = dir + i + '.' + EXTS[e];
      var img = new Image();
      img.onload = function () { sources.push(src); probe(i + 1); };
      img.onerror = function () { tryExt(i, e + 1); };
      img.src = src;
    }
    function done() {
      if (!sources.length) { carousel.style.display = 'none'; return; }
      build(carousel, track, sources);
    }
  }

  function build(carousel, track, sources) {
    track.innerHTML = sources.map(function (src, i) {
      return '<div class="hero-slide' + (i === 0 ? ' is-active' : '') +
        '"><img src="' + src + '" alt="スライド' + (i + 1) + '"></div>';
    }).join('');
    carousel.style.display = '';

    var slides = Array.prototype.slice.call(track.querySelectorAll('.hero-slide'));
    var prevBtn = carousel.querySelector('.hero-carousel-prev');
    var nextBtn = carousel.querySelector('.hero-carousel-next');
    var dotsWrap = carousel.querySelector('.hero-carousel-dots');

    // 画像が 1 枚だけならボタン・ドット・自動再生は不要
    if (slides.length <= 1) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      return;
    }

    var current = 0;
    var timer = null;
    var INTERVAL = 5000;

    var dots = slides.map(function (_, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'hero-carousel-dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', (i + 1) + '枚目のスライド');
      dot.addEventListener('click', function () { goTo(i); restart(); });
      if (dotsWrap) dotsWrap.appendChild(dot);
      return dot;
    });

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle('is-active', i === current); });
      dots.forEach(function (d, i) { d.classList.toggle('is-active', i === current); });
    }
    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }
    function start() { timer = setInterval(next, INTERVAL); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function restart() { stop(); start(); }

    if (nextBtn) nextBtn.addEventListener('click', function () { next(); restart(); });
    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); restart(); });
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    start();
  }
}());
