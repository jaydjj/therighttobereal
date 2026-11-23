// Old one-page anchors (/#menu, /#regulars...) now point to their calendar entries.
(function () {
  var moved = { '#menu': '/#march', '#regulars': '/#the-resistance', '#january': '/#keep-the-change', '#rules': '/#principles', '#mission': '/#why', '#join': '/#blackout' };
  if ((location.pathname === '/' || location.pathname === '/index.html') && moved[location.hash]) {
    location.replace(moved[location.hash]);
  }
})();

// The sign-up form is not connected yet: nothing is sent or stored.
(function () {
  var form = document.getElementById('join');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var note = document.getElementById('join-note');
    note.innerHTML = 'Thanks for being early. Sign-ups open in January 2027, so we haven\'t saved this yet. <a href="https://www.instagram.com/therighttobereal/" target="_blank" rel="noopener">Follow @therighttobereal</a> to hear the moment they open.';
    note.classList.add('join-note-on');
  });
})();

