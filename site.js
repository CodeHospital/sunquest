/**
 * Shared site behaviour. Everything here is an enhancement: with JavaScript off, the navigation is
 * a plain list of links to real pages, which is the whole point of the multi-page structure.
 */
(function () {
  'use strict';

  var toggle = document.querySelector('.menu-toggle');
  var links = document.getElementById('site-nav');
  if (!toggle || !links) return;

  function setOpen(open) {
    links.classList.toggle('show', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    document.body.classList.toggle('nav-open', open);
  }

  toggle.addEventListener('click', function (event) {
    event.stopPropagation();
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Tapping anywhere else closes the menu, as does Escape — on a phone the panel covers the page,
  // so leaving it open with no way out but the button is a trap.
  document.addEventListener('click', function (event) {
    if (!event.target.closest('nav')) setOpen(false);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });

  // Returning to a wide viewport must not leave the mobile panel's state behind.
  var wide = window.matchMedia('(min-width: 769px)');
  var onChange = function (event) {
    if (event.matches) setOpen(false);
  };
  if (wide.addEventListener) {
    wide.addEventListener('change', onChange);
  } else if (wide.addListener) {
    wide.addListener(onChange);
  }
})();
