// Old one-page anchors (/#menu, /#regulars...) now point to their calendar entries.
(function () {
  var moved = { '#menu': '/#march', '#regulars': '/#the-resistance', '#january': '/#keep-the-change', '#rules': '/#principles', '#mission': '/#why', '#join': '/#blackout' };
  if ((location.pathname === '/' || location.pathname === '/index.html') && moved[location.hash]) {
    location.replace(moved[location.hash]);
  }
})();

// Pledge card. Step 1: one-tap pledge. Step 2: poll (one day or the whole month) + optional email.
// Pledges and poll answers go to the Google Sheet web app in data-endpoint (see tools/pledge-sheet.gs).
// With no endpoint set, nothing is sent or stored. Emails are not sent anywhere yet (Kit comes later).
(function () {
  var card = document.getElementById('join');
  var btn = document.getElementById('pledge-btn');
  var more = document.getElementById('step-more');
  var first = document.getElementById('step-pledge');
  var note = document.getElementById('join-note');
  var countEl = document.getElementById('join-count');
  if (!card || !btn || !more) return;
  var endpoint = card.getAttribute('data-endpoint') || '';
  var showAt = parseInt(card.getAttribute('data-show-at'), 10) || 72;

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function deviceId() {
    var id = store('rtbr-id');
    if (!id) { id = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2)); store('rtbr-id', id); }
    return id;
  }
  function showCount(n) {
    if (typeof n !== 'number' || n < showAt) return;
    countEl.textContent = n.toLocaleString() + ' of us have pledged · Goal: our first 1,000';
    countEl.hidden = false;
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
    var t = document.getElementById('join-title');
    if (t) t.innerHTML = 'You\'re <em>in.</em>';
    var choice = store('rtbr-poll');
    if (choice) { var r = card.querySelector('input[name="poll"][value="' + choice + '"]'); if (r) r.checked = true; }
  }

  more.hidden = true;
  if (endpoint) fetch(endpoint).then(function (r) { return r.json(); }).then(function (d) { showCount(d.count); }).catch(function () {});
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
    var consent = document.getElementById('join-consent');
    var email = input.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { note.textContent = 'Please enter a valid email address.'; input.focus(); return; }
    if (!consent.checked) { note.textContent = 'Please tick the box so we can email you.'; consent.focus(); return; }
    if (!endpoint) { note.textContent = 'Thanks. Email reminders aren\'t switched on yet, so we haven\'t saved your address.'; return; }
    send({ action: 'email', email: email, consent: 'yes' }).then(function (d) {
      if (d && d.ok) {
        note.textContent = 'Thanks. We\'ll email you before March 8. Unsubscribe any time.';
        input.value = ''; consent.checked = false;
      } else {
        note.innerHTML = 'Sorry, that didn\'t go through. Please try again, or <a href="https://www.instagram.com/therighttobereal/" target="_blank" rel="noopener">message us on Instagram</a>.';
      }
    });
  });
})();
