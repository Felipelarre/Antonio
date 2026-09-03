/* ============================================================
   main.js — Seu Antônio Bar e Petiscaria
   Preloader · header · menu mobile · reveals · parallax do hero
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGSAP = typeof window.gsap !== 'undefined';

  /* ---------- Ano no rodapé ---------- */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  /* ---------- Preloader ---------- */
  var preloader = document.getElementById('preloader');
  var preloaderDone = false;
  function endPreloader() {
    if (preloaderDone) return;
    preloaderDone = true;
    document.body.classList.remove('is-loading');
    document.body.classList.add('ready');
    if (!preloader) return;
    preloader.classList.add('is-done');
    window.setTimeout(function () {
      if (preloader && preloader.parentNode) preloader.parentNode.removeChild(preloader);
    }, 600);
  }

  if (reduceMotion || !preloader) {
    document.body.classList.remove('is-loading');
    document.body.classList.add('ready');
    if (preloader && preloader.parentNode) preloader.parentNode.removeChild(preloader);
  } else {
    window.addEventListener('load', function () {
      // a marca e a onda entram por CSS; aqui só damos o tempo de saída
      window.setTimeout(endPreloader, 1450);
    });
    // rede de segurança caso o load demore
    window.setTimeout(endPreloader, 4500);
  }

  /* ---------- Header ao rolar ---------- */
  var header = document.querySelector('.site-header');
  var ticking = false;
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 48);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');

  function setMenu(open) {
    if (!toggle || !menu) return;
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    toggle.innerHTML = open
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      setMenu(!menu.classList.contains('is-open'));
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        setMenu(false);
        toggle.focus();
      }
    });
    var mqDesktop = window.matchMedia('(min-width: 901px)');
    var onMq = function (e) { if (e.matches) setMenu(false); };
    if (mqDesktop.addEventListener) mqDesktop.addEventListener('change', onMq);
    else if (mqDesktop.addListener) mqDesktop.addListener(onMq);
  }

  /* ---------- Reveals ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var siblings = el.parentNode ? el.parentNode.querySelectorAll(':scope > [data-reveal]') : [el];
        var idx = Array.prototype.indexOf.call(siblings, el);
        el.style.transitionDelay = (idx > 0 ? Math.min(idx * 0.08, 0.4) : 0) + 's';
        el.classList.add('is-visible');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.1 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Hero: vídeo de fundo em loop (só no layout split, desktop) ---------- */
  var heroVideo = document.querySelector('[data-hero-video]');
  var heroSection = document.querySelector('.hero');
  var heroSplit = window.matchMedia('(min-width: 901px)').matches;

  if (heroVideo && (reduceMotion || !heroSplit)) {
    // Menos movimento OU tela pequena: nem carrega o vídeo — o hero é a foto de
    // fundo. Remove o <video> para não baixar nada e não pesar no mobile.
    var media = heroVideo.closest('.hero__media');
    if (media && media.parentNode) media.parentNode.removeChild(media);
    else if (heroVideo.parentNode) heroVideo.parentNode.removeChild(heroVideo);
    heroVideo = null;
  }

  if (heroVideo) {
    var heroVideoSettled = false;

    var keepPoster = function () {
      if (heroVideoSettled) return;
      heroVideoSettled = true;
      // Sem fonte válida (arquivo ainda não existe, formato sem suporte, rede
      // falha): remove o painel de vídeo e mantém a foto de fundo, sem quebrar nada.
      var media = heroVideo.closest('.hero__media');
      if (media && media.parentNode) media.parentNode.removeChild(media);
      else if (heroVideo.parentNode) heroVideo.parentNode.removeChild(heroVideo);
      if (heroSection) heroSection.classList.remove('hero--video');
    };

    heroVideo.addEventListener('playing', function () {
      heroVideoSettled = true;
      heroVideo.classList.add('is-playing');
      if (heroSection) heroSection.classList.add('hero--video');
    });
    heroVideo.addEventListener('error', keepPoster);
    // Rede de segurança: se em 8s nada foi carregado (readyState 0), fica no poster.
    // Vídeo que está só bufferando (readyState > 0) é preservado.
    window.setTimeout(function () {
      if (!heroVideo || heroVideoSettled || heroVideo.readyState > 0) return;
      keepPoster();
    }, 8000);

    var startHeroVideo = function () {
      heroVideo.load();
      var r = heroVideo.play();
      if (r && typeof r.catch === 'function') {
        r['catch'](function () { /* autoplay pode ser bloqueado; poster permanece */ });
      }
    };

    var heroSources = [
      { src: 'assets/video/hero-video.webm', type: 'video/webm' },
      { src: 'assets/video/hero-video.mp4', type: 'video/mp4' }
    ];

    if (!window.fetch || !window.Promise) {
      // Navegador antigo: sem como checar o arquivo com segurança — fica no poster.
      keepPoster();
    } else {
      // Anexa cada fonte só se o arquivo responder 200. Um fetch para arquivo
      // inexistente resolve normalmente (sem erro no console), diferente de um
      // <source> no HTML, que dispara 404 visível enquanto o vídeo não existe.
      window.Promise.all(heroSources.map(function (s) {
        return window.fetch(s.src, { method: 'HEAD' })
          .then(function (res) { return res && res.ok ? s : null; })
          ['catch'](function () { return null; });
      })).then(function (found) {
        if (heroVideoSettled) return;
        var disponiveis = found.filter(Boolean);
        if (!disponiveis.length) { keepPoster(); return; }
        disponiveis.forEach(function (s) {
          var el = document.createElement('source');
          el.src = s.src;
          el.type = s.type;
          heroVideo.appendChild(el);
        });
        startHeroVideo();
      });
    }
  }

  /* ---------- Hero: parallax (entrada é feita por CSS) ---------- */
  if (hasGSAP && !reduceMotion && window.ScrollTrigger) {
    try {
      window.gsap.registerPlugin(window.ScrollTrigger);
      window.gsap.to('.hero__bg', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });
    } catch (err) { /* parallax é opcional */ }
  }

  /* ---------- Rolagem suave respeitando reduced-motion ---------- */
  if (!reduceMotion) {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var id = link.getAttribute('href');
        if (id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', id);
      });
    });
  }
})();
