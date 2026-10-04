/* CHEF JAY LeSOUL CATERING — script.js (v2) */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* header / progress / back-to-top */
  const header = $('#header'), progress = $('#progress'), toTop = $('#toTop');
  const onScroll = () => {
    const y = window.scrollY;
    header && header.classList.toggle('scrolled', y > 40);
    if (progress) { const h = document.documentElement.scrollHeight - innerHeight; progress.style.width = (h > 0 ? y / h * 100 : 0) + '%'; }
    toTop && toTop.classList.toggle('show', y > 600);
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  toTop && toTop.addEventListener('click', e => { e.preventDefault(); scrollTo({ top: 0, behavior: 'smooth' }); });

  /* mobile navigation */
  const nav = $('#nav'), toggle = $('#navToggle');
  if (nav && toggle) {
    const backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);
    const setNav = open => {
      nav.classList.toggle('open', open);
      backdrop.classList.toggle('show', open);
      document.body.classList.toggle('nav-lock', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); setNav(!nav.classList.contains('open')); });
    backdrop.addEventListener('click', () => setNav(false));
    $$('a', nav).forEach(a => a.addEventListener('click', () => setNav(false)));
    addEventListener('keydown', e => e.key === 'Escape' && setNav(false));
    addEventListener('resize', () => innerWidth > 991 && setNav(false));
  }

  /* active nav link */
  const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  $$('.nav-list a').forEach(a => { if (a.getAttribute('href').toLowerCase() === here) a.classList.add('active'); });

  /* reveal on scroll */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target; setTimeout(() => el.classList.add('in'), +el.dataset.delay || 0); io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else reveals.forEach(el => el.classList.add('in'));

  /* hero mosaic parallax (desktop only) */
  const mosaic = $('.hero-mosaic');
  if (mosaic && matchMedia('(hover:hover) and (min-width:992px)').matches) {
    const tiles = $$('.tri', mosaic);
    addEventListener('mousemove', e => {
      const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
      tiles.forEach((t, i) => { const d = (i % 3 + 1) * 4; t.style.transform = `translate(${x * d}px, ${y * d}px)`; });
    }, { passive: true });
  }

  /* gallery filter + lightbox */
  const gallery = $('#gallery');
  if (gallery) {
    const items = $$('.g-item', gallery);
    $$('.filter').forEach(btn => btn.addEventListener('click', () => {
      $$('.filter').forEach(b => b.classList.remove('active')); btn.classList.add('active');
      const f = btn.dataset.filter;
      items.forEach((it, i) => {
        const show = f === 'all' || it.dataset.cat === f;
        it.style.transition = 'none'; it.classList.toggle('hide', !show);
        if (show) { it.style.opacity = 0; it.style.transform = 'translateY(16px)';
          setTimeout(() => { it.style.transition = ''; it.style.opacity = ''; it.style.transform = ''; }, 30 + i * 30); }
      });
    }));
    const lb = document.createElement('div'); lb.className = 'lightbox';
    lb.innerHTML = '<button class="lb-btn lb-close" aria-label="Close">×</button><button class="lb-btn lb-prev" aria-label="Previous">‹</button><img alt=""><button class="lb-btn lb-next" aria-label="Next">›</button><div class="lb-cap"></div>';
    document.body.appendChild(lb);
    const lbImg = $('img', lb), lbCap = $('.lb-cap', lb); let idx = 0;
    const visible = () => items.filter(i => !i.classList.contains('hide'));
    const show = i => { const l = visible(); idx = (i + l.length) % l.length; const it = l[idx]; lbImg.src = it.href; lbImg.alt = $('img', it).alt; lbCap.textContent = $('span', it).textContent; };
    const open = i => { show(i); lb.classList.add('open'); document.body.classList.add('nav-lock'); };
    const close = () => { lb.classList.remove('open'); document.body.classList.remove('nav-lock'); };
    items.forEach(it => it.addEventListener('click', e => { e.preventDefault(); open(visible().indexOf(it)); }));
    $('.lb-close', lb).addEventListener('click', close);
    $('.lb-prev', lb).addEventListener('click', () => show(idx - 1));
    $('.lb-next', lb).addEventListener('click', () => show(idx + 1));
    lb.addEventListener('click', e => e.target === lb && close());
    addEventListener('keydown', e => { if (!lb.classList.contains('open')) return; if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') show(idx - 1); if (e.key === 'ArrowRight') show(idx + 1); });
    let sx = 0;
    lb.addEventListener('touchstart', e => sx = e.touches[0].clientX, { passive: true });
    lb.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1)); });
  }

  /* contact form → opens email app pre-filled */
  const form = $('#contactForm');
  if (form) {
    const pre = new URLSearchParams(location.search).get('type'), sel = $('#type');
    if (pre && sel && [...sel.options].some(o => o.value === pre)) sel.value = pre;
    form.addEventListener('submit', e => {
      e.preventDefault(); let ok = true;
      $$('[required]', form).forEach(f => {
        const valid = f.type === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value) : f.value.trim() !== '';
        f.closest('.field').classList.toggle('error', !valid); if (!valid) ok = false;
      });
      if (!ok) return;
      const d = Object.fromEntries(new FormData(form)), typeText = sel.options[sel.selectedIndex].text;
      const subject = encodeURIComponent(`Event Inquiry — ${typeText} — ${d.name}`);
      const body = encodeURIComponent(`Name: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone}\nEvent Type: ${typeText}\n\nMessage:\n${d.message}`);
      location.href = `mailto:hello@chefjaylesoul.com?subject=${subject}&body=${body}`;
      $('#formSuccess').classList.add('show'); form.reset();
    });
    $$('input,select,textarea', form).forEach(f => f.addEventListener('input', () => f.closest('.field').classList.remove('error')));
  }

  /* footer year + reliable muted autoplay */
  const yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();
  $$('video[autoplay]').forEach(v => { v.muted = true; const p = v.play(); p && p.catch(() => {}); });
})();