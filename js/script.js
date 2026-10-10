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
     Mobile navigation
     --------------------------------------------------- */
  const navToggle = doc.getElementById('nav-toggle');
  const primaryNav = doc.getElementById('primary-nav');
  const header = doc.getElementById('site-header');
  const desktopQuery = window.matchMedia('(min-width: 900px)');

  const setNavOpen = (open) => {
    if (!navToggle || !primaryNav) return;
    navToggle.setAttribute('aria-expanded', String(open));
    primaryNav.classList.toggle('is-open', open);
    if (open) {
      const firstLink = primaryNav.querySelector('a');
      if (firstLink) firstLink.focus();
    }
  };

  const isNavOpen = () =>
    Boolean(navToggle) && navToggle.getAttribute('aria-expanded') === 'true';

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      setNavOpen(!isNavOpen());
    });

    primaryNav.addEventListener('click', (event) => {
      if (event.target.closest('a')) setNavOpen(false);
    });

    doc.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && isNavOpen()) {
        setNavOpen(false);
        navToggle.focus();
      }
    });

    doc.addEventListener('click', (event) => {
      if (!isNavOpen()) return;
      if (event.target.closest('#primary-nav') || event.target.closest('#nav-toggle')) return;
      setNavOpen(false);
    });

    const handleBreakpoint = (event) => {
      if (event.matches) setNavOpen(false);
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
