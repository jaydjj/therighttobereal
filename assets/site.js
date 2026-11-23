// Old one-page anchors (/#menu, /#regulars...) now point to their calendar entries.
(function () {
  var moved = { '#menu': '/#march', '#regulars': '/#the-resistance', '#january': '/#keep-the-change', '#rules': '/#principles', '#mission': '/#why', '#join': '/#beautyblackoutpledge', '#blackout': '/#beautyblackoutpledge' };
  if ((location.pathname === '/' || location.pathname === '/index.html') && moved[location.hash]) {
    location.replace(moved[location.hash]);
  }
})();

// Light / dark mode toggle (the <head> script picks the starting mode). The choice is remembered;
// without one, the site follows the device setting, live.
(function () {
  var btn = document.getElementById('theme-toggle');
  var root = document.documentElement;
  function set(t, save) {
    root.setAttribute('data-theme', t);
    var meta = document.getElementById('theme-color'); if (meta) meta.content = t === 'dark' ? '#1a1714' : '#efe6d4';
    if (btn) btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    if (save) try { localStorage.setItem('rtbr-theme', t); } catch (e) {}
  }
  set(root.getAttribute('data-theme') || 'light', false);
  if (btn) btn.addEventListener('click', function () { set(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true); });
  var mq = window.matchMedia && matchMedia('(prefers-color-scheme: dark)');
  if (mq && mq.addEventListener) mq.addEventListener('change', function (e) {
    var saved; try { saved = localStorage.getItem('rtbr-theme'); } catch (err) {}
    if (!saved) set(e.matches ? 'dark' : 'light', false);
  });
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

// Pledge for March 8: the live count ("74/1,000 pledges": pledge_start plus the Sheet's pledges), then one button.
// Each device counts once (remembered in this browser; the Sheet keeps one row per device id).
// After pledging, a temporary line points to the email sign-up in the footer.
var rtbrPledge = (function () {
  var card = document.getElementById('join');
  var form = document.getElementById('step-pledge');
  if (!card || !form) return null;
  var endpoint = card.getAttribute('data-endpoint') || '';
  var goal = parseInt(card.getAttribute('data-goal'), 10) || 1000;
  var base = parseInt(card.getAttribute('data-start'), 10) || 0;
  var num = document.getElementById('count-number');
  var fill = document.getElementById('count-fill');
  var note = document.getElementById('join-note');
  var btn = document.getElementById('pledge-btn');
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
      else document.getElementById('count-status').textContent = n.toLocaleString() + ' of ' + goal.toLocaleString() + ' pledges';
    }
    requestAnimationFrame(step);
  }
  function setLive(n) { if (n >= (live || 0)) { live = n; render(); } }
  function fromSheet(d) { if (d && typeof d.count === 'number') setLive(base + d.count); }
  function markDone() { btn.textContent = 'You\'re in!'; btn.disabled = true; btn.classList.add('is-done'); }
  // Records a pledge on this device once; returns true if it was new.
  function claim() {
    if (rtbrStore('rtbr-pledged')) return false;
    rtbrStore('rtbr-pledged', '1');
    setLive((live === null ? base : live) + 1);
    markDone();
    return true;
  }
  function hideDone() { doneLine.classList.add('fading'); timer = setTimeout(function () { doneLine.hidden = true; doneLine.classList.remove('fading'); }, 600); }

  var counter = document.getElementById('pledge-count');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { io.disconnect(); visible = true; render(); } }, { threshold: .4 });
    io.observe(counter);
  } else visible = true;
  if (endpoint) fetch(endpoint).then(function (r) { return r.json(); }).then(fromSheet).catch(function () {});
  else setLive(base);
  if (rtbrStore('rtbr-pledged')) markDone();

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!claim()) return;
    note.textContent = endpoint ? '' : 'Thanks. Pledges open January 2027, so nothing is saved yet.';
    rtbrSend(endpoint, { action: 'pledge' }).then(fromSheet);
    clearTimeout(timer);
    doneLine.classList.remove('fading');
    doneLine.hidden = false;
    timer = setTimeout(hideDone, 12000);
  });
  document.getElementById('done-link').addEventListener('click', function () {
    clearTimeout(timer); hideDone();
    setTimeout(function () { document.getElementById('join-email-input').focus({ preventScroll: true }); }, 400);
  });
  return { claim: claim, fromSheet: fromSheet };
})();

// Pledge for the whole month (#whole-month). Email required; typing it and pressing the button is the opt-in.
// Also counts toward the March 8 total, once per device.
(function () {
  var form = document.getElementById('month-form');
  if (!form) return;
  var endpoint = form.getAttribute('data-endpoint') || '';
  var note = document.getElementById('month-note');
  var input = document.getElementById('month-email');
  var submit = form.querySelector('button[type="submit"]');
  function done() {
    input.value = '';
    note.textContent = 'You\'re in for the whole month. Watch your inbox for your group chat invite.';
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = input.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { note.textContent = 'Please enter your email to pledge for the whole month.'; input.setAttribute('aria-invalid', 'true'); input.focus(); return; }
    input.removeAttribute('aria-invalid');
    if (!endpoint) { note.textContent = 'Thanks. Pledges open January 2027, so nothing is saved yet.'; return; }
    if (submit.disabled) return;
    submit.disabled = true;
    var label = submit.textContent;
    submit.textContent = 'Sending…';
    note.textContent = 'Saving your pledge…';
    rtbrSend(endpoint, { action: 'month', email: email, consent: 'yes' }).then(function (d) {
      // Older versions of the Sheet script don't know "month": save it as a sign-up and a month choice instead.
      if (d && d.ok && !d.month) {
        return rtbrSend(endpoint, { action: 'poll', choice: 'month' }).then(function () {
          return rtbrSend(endpoint, { action: 'email', email: email, consent: 'yes' });
        });
      }
      return d;
    }).then(function (d) {
      submit.disabled = false;
      submit.textContent = label;
      if (d && d.ok) {
        rtbrStore('rtbr-month', '1');
        if (rtbrPledge) { rtbrPledge.claim(); rtbrPledge.fromSheet(d); }
        done();
      } else {
        note.innerHTML = 'Sorry, that didn\'t go through. Please try again, or <a href="https://www.instagram.com/therighttobereal/" target="_blank" rel="noopener">message us on Instagram</a>.';
      }
    });
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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { note.textContent = 'Please enter a valid email address.'; input.setAttribute('aria-invalid', 'true'); input.focus(); return; }
    input.removeAttribute('aria-invalid');
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

// Looping illustrations: play only while on screen, never with "reduce motion"; the button pauses and resumes.
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.frame-loop').forEach(function (fig) {
    var video = fig.querySelector('video');
    var btn = fig.querySelector('.loop-toggle');
    var paused = reduce, onScreen = false;
    function update() {
      if (!paused && onScreen) { var p = video.play(); if (p && p.catch) p.catch(function () {}); } else video.pause();
      btn.classList.toggle('is-paused', paused);
      btn.setAttribute('aria-label', paused ? 'Play animation' : 'Pause animation');
    }
    btn.hidden = false;
    btn.addEventListener('click', function () { paused = !paused; update(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { onScreen = es[0].isIntersecting; update(); }, { threshold: .2 }).observe(fig);
    } else { onScreen = true; }
    update();
  });
})();
