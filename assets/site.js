// Old one-page anchors (/#menu, /#regulars...) now point to their calendar entries.
(function () {
  var moved = { '#menu': '/#march', '#regulars': '/#the-resistance', '#january': '/#keep-the-change', '#rules': '/#principles', '#mission': '/#why', '#join': '/#blackout' };
  if ((location.pathname === '/' || location.pathname === '/index.html') && moved[location.hash]) {
    location.replace(moved[location.hash]);
  }
})();

// Pledge card. Not connected yet: nothing is sent or stored.
// Step 1 is a one-tap pledge; step 2 (poll + optional email) appears after it.
(function () {
  var btn = document.getElementById('pledge-btn');
  var more = document.getElementById('step-more');
  var first = document.getElementById('step-pledge');
  var note = document.getElementById('join-note');
  if (!btn || !more) return;
  more.hidden = true;
  btn.addEventListener('click', function () {
    first.hidden = true;
    more.hidden = false;
    var t = document.getElementById('join-title');
    if (t) { t.innerHTML = 'You\'re <em>in.</em>'; t.focus(); }
  });
  document.querySelectorAll('input[name="poll"]').forEach(function (r) {
    r.addEventListener('change', function () {
      note.textContent = 'Thanks for voting. Pledges and the poll open January 2027, so nothing is saved yet.';
    });
  });
  var form = document.getElementById('join-email');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    note.innerHTML = 'Thanks for being early. Pledges open January 2027, so we haven\'t saved this yet. <a href="https://www.instagram.com/therighttobereal/" target="_blank" rel="noopener">Follow @therighttobereal</a> to hear the moment they open.';
  });
})();
