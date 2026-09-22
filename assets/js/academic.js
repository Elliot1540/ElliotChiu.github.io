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
    let index = 0, playing = false, timer;
    if (!slides.length) { carousel.hidden = true; return; }
    controls.hidden = slides.length < 2;
    function label() { play.textContent = translate(playing ? 'Pause slideshow' : 'Play slideshow'); play.setAttribute('aria-pressed', String(playing)); }
    function show(next) {
      index = (next + slides.length) % slides.length;
      slides.forEach((slide, i) => { slide.hidden = i !== index; });
      count.textContent = `${index + 1} / ${slides.length}`;
    }
    function schedule() {
      clearInterval(timer);
      if (playing && !motion.matches && !document.hidden && !carousel.matches(':hover')) timer = setInterval(() => show(index + 1), 6000);
    }
    controls.addEventListener('click', event => {
      const action = event.target.closest('button')?.dataset.action;
      if (!action) return;
      if (action === 'play') playing = !playing;
      else { playing = false; show(index + (action === 'next' ? 1 : -1)); }
      label(); schedule();
    });
    carousel.addEventListener('keydown', event => {
      if (!['ArrowLeft','ArrowRight'].includes(event.key)) return;
      event.preventDefault(); playing = false; show(index + (event.key === 'ArrowRight' ? 1 : -1)); label(); schedule();
    });
    ['mouseenter','mouseleave'].forEach(event => carousel.addEventListener(event, schedule));
    carousel.addEventListener('focusin', event => { if (event.target !== play) { playing = false; label(); schedule(); } });
    carousel.addEventListener('focusout', () => setTimeout(schedule, 0));
    document.addEventListener('visibilitychange', schedule);
    motion.addEventListener('change', () => { if (motion.matches) playing = false; label(); schedule(); });
    document.addEventListener('academic:language', label);
    carousel.querySelectorAll('img').forEach(img => img.addEventListener('error', () => {
      const fallback = document.createElement('div'); fallback.className = 'exchange-placeholder';
      fallback.dataset.localized = JSON.stringify(dictionary['Photo collection coming soon.']);
      fallback.textContent = translate('Photo collection coming soon.'); img.replaceWith(fallback);
    }));
    show(0); label();
  });
  applyLanguage();
})();
