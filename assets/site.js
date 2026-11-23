// Old one-page anchors (/#menu, /#regulars...) now point to their calendar entries.
(function () {
  var moved = { '#menu': '/#march', '#regulars': '/#the-resistance', '#january': '/#keep-the-change', '#rules': '/#principles', '#mission': '/#why', '#join': '/#blackout' };
  if ((location.pathname === '/' || location.pathname === '/index.html') && moved[location.hash]) {
    location.replace(moved[location.hash]);
  }
})();

// Pledge panel. A live counter beside a one-tap pledge; after pledging, the poll and optional email.
// Pledges, poll answers and emails go to the Google Sheet web app in data-endpoint (see tools/pledge-sheet.gs).
// Typing an email and pressing "Send me reminders" is the opt-in; the Sheet records the time and wording.
(function () {
  var card = document.getElementById('join');
  var btn = document.getElementById('pledge-btn');
  var more = document.getElementById('step-more');
  var first = document.getElementById('step-pledge');
  var note = document.getElementById('join-note');
  if (!card || !btn || !more) return;
  var endpoint = card.getAttribute('data-endpoint') || '';
  var showAt = parseInt(card.getAttribute('data-show-at'), 10) || 72;
  var GOAL = 1000;
  var shown = 0;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function deviceId() {
    var id = store('rtbr-id');
    if (!id) { id = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2)); store('rtbr-id', id); }
    return id;
  }

  // Counter: hidden until the count reaches showAt, then counts up to the live number.
  function showCount(n) {
    if (typeof n !== 'number' || n < showAt) return;
    var num = document.getElementById('count-number');
    document.getElementById('count-label').textContent = 'Pledged so far';
    document.getElementById('count-sub').textContent = n >= GOAL ? 'We passed our first 1,000.' : 'Toward our first 1,000.';
    var bar = document.getElementById('count-bar'); bar.hidden = false;
    document.getElementById('count-fill').style.width = Math.min(100, n / GOAL * 100) + '%';
    var from = shown, start = null, dur = reduce ? 0 : 1200;
    shown = n;
    function step(t) {
      if (start === null) start = t;
      var p = dur ? Math.min(1, (t - start) / dur) : 1;
      var eased = 1 - Math.pow(1 - p, 3);
      num.textContent = Math.round(from + (n - from) * eased).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function send(params) {
    if (!endpoint) return Promise.resolve(null);
    params.id = deviceId();
    return fetch(endpoint, { method: 'POST', body: new URLSearchParams(params) })
      .then(function (r) { return r.json(); }).then(function (d) { if (d) showCount(d.count); return d; })
      .catch(function () { return null; });
  }
  function pledged() {
    first.hidden = true;
    more.hidden = false;
    document.getElementById('join-title').innerHTML = 'You\'re <em>in.</em>';
    var choice = store('rtbr-poll');
    if (choice) { var r = card.querySelector('input[name="poll"][value="' + choice + '"]'); if (r) r.checked = true; }
  }

  more.hidden = true;
  if (endpoint) {
    var counter = document.getElementById('pledge-count');
    var load = function () { fetch(endpoint).then(function (r) { return r.json(); }).then(function (d) { showCount(d.count); }).catch(function () {}); };
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { io.disconnect(); load(); } }, { threshold: .4 });
      io.observe(counter);
    } else load();
  }
  if (endpoint && store('rtbr-pledged')) pledged();

  btn.addEventListener('click', function () {
    pledged();
    document.getElementById('join-title').focus();
    store('rtbr-pledged', '1');
    send({ action: 'pledge' });
  });
  card.querySelectorAll('input[name="poll"]').forEach(function (r) {
    r.addEventListener('change', function () {
      store('rtbr-poll', r.value);
      if (endpoint) { send({ action: 'poll', choice: r.value }); note.textContent = 'Thanks for voting.'; }
      else note.textContent = 'Thanks for voting. Pledges and the poll open January 2027, so nothing is saved yet.';
    });
  });
  document.getElementById('join-email').addEventListener('submit', function (e) {
    e.preventDefault();
    var input = document.getElementById('join-email-input');
    var email = input.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { note.textContent = 'Please enter a valid email address.'; input.focus(); return; }
    if (!endpoint) { note.textContent = 'Thanks. Email reminders aren\'t switched on yet, so we haven\'t saved your address.'; return; }
    var submit = this.querySelector('button[type="submit"]');
    if (submit.disabled) return;
    submit.disabled = true;
    submit.textContent = 'Sending…';
    note.textContent = 'Saving your email…';
    send({ action: 'email', email: email, consent: 'yes' }).then(function (d) {
      submit.disabled = false;
      submit.textContent = 'Send me reminders';
      if (d && d.ok) {
        note.textContent = 'Thanks. We\'ll email you before March 8. Unsubscribe any time.';
        input.value = '';
      } else {
        note.innerHTML = 'Sorry, that didn\'t go through. Please try again, or <a href="https://www.instagram.com/therighttobereal/" target="_blank" rel="noopener">message us on Instagram</a>.';
      }
    });
  });
})();
