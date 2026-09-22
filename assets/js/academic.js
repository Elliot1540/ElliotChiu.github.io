/* Progressive enhancement: readable English content remains available without JS. */
(() => {
  'use strict';
  const dictionary = window.academicTranslations || {};
  const picker = document.querySelector('#site-language');
  const supported = ['en', 'zh-Hans', 'zh-Hant'];
  let language = 'en';
  try { language = localStorage.getItem('academic-language') || 'en'; } catch (_) {}
  if (!supported.includes(language)) language = 'en';
  const textRecords = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentElement.closest('script, style, select, [data-localized], .citation')) continue;
    const key = node.textContent.trim();
    if (dictionary[key]) textRecords.push({node, key, original: node.textContent});
  }
  const attributeRecords = [];
  document.querySelectorAll('[aria-label], [alt]').forEach(element => {
    ['aria-label', 'alt'].forEach(attribute => {
      const key = element.getAttribute(attribute);
      if (dictionary[key]) attributeRecords.push({element, attribute, key});
    });
  });
  const translate = key => dictionary[key]?.[language] || key;
  const localized = (element, attribute) => {
    try { const values = JSON.parse(element.getAttribute(attribute)); return values[language] || values.en || ''; }
    catch (_) { return ''; }
  };
  const originalTitle = document.title;
  function applyLanguage() {
    document.title = originalTitle.split(' · ').map(translate).join(' · ');
    document.documentElement.lang = language;
    if (picker) picker.value = language;
    textRecords.forEach(({node, key, original}) => { node.textContent = original.replace(key, translate(key)); });
    attributeRecords.forEach(({element, attribute, key}) => element.setAttribute(attribute, translate(key)));
    document.querySelectorAll('[data-localized]').forEach(element => { element.textContent = localized(element, 'data-localized'); });
    document.querySelectorAll('[data-localized-alt]').forEach(element => element.setAttribute('alt', localized(element, 'data-localized-alt')));
    document.dispatchEvent(new Event('academic:language'));
  }
  picker?.addEventListener('change', () => {
    language = supported.includes(picker.value) ? picker.value : 'en';
    try { localStorage.setItem('academic-language', language); } catch (_) {}
    applyLanguage();
  });
  document.querySelectorAll('.exchange-carousel').forEach(carousel => {
    const slides = [...carousel.querySelectorAll('.exchange-slide')];
    const controls = carousel.querySelector('.carousel-controls');
    const play = controls.querySelector('[data-action="play"]');
    const count = controls.querySelector('.carousel-count');
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const progress = carousel.querySelector('.carousel-progress');
    const fill = progress.querySelector('span');
    let index = 0, playing = !motion.matches, elapsed = 0, last = null;
    let inView = false, hovered = false, focusPaused = false, pointer = false;
    if (!slides.length) { carousel.hidden = true; return; }
    controls.hidden = progress.hidden = slides.length < 2;
    function label() {
      play.textContent = translate(playing ? 'Pause slideshow' : 'Play slideshow');
      play.setAttribute('aria-pressed', String(playing));
      count.setAttribute('aria-live', playing ? 'off' : 'polite');
    }
    function show(next) {
      index = (next + slides.length) % slides.length;
      slides.forEach((slide, i) => { slide.hidden = i !== index; });
      count.textContent = `${index + 1} / ${slides.length}`;
      elapsed = 0;
      fill.style.transform = 'scaleX(0)';
    }
    function tick(now) {
      const running = playing && slides.length > 1 && inView && !document.hidden && !hovered && !focusPaused;
      if (running && last !== null) {
        elapsed += now - last;
        if (elapsed >= 4000) show(index + 1);
        fill.style.transform = `scaleX(${elapsed / 4000})`;
      }
      last = now;
      requestAnimationFrame(tick);
    }
    new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting; last = null;
    }).observe(carousel);
    controls.addEventListener('click', event => {
      const action = event.target.closest('button')?.dataset.action;
      if (!action) return;
      if (action === 'play') { playing = !playing; focusPaused = false; }
      else show(index + (action === 'next' ? 1 : -1));
      label(); last = null;
    });
    carousel.addEventListener('keydown', event => {
      if (!['ArrowLeft','ArrowRight'].includes(event.key)) return;
      event.preventDefault(); show(index + (event.key === 'ArrowRight' ? 1 : -1));
    });
    carousel.addEventListener('mouseenter', () => { hovered = true; });
    carousel.addEventListener('mouseleave', () => { hovered = false; last = null; });
    carousel.addEventListener('pointerdown', () => { pointer = true; });
    carousel.addEventListener('pointerup', () => { setTimeout(() => { pointer = false; }, 0); });
    carousel.addEventListener('focusin', () => { if (!pointer) focusPaused = true; });
    carousel.addEventListener('focusout', () => {
      setTimeout(() => { if (!carousel.contains(document.activeElement)) focusPaused = false; }, 0);
    });
    document.addEventListener('visibilitychange', () => { last = null; });
    motion.addEventListener('change', () => { if (motion.matches) playing = false; label(); });
    document.addEventListener('academic:language', label);
    requestAnimationFrame(tick);
    carousel.querySelectorAll('img').forEach(img => img.addEventListener('error', () => {
      const fallback = document.createElement('div'); fallback.className = 'exchange-placeholder';
      fallback.dataset.localized = JSON.stringify(dictionary['Photo collection coming soon.']);
      fallback.textContent = translate('Photo collection coming soon.'); img.replaceWith(fallback);
    }));
    show(0); label();
  });
  applyLanguage();
})();
