// theme.js — dark/light mode toggle with localStorage persistence.
//
// Default: follow the OS/browser preference (handled by the
// prefers-color-scheme rules already in style.css, no attribute needed).
// Once the person clicks the toggle, we store an explicit choice and
// apply it via a data-theme attribute, which overrides the OS preference.

(function () {
  const STORAGE_KEY = 'portfolio-theme';
  const root = document.documentElement;

  function applyTheme(theme) {
    if (theme === 'dark' || theme === 'light') {
      root.setAttribute('data-theme', theme);
    } else {
      root.removeAttribute('data-theme');
    }
  }

  function currentEffectiveTheme() {
    const stored = root.getAttribute('data-theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Apply any previously saved explicit choice as early as possible.
  let saved = null;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    // localStorage unavailable (private mode, disabled storage) — fall back
    // to following the OS preference for this session only.
  }
  if (saved) applyTheme(saved);

  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    function reflectButtonState() {
      const effective = currentEffectiveTheme();
      const isDark = effective === 'dark';
      toggle.setAttribute('aria-pressed', String(isDark));
      toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }

    reflectButtonState();

    toggle.addEventListener('click', () => {
      const next = currentEffectiveTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (e) {
        // If storage isn't available the choice just won't persist across visits.
      }
      reflectButtonState();
    });
  });
})();