// main.js — nav toggle, smooth scroll behavior, active link highlight, footer year.
// Reveal-on-scroll and form validation are added in Phase 4.

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  function closeNav() {
    mainNav.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  }

  function openNav() {
    mainNav.classList.add('is-open');
    navToggle.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.contains('is-open');
      isOpen ? closeNav() : openNav();
    });

    // Close the menu after choosing a link (mobile).
    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeNav);
    });

    // Close on Escape for keyboard users.
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
        closeNav();
        navToggle.focus();
      }
    });

    // Close if the viewport is resized back to desktop width.
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900 && mainNav.classList.contains('is-open')) {
        closeNav();
      }
    });
  }

  /* ---------- Active nav link highlight while scrolling ---------- */
  const navLinks = Array.from(document.querySelectorAll('.main-nav a'));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = `#${entry.target.id}`;
            navLinks.forEach((link) => {
              link.classList.toggle('is-current', link.getAttribute('href') === id);
            });
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ---------- Reveal-on-scroll ----------
     One clear moment per section, not a scattered effect on every card. */
  const revealTargets = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealTargets.length) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach((el) => revealObserver.observe(el));
  } else {
    // No IntersectionObserver support — just show everything.
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Contact form validation ---------- */
  const form = document.getElementById('contact-form');
  if (form) {
    const status = document.getElementById('form-status');

    const validators = {
      name: (value) => value.trim().length > 0 || 'Please enter your name.',
      email: (value) => {
        if (!value.trim()) return 'Please enter your email.';
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(value.trim()) || 'Enter a valid email address.';
      },
      subject: (value) => value.trim().length > 0 || 'Please add a subject.',
      message: (value) => value.trim().length >= 10 || 'Message should be at least 10 characters.',
    };

    function validateField(field) {
      const rule = validators[field.name];
      if (!rule) return true;

      const result = rule(field.value);
      const wrapper = field.closest('.form-field');
      const errorEl = document.getElementById(`${field.id}-error`);

      if (result === true) {
        wrapper.classList.remove('has-error');
        if (errorEl) errorEl.textContent = '';
        return true;
      } else {
        wrapper.classList.add('has-error');
        if (errorEl) errorEl.textContent = result;
        return false;
      }
    }

    form.querySelectorAll('input, textarea').forEach((field) => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.closest('.form-field').classList.contains('has-error')) {
          validateField(field);
        }
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = Array.from(form.querySelectorAll('input, textarea'));
      const results = fields.map(validateField);
      const allValid = results.every(Boolean);

      if (!allValid) {
        status.textContent = 'Please fix the highlighted fields.';
        status.style.color = '#C0503F';
        const firstInvalid = fields.find((f) => f.closest('.form-field').classList.contains('has-error'));
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // No backend is wired up yet — this simply confirms the form is
      // valid and ready to connect to a real submission endpoint later
      // (e.g. Formspree, a serverless function, or your own API).
      status.style.color = '';
      status.textContent = `Thanks — I'll get back to you soon.`;
      form.reset();
    });
  }

});