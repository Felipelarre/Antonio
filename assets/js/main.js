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

  if (reduceMotion || !revealEls.length) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else if (hasGSAP && window.ScrollTrigger) {
    // Reveal de verdade via GSAP + ScrollTrigger: agrupa por pai (cada
    // grade/coluna vira seu próprio grupo) e usa ScrollTrigger.batch pra
    // escalonar a entrada de quem chega junto na tela, em vez do delay
    // manual por índice que a versão só-CSS usava.
    window.gsap.registerPlugin(window.ScrollTrigger);
    var revealParents = [];
    revealEls.forEach(function (el) {
      if (revealParents.indexOf(el.parentNode) === -1) revealParents.push(el.parentNode);
    });
    revealParents.forEach(function (parent) {
      var group = Array.prototype.slice.call(parent.querySelectorAll(':scope > [data-reveal]'));
      window.ScrollTrigger.batch(group, {
        start: 'top 88%',
        once: true,
        onEnter: function (batch) {
          window.gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08 });
        }
      });
    });
  } else if ('IntersectionObserver' in window) {
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
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Estrelas da seção Avaliações: entrada em cascata ---------- */
  var starEls = Array.prototype.slice.call(document.querySelectorAll('.rating-stars span'));
  if (starEls.length) {
    if (reduceMotion || !(hasGSAP && window.ScrollTrigger)) {
      // sem GSAP ou com reduced-motion, as estrelas já aparecem pelo reveal do pai
    } else {
      window.gsap.set(starEls, { opacity: 0, scale: .4, transformOrigin: '50% 50%' });
      window.ScrollTrigger.batch(starEls, {
        start: 'top 88%',
        once: true,
        onEnter: function (batch) {
          // delay pra deixar o bloco (kicker+título) do reveal do pai entrar
          // primeiro — as estrelas "estalam" em seguida, não junto.
          window.gsap.to(batch, { opacity: 1, scale: 1, duration: .4, ease: 'back.out(2.6)', stagger: .08, delay: .35 });
        }
      });
    }
  }

  /* ---------- Hero: vídeo de fundo em loop ---------- */
  var heroVideo = document.querySelector('[data-hero-video]');
  var heroSection = document.querySelector('.hero');

  if (heroVideo && reduceMotion) {
    // Em modo de movimento reduzido, mantém a foto para evitar movimento no hero.
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

    // Pequeno backoff entre novas tentativas do HEAD (em ms). O tamanho do
    // array é o número de novas tentativas após a 1ª (2 aqui = 3 no total).
    var HERO_HEAD_RETRY_DELAYS = [400, 900];

    function tentarNovamente(s, tentativa) {
      if (tentativa >= HERO_HEAD_RETRY_DELAYS.length) return null; // esgotou — aí sim fica no poster
      return new window.Promise(function (resolve) {
        window.setTimeout(function () {
          resolve(checarFonte(s, tentativa + 1));
        }, HERO_HEAD_RETRY_DELAYS[tentativa]);
      });
    }

    // 404 é resposta definitiva (o arquivo realmente não existe) — não adianta
    // tentar de novo. Qualquer outro status não-OK (5xx da CDN, por exemplo,
    // que o GitHub Pages às vezes retorna de forma transitória em arquivos
    // grandes) ou falha de rede é tratado como transitório e ganha retry.
    function checarFonte(s, tentativa) {
      return window.fetch(s.src, { method: 'HEAD' })
        .then(function (res) {
          if (res && res.ok) return s;
          if (res && res.status === 404) return null;
          return tentarNovamente(s, tentativa);
        })
        ['catch'](function () { return tentarNovamente(s, tentativa); });
    }

    if (!window.fetch || !window.Promise) {
      // Navegador antigo: sem como checar o arquivo com segurança — fica no poster.
      keepPoster();
    } else {
      // Anexa cada fonte só se o arquivo responder 200 (com retry acima para
      // erro transitório). Um fetch para arquivo inexistente resolve
      // normalmente (sem erro no console), diferente de um <source> no HTML,
      // que dispara 404 visível enquanto o vídeo não existe.
      window.Promise.all(heroSources.map(function (s) {
        return checarFonte(s, 0);
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

  /* ---------- Reserva: comanda ao vivo + envio pelo WhatsApp ---------- */
  var rsvForm = document.getElementById('rsv-form');
  if (rsvForm) {
    var rsvDataInput = document.getElementById('rsv-data');
    if (rsvDataInput) rsvDataInput.min = new Date().toISOString().slice(0, 10);

    var rsvOcasiaoInput = document.getElementById('rsv-ocasiao');
    var rsvOcasiaoBtns = Array.prototype.slice.call(document.querySelectorAll('#rsv-occasions .rsv-occ'));
    rsvOcasiaoBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var jaAtivo = btn.classList.contains('is-active');
        rsvOcasiaoBtns.forEach(function (b) {
          b.classList.remove('is-active');
          b.setAttribute('aria-pressed', 'false');
        });
        if (!jaAtivo) {
          btn.classList.add('is-active');
          btn.setAttribute('aria-pressed', 'true');
        }
        rsvOcasiaoInput.value = jaAtivo ? '' : btn.dataset.value;
        atualizarComanda();
      });
    });

    function formatarData(valor) {
      if (!valor) return '';
      var partes = valor.split('-');
      return partes.length === 3 ? partes[2] + '/' + partes[1] + '/' + partes[0] : valor;
    }

    function atualizarComanda() {
      var campos = {
        nome: document.getElementById('rsv-nome').value,
        whatsapp: document.getElementById('rsv-whats').value,
        data: formatarData(rsvDataInput.value),
        horario: document.getElementById('rsv-horario').value,
        pessoas: document.getElementById('rsv-pessoas').value,
        ocasiao: rsvOcasiaoInput.value
      };
      Object.keys(campos).forEach(function (chave) {
        var alvo = document.querySelector('[data-preview="' + chave + '"]');
        if (alvo) alvo.textContent = campos[chave] || '–';
      });
    }

    rsvForm.addEventListener('input', atualizarComanda);
    rsvForm.addEventListener('change', atualizarComanda);

    rsvForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!rsvForm.reportValidity()) return;

      var linhas = [
        'Olá! Quero fazer uma reserva no Seu Antônio:',
        '',
        'Nome: ' + document.getElementById('rsv-nome').value,
        'WhatsApp: ' + document.getElementById('rsv-whats').value,
        'Data: ' + formatarData(rsvDataInput.value),
        'Horário: ' + document.getElementById('rsv-horario').value,
        'Pessoas: ' + document.getElementById('rsv-pessoas').value
      ];
      if (rsvOcasiaoInput.value) linhas.push('Ocasião: ' + rsvOcasiaoInput.value);
      var obs = document.getElementById('rsv-obs').value.trim();
      if (obs) linhas.push('Observações: ' + obs);

      var url = 'https://wa.me/5581979039543?text=' + encodeURIComponent(linhas.join('\n'));
      window.open(url, '_blank', 'noopener');
    });
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
