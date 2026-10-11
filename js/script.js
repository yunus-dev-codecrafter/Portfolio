(() => {
  'use strict';

  const doc = document;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------------------------------------------------
     Current year in the footer
     --------------------------------------------------- */
  const yearEl = doc.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---------------------------------------------------
     Mobile left-drawer navigation
     --------------------------------------------------- */
  const navToggle = doc.getElementById('nav-toggle');
  const primaryNav = doc.getElementById('primary-nav');
  const navBackdrop = doc.getElementById('nav-backdrop');
  const navClose = doc.getElementById('nav-close');
  const header = doc.getElementById('site-header');
  const desktopQuery = window.matchMedia('(min-width: 900px)');

  const getFocusable = () =>
    primaryNav
      ? Array.from(
          primaryNav.querySelectorAll(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        )
      : [];

  const isNavOpen = () =>
    Boolean(navToggle) && navToggle.getAttribute('aria-expanded') === 'true';

  const setNavOpen = (open) => {
    if (!navToggle || !primaryNav) return;
    const isDesktop = desktopQuery.matches;

    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    primaryNav.classList.toggle('is-open', open);
    if (navBackdrop) navBackdrop.classList.toggle('is-active', open);
    doc.body.classList.toggle('menu-open', open && !isDesktop);

    if (isDesktop || open) {
      primaryNav.removeAttribute('inert');
    } else {
      primaryNav.setAttribute('inert', '');
    }

    if (open && !isDesktop) {
      const first = primaryNav.querySelector('a, button');
      if (first) first.focus();
    }
  };

  if (navToggle && primaryNav) {
    if (!desktopQuery.matches) primaryNav.setAttribute('inert', '');

    navToggle.addEventListener('click', () => setNavOpen(!isNavOpen()));

    if (navClose) {
      navClose.addEventListener('click', () => setNavOpen(false));
    }

    if (navBackdrop) {
      navBackdrop.addEventListener('click', () => setNavOpen(false));
    }

    primaryNav.addEventListener('click', (event) => {
      if (event.target.closest('a')) setNavOpen(false);
    });

    doc.addEventListener('keydown', (event) => {
      if (!isNavOpen()) return;

      if (event.key === 'Escape') {
        setNavOpen(false);
        navToggle.focus();
        return;
      }

      if (event.key === 'Tab') {
        const items = getFocusable();
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && doc.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && doc.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    doc.addEventListener('click', (event) => {
      if (!isNavOpen()) return;
      if (event.target.closest('#primary-nav') || event.target.closest('#nav-toggle')) return;
      setNavOpen(false);
    });

    const handleBreakpoint = () => {
      if (isNavOpen()) setNavOpen(false);
      if (desktopQuery.matches) {
        primaryNav.removeAttribute('inert');
      } else {
        primaryNav.setAttribute('inert', '');
      }
    };

    if (typeof desktopQuery.addEventListener === 'function') {
      desktopQuery.addEventListener('change', handleBreakpoint);
    } else if (typeof desktopQuery.addListener === 'function') {
      desktopQuery.addListener(handleBreakpoint);
    }
  }

  /* ---------------------------------------------------
     Header border once the page is scrolled
     --------------------------------------------------- */
  if (header) {
    const updateHeader = () => {
      header.classList.toggle('is-stuck', window.scrollY > 8);
    };
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  /* ---------------------------------------------------
     Back to top
     --------------------------------------------------- */
  const toTop = doc.getElementById('to-top');
  if (toTop) {
    const updateToTop = () => {
      toTop.classList.toggle('is-visible', window.scrollY > 400);
    };
    updateToTop();
    window.addEventListener('scroll', updateToTop, { passive: true });
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    });
  }

  /* ---------------------------------------------------
     Reveal on scroll
     --------------------------------------------------- */
  const revealItems = Array.from(doc.querySelectorAll('.reveal'));

  if (revealItems.length) {
    const showAll = () => {
      revealItems.forEach((item) => item.classList.add('is-visible'));
    };

    const supportsObserver =
      'IntersectionObserver' in window && !reduceMotion.matches;

    if (supportsObserver) {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      );

      revealItems.forEach((item) => revealObserver.observe(item));
    } else {
      showAll();
    }
  }

  /* ---------------------------------------------------
     Active section highlighting in the nav
     --------------------------------------------------- */
  const navLinks = Array.from(doc.querySelectorAll('.nav-link'));

  if (navLinks.length && 'IntersectionObserver' in window) {
    const linkById = new Map(
      navLinks.map((link) => [link.getAttribute('href').slice(1), link])
    );

    const setActive = (id) => {
      navLinks.forEach((link) => {
        const active = link === linkById.get(id);
        link.classList.toggle('is-active', active);
        if (active) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    };

    const sections = Array.from(linkById.keys())
      .map((id) => doc.getElementById(id))
      .filter(Boolean);

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }
})();
