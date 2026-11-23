// Old one-page anchors (/#menu, /#regulars...) now point to their calendar entries.
(function () {
  var moved = { '#menu': '/#march', '#regulars': '/#the-resistance', '#january': '/#keep-the-change', '#rules': '/#principles', '#mission': '/#why', '#join': '/#blackout' };
  if ((location.pathname === '/' || location.pathname === '/index.html') && moved[location.hash]) {
    location.replace(moved[location.hash]);
  }
})();

function rtbrStore(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
function rtbrId() {
  var id = rtbrStore('rtbr-id');
  if (!id) { id = (window.crypto && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2)); rtbrStore('rtbr-id', id); }
  return id;
}
// Posts to the Google Sheet web app (tools/pledge-sheet.gs). Resolves to the JSON reply, or null.
function rtbrSend(endpoint, params) {
  if (!endpoint) return Promise.resolve(null);
  params.id = rtbrId();
  return fetch(endpoint, { method: 'POST', body: new URLSearchParams(params) })
    .then(function (r) { return r.json(); }).catch(function () { return null; });
}

// Pledge: the live count ("74/1,000 pledges": pledge_start plus the Sheet's pledges), the choice, then Pledge.
// The form always stays. Each pledge adds one straight away (pledging again counts again) and shows a
// temporary line pointing to the email sign-up in the footer.
(function () {
  var card = document.getElementById('join');
  var form = document.getElementById('step-pledge');
  if (!card || !form) return;
  var endpoint = card.getAttribute('data-endpoint') || '';
  var goal = parseInt(card.getAttribute('data-goal'), 10) || 1000;
  var base = parseInt(card.getAttribute('data-start'), 10) || 0;
  var num = document.getElementById('count-number');
  var fill = document.getElementById('count-fill');
  var note = document.getElementById('join-note');
  var doneLine = document.getElementById('join-done');
  var shown = base, live = null, visible = false, timer;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById('count-goal').textContent = goal.toLocaleString();

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
  function setLive(n) { if (n >= (live || 0)) { live = n; render(); } }
  function hideDone() { doneLine.classList.add('fading'); timer = setTimeout(function () { doneLine.hidden = true; doneLine.classList.remove('fading'); }, 600); }

  var counter = document.getElementById('pledge-count');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { io.disconnect(); visible = true; render(); } }, { threshold: .4 });
    io.observe(counter);
  } else visible = true;
  if (endpoint) fetch(endpoint).then(function (r) { return r.json(); }).then(function (d) { if (typeof d.count === 'number') setLive(base + d.count); }).catch(function () {});
  else setLive(base);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var choice = form.querySelector('input[name="poll"]:checked');
    if (!choice) { note.textContent = 'Choose March 8 or the whole month, then pledge.'; return; }
    note.textContent = endpoint ? '' : 'Thanks. Pledges open January 2027, so nothing is saved yet.';
    setLive((live === null ? base : live) + 1);
    // Each pledge is its own row in the Sheet, so pledging again counts again.
    var id = window.crypto && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2);
    if (endpoint) fetch(endpoint, { method: 'POST', body: new URLSearchParams({ action: 'poll', choice: choice.value, id: id }) })
      .then(function (r) { return r.json(); }).then(function (d) { if (d && typeof d.count === 'number') setLive(base + d.count); }).catch(function () {});
    clearTimeout(timer);
    doneLine.classList.remove('fading');
    doneLine.hidden = false;
    timer = setTimeout(hideDone, 12000);
  });
  document.getElementById('done-link').addEventListener('click', function () {
    clearTimeout(timer); hideDone();
    setTimeout(function () { document.getElementById('join-email-input').focus({ preventScroll: true }); }, 400);
  });
})();

// Email sign-up in the footer. Typing an email and pressing "Sign up" is the opt-in; the Sheet saves the time and wording.
(function () {
  var form = document.getElementById('join-email');
  if (!form) return;
  var endpoint = form.getAttribute('data-endpoint') || '';
  var note = document.getElementById('email-note');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var input = document.getElementById('join-email-input');
    var email = input.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { note.textContent = 'Please enter a valid email address.'; input.focus(); return; }
    if (!endpoint) { note.textContent = 'Thanks. Email sign-up isn\'t switched on yet, so we haven\'t saved your address.'; return; }
    var submit = form.querySelector('button[type="submit"]');
    if (submit.disabled) return;
    submit.disabled = true;
    submit.textContent = 'Sending…';
    note.textContent = 'Saving your email…';
    rtbrSend(endpoint, { action: 'email', email: email, consent: 'yes' }).then(function (d) {
      submit.disabled = false;
      submit.textContent = 'Sign up';
      if (d && d.ok) {
        note.textContent = 'Thanks. You\'re signed up. Unsubscribe any time.';
        input.value = '';
      } else {
        note.innerHTML = 'Sorry, that didn\'t go through. Please try again, or <a href="https://www.instagram.com/therighttobereal/" target="_blank" rel="noopener">message us on Instagram</a>.';
      }
    });
  });
})();
