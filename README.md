# Sheikh Badar Ud Din Tahir — academic website

Static editorial design, published at https://sheikhbadar.github.io/ from the root of `main`.

## Files

- `index.html`: biography, research, selected papers, talks, teaching and contact.
- `publications.html`: all 12 papers, with optional keyword search.
- `research.html`: detailed research descriptions. The CV page and navigation have been removed.
- `assets/style.css`: shared desktop, mobile and print styles.
- `assets/site.js`: footer year and publication search. All papers remain readable if JavaScript is unavailable.

No package installation or build step. Fonts load from Google Fonts with system fallbacks. The existing Flag Counter image retains ID `ZrS2`.

## Checks

Run `node tests/search.test.cjs` and `python tests/check_site.py`. For a local preview, run `python -m http.server 8765 --bind 127.0.0.1`.

## Editing

Edit publications directly in the HTML; search uses the displayed text.

## Review
 Fixed accent and apostrophe matching, filtered counts, accessible search announcements, progressive enhancement and narrow-screen overflow.
