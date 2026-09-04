/* ==========================================================================
   MYSELLWEB — MAIN.JS
   Shared vanilla JavaScript for every page. No dependencies, no build step.
   Sections:
     1. Mobile navigation (hamburger menu)
     2. Header scroll state (background on scroll)
     3. Scroll reveal animations (IntersectionObserver)
     4. Active nav link highlighting
     5. Back to top button
     6. Contact form handling (client-side only — see contact.html comments)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------------------------------
     1. MOBILE NAVIGATION
     A simple hamburger toggle. It swaps aria-expanded on the button and
     an "is-open" class on the menu — CSS handles the animation.
     ------------------------------------------------------------------ */
  var navToggle = document.querySelector('.nav-toggle');
  var mobileMenu = document.querySelector('.mobile-menu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      mobileMenu.classList.toggle('is-open', !isOpen);
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    });

    // Close the menu whenever a link inside it is clicked
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape for keyboard users
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('is-open');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------
     2. HEADER SCROLL STATE
     Adds a background + blur to the fixed header once the page scrolls
     past a small threshold, so the hero stays clean at the very top.
     ------------------------------------------------------------------ */
  var header = document.querySelector('.site-header');
  if (header) {
    var updateHeader = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  /* ------------------------------------------------------------------
     3. SCROLL REVEAL
     Any element with the class "reveal" or "reveal-stagger" fades and
     lifts into place the first time it enters the viewport. Falls back
     to showing everything immediately if IntersectionObserver isn't
     supported, and prefers-reduced-motion is handled purely in CSS.
     ------------------------------------------------------------------ */
  var revealEls = document.querySelectorAll('.reveal, .reveal-stagger');

  if ('IntersectionObserver' in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ------------------------------------------------------------------
     4. ACTIVE NAV LINK
     Marks the nav link matching the current page with aria-current, so
     both sighted users and screen reader users know where they are.
     Works because every page links with a plain relative filename.
     ------------------------------------------------------------------ */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function (link) {
    var linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage) {
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ------------------------------------------------------------------
     5. BACK TO TOP
     ------------------------------------------------------------------ */
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------------
     6. CONTACT FORM
     This is a STATIC site, so the form has no backend yet. On submit we
     just prevent the default page reload and show a confirmation panel.
     ------------------------------------------------------------------
     TO CONNECT THIS FORM FOR REAL, pick ONE option:

     OPTION A — Formspree (easiest, free tier available)
       1. Create a form at https://formspree.io and copy your endpoint.
       2. In contact.html, set the <form> tag's action to your endpoint,
          e.g. action="https://formspree.io/f/yourFormID"
       3. Set method="POST" (already set).
       4. Delete or comment out the preventDefault() block below so the
          form submits normally to Formspree.

     OPTION B — Netlify Forms (if you host on Netlify)
       1. Add the attribute data-netlify="true" to the <form> tag.
       2. Add a hidden input: <input type="hidden" name="form-name" value="contact">
       3. Remove the preventDefault() block below.

     OPTION C — Your own backend
       1. Point the form's action to your API endpoint.
       2. Handle the fetch() call below instead of a plain form submit.
     ------------------------------------------------------------------ */
  var contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      // Remove this preventDefault() once the form is connected to
      // Formspree, Netlify Forms, or your own backend (see comments above).
      e.preventDefault();

      var successPanel = document.querySelector('.form-success');
      if (successPanel) {
        successPanel.classList.add('is-visible');
        successPanel.setAttribute('tabindex', '-1');
        successPanel.focus();
        successPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      contactForm.reset();
    });
  }

});
