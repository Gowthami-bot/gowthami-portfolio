# Gowthami's Portfolio

A responsive, static portfolio for Gowthami, a backend developer focused on Java, Spring Boot, and applied AI. It presents selected projects, experience, skills, achievements, a downloadable resume, and contact links.

## Features

- Responsive navigation and project filtering
- Light/dark theme that follows the system preference and remembers a manual choice
- Accessible, keyboard-friendly interactions and scroll reveals
- Plain HTML, CSS, and JavaScript; no build step or package dependencies

## Run locally

From the project directory, start a local static server:

```powershell
python -m http.server 8000
```

Open <http://localhost:8000> in a browser. You can also open `index.html` directly, though a local server more closely matches deployment.

## Deploy

Deploy the project root to any static hosting provider. Keep `index.html`, `css/`, `js/`, and `assets/` together so the site's relative paths continue to work.

## Customize

Update the content and links in `index.html`, styles in `css/`, and interactions in `js/`. Replace the placeholder email and LinkedIn URLs in the contact section and footer before publishing.
