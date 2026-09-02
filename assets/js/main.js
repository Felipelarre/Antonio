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
