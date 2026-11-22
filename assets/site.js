// Old one-page links (/#menu, /#regulars...) now live on campaign pages.
(function () {
  var moved = { '#menu': '/campaigns/womens-month/', '#regulars': '/campaigns/the-regulars/', '#january': '/campaigns/keep-the-change/', '#rules': '/#principles', '#join': '/campaigns/beauty-blackout/#join-section', '#join-section': '/campaigns/beauty-blackout/#join-section' };
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

// Principles open in place on the homepage; links to /#principles open them.
(function () {
  var panel = document.getElementById('principles');
  if (!panel || panel.tagName !== 'DETAILS') return;
  function openIfTargeted() { if (location.hash === '#principles') { panel.open = true; panel.scrollIntoView({ block: 'start' }); } }
  openIfTargeted();
  window.addEventListener('hashchange', openIfTargeted);
})();
