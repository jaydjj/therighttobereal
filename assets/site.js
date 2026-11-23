// Old one-page anchors (/#menu, /#regulars...) now point to their calendar entries.
(function () {
  var moved = { '#menu': '/#march', '#regulars': '/#the-resistance', '#january': '/#keep-the-change', '#rules': '/#principles', '#mission': '/#why', '#join': '/#blackout' };
  if ((location.pathname === '/' || location.pathname === '/index.html') && moved[location.hash]) {
    location.replace(moved[location.hash]);
  }
})();

// Pledge: the live count toward the goal ("72/100"), then a one-tap pledge that adds one straight away.
// After pledging: optional email reminders and the poll. Pledges, poll answers and emails go to the Google Sheet
// web app in data-endpoint (see tools/pledge-sheet.gs). Typing an email and pressing "Send me reminders" is the opt-in.
(function () {
  var card = document.getElementById('join');
  var btn = document.getElementById('pledge-btn');
  var more = document.getElementById('step-more');
  var first = document.getElementById('step-pledge');
  var note = document.getElementById('join-note');
  if (!card || !btn || !more) return;
  var endpoint = card.getAttribute('data-endpoint') || '';
  var goal = parseInt(card.getAttribute('data-goal'), 10) || 100;
  var base = parseInt(card.getAttribute('data-start'), 10) || 0;
  var num = document.getElementById('count-number');
  var fill = document.getElementById('count-fill');
  var shown = base, live = null, visible = false;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function deviceId() {
    var id = store('rtbr-id');
    if (!id) { id = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2)); store('rtbr-id', id); }
    return id;
  }

  // Counts up from what's on screen to the live number, once the counter is in view.
  function render() {
    if (live === null || !visible) return;
    var n = live, from = shown, start = null, dur = reduce ? 0 : (n - from > 5 ? 1200 : 500);
    shown = n;
    fill.style.width = Math.min(100, n / goal * 100) + '%';
    function step(t) {
      if (start === null) start = t;
      var p = dur ? Math.min(1, (t - start) / dur) : 1;
      num.textContent = Math.round(from + (n - from) * (1 - Math.pow(1 - p, 3))).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function setCount(n) { if (typeof n === 'number') n += base; if (typeof n === 'number' && n >= (live || 0)) { live = n; render(); } }
  function send(params) {
    if (!endpoint) return Promise.resolve(null);
    params.id = deviceId();
    return fetch(endpoint, { method: 'POST', body: new URLSearchParams(params) })
      .then(function (r) { return r.json(); }).then(function (d) { if (d) setCount(d.count); return d; })
      .catch(function () { return null; });
  }
  function pledged() {
    first.hidden = true;
    more.hidden = false;
    var choice = store('rtbr-poll');
    if (choice) { var r = card.querySelector('input[name="poll"][value="' + choice + '"]'); if (r) r.checked = true; }
  }

  var counter = document.getElementById('pledge-count');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { io.disconnect(); visible = true; render(); } }, { threshold: .4 });
    io.observe(counter);
  } else visible = true;
  if (endpoint) fetch(endpoint).then(function (r) { return r.json(); }).then(function (d) { setCount(d.count); }).catch(function () {});
  if (endpoint && store('rtbr-pledged')) pledged();

  btn.addEventListener('click', function () {
    var already = store('rtbr-pledged');
    pledged();
    document.getElementById('join-title').focus();
    if (!already) { store('rtbr-pledged', '1'); if (live !== null) setCount(live - base + 1); }
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
