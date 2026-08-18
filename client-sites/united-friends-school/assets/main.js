/* United Friends School — shared site script (prototype) */
(function () {
  // --- Logo (sunrise + rolling hills + rainbow arc) ---
  var LOGO =
    '<svg viewBox="0 0 120 96" aria-hidden="true">' +
    '<g fill="none" stroke-width="6" stroke-linecap="round">' +
    '<path d="M12 72 A48 48 0 0 1 108 72" stroke="#C9633B"/>' +
    '<path d="M22 72 A38 38 0 0 1 98 72" stroke="#F2B134"/>' +
    '<path d="M32 72 A28 28 0 0 1 88 72" stroke="#2E6E50"/>' +
    '<path d="M42 72 A18 18 0 0 1 78 72" stroke="#2FA4B8"/></g>' +
    '<circle cx="60" cy="72" r="11" fill="#F2B134"/>' +
    '<path d="M0 74 Q26 60 52 72 Q80 84 120 70 V96 H0 Z" fill="#2E6E50"/>' +
    '<path d="M0 82 Q34 72 66 82 Q94 90 120 80 V96 H0 Z" fill="#234F3B"/></svg>';

  // --- Icon library (inner SVG markup; stroke uses currentColor) ---
  var P = function (d) { return '<path d="' + d + '"/>'; };
  var STROKE =
    'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  var ICONS = {
    sunrise: P('M3 18h18') + P('M5 18a7 7 0 0 1 14 0') + P('M12 3v3') + P('M5.6 9.6l1.4 1.4') + P('M18.4 9.6l-1.4 1.4') + P('M2 14h2') + P('M20 14h2'),
    child: '<circle cx="12" cy="6" r="3" ' + STROKE + '/>' + P('M12 9v7') + P('M8 13l4-2 4 2') + P('M9 21l3-5 3 5'),
    leaf: P('M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z') + P('M2 21c0-3 1.85-5.36 5.08-6'),
    award: '<circle cx="12" cy="8" r="6" ' + STROKE + '/>' + P('M8.21 13.89 7 23l5-3 5 3-1.21-9.12'),
    peace: '<circle cx="12" cy="12" r="9" ' + STROKE + '/>' + P('M12 3v18') + P('M12 12l-6 6') + P('M12 12l6 6'),
    users: P('M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2') + '<circle cx="9" cy="7" r="4" ' + STROKE + '/>' + P('M23 21v-2a4 4 0 0 0-3-3.87') + P('M16 3.13a4 4 0 0 1 0 7.75'),
    scale: P('M12 3v18') + P('M5 21h14') + P('M7 7l-4 7a4 4 0 0 0 8 0L7 7z') + P('M17 7l-4 7a4 4 0 0 0 8 0l-4-7z') + P('M7 7l10-2'),
    globe: '<circle cx="12" cy="12" r="9" ' + STROKE + '/>' + P('M3 12h18') + P('M12 3a15 15 0 0 1 0 18') + P('M12 3a15 15 0 0 0 0 18'),
    shield: P('M12 3l8 4v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V7l8-4z') + P('M9 12l2 2 4-4'),
    simplicity: '<circle cx="12" cy="12" r="9" ' + STROKE + '/>' + P('M8.5 12h7'),
    mail: P('M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z') + P('M3.5 6.5 12 13l8.5-6.5'),
    edit: P('M11 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-6') + P('M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z'),
    heart: P('M20.84 4.6a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.07a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.85a5.5 5.5 0 0 0 0-7.78z'),
    pin: P('M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z') + '<circle cx="12" cy="10" r="3" ' + STROKE + '/>',
    phone: P('M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z'),
    check: P('M20 6 9 17l-5-5'),
    star: P('M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 18.9 6.1 21l1.2-6.5L2.5 9.9l6.6-.9z'),
    flask: P('M9 3h6') + P('M10 3v6.5L5.2 18A2 2 0 0 0 7 21h10a2 2 0 0 0 1.8-3L14 9.5V3') + P('M8.5 14h7'),
    activity: P('M22 12h-4l-3 9L9 3l-3 9H2'),
    music: P('M9 18V5l12-2v13') + '<circle cx="6" cy="18" r="3" ' + STROKE + '/>' + '<circle cx="18" cy="16" r="3" ' + STROKE + '/>',
    calendar: P('M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z') + P('M16 3v4') + P('M8 3v4') + P('M4 10h16'),
    bus: P('M5 5h14a2 2 0 0 1 2 2v8H3V7a2 2 0 0 1 2-2z') + P('M3 11h18') + '<circle cx="7.5" cy="17.5" r="1.5" ' + STROKE + '/>' + '<circle cx="16.5" cy="17.5" r="1.5" ' + STROKE + '/>',
    book: P('M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z') + P('M4 19a2 2 0 0 1 2-2h13'),
    palette: '<circle cx="12" cy="12" r="9" ' + STROKE + '/>' + '<circle cx="8" cy="9" r="1.2" fill="currentColor" stroke="none"/>' + '<circle cx="12.5" cy="7.5" r="1.2" fill="currentColor" stroke="none"/>' + '<circle cx="16" cy="10.5" r="1.2" fill="currentColor" stroke="none"/>' + P('M12 21a3 3 0 0 1 0-6 2 2 0 0 0 0-4'),
    facebook: '<path fill="currentColor" stroke="none" d="M13.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.2-1.4 1.4-1.4h1.5V5.5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2H8.2V14h2.3v7z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5" ' + STROKE + '/>' + '<circle cx="12" cy="12" r="4" ' + STROKE + '/>' + '<circle cx="17" cy="7" r="1.2" fill="currentColor" stroke="none"/>',
    youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="4" ' + STROKE + '/>' + '<path fill="currentColor" stroke="none" d="M10 9.2l5 2.8-5 2.8z"/>',
    sun: '<circle cx="12" cy="12" r="4.5" ' + STROKE + '/>' + P('M12 2v2') + P('M12 20v2') + P('M4 12H2') + P('M22 12h-2') + P('M5.6 5.6 4.2 4.2') + P('M19.8 19.8l-1.4-1.4') + P('M18.4 5.6l1.4-1.4') + P('M4.2 19.8l1.4-1.4'),
    tent: P('M12 3 3 20h18z') + P('M12 3v17') + P('M12 12l5 8') + P('M12 12l-5 8')
  };

  function svg(name) {
    if (!ICONS[name]) return '';
    return '<svg viewBox="0 0 24 24" ' + STROKE + '>' + ICONS[name] + '</svg>';
  }

  function inject() {
    document.querySelectorAll('.logo-mark').forEach(function (el) { el.innerHTML = LOGO; });
    document.querySelectorAll('[data-icon]').forEach(function (el) {
      var n = el.getAttribute('data-icon');
      if (n && ICONS[n]) el.innerHTML = svg(n);
    });
  }

  function nav() {
    var header = document.getElementById('header');
    if (!header) return;
    addEventListener('scroll', function () { header.classList.toggle('scrolled', scrollY > 8); });
    var burger = document.getElementById('burger');
    if (burger) burger.addEventListener('click', function () { header.classList.toggle('open'); });
    // Mobile: tapping a parent with submenu expands it instead of navigating
    document.querySelectorAll('.navitem.has-sub > a').forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (matchMedia('(max-width:920px)').matches) {
          e.preventDefault();
          a.parentElement.classList.toggle('open');
        }
      });
    });
  }

  function reveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .12 });
    els.forEach(function (el) { io.observe(el); });
  }

  function forms() {
    document.querySelectorAll('form[data-demo]').forEach(function (f) {
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        var btn = f.querySelector('button[type=submit]');
        if (btn) btn.style.display = 'none';
        var ok = f.querySelector('.ok');
        if (ok) ok.style.display = 'block';
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () { inject(); nav(); reveal(); forms(); });
})();
