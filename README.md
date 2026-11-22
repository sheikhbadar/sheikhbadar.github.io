# Sheikh Badar Ud Din Tahir — academic website

Static editorial design, published at https://sheikhbadar.github.io/ from the root of `main`.

## Files

- `index.html`: biography, research, selected papers, talks, teaching and contact.
- `publications.html`: all 12 papers, with optional keyword search.
- `research.html` and `cv.html`: retained detailed pages and stable URLs.
- `assets/style.css`: shared desktop, mobile and print styles.
- `assets/site.js`: footer year and publication search. All papers remain readable if JavaScript is unavailable.

No package installation or build step. Fonts load from Google Fonts with system fallbacks. The existing Flag Counter image retains ID `ZrS2`.

## Checks

Run `node tests/search.test.cjs` and `python tests/check_site.py`. For a local preview, run `python -m http.server 8765 --bind 127.0.0.1`.

## Editing

Edit publications directly in the HTML; search uses the displayed text, so there is no separate keyword list to maintain. Keep publication status, future talks and the March 2027 expected PhD completion date current.

## Review

Reviewed with the instructions in https://github.com/DietrichGebert/ponytail/tree/main/skills/ponytail-review . Fixed accent and apostrophe matching, filtered counts, accessible search announcements, progressive enhancement and narrow-screen overflow. The ORCID link is supported by the publisher record at https://onlinelibrary.wiley.com/doi/10.1155/2023/9822428 . The CFE talk retains the established scheduled status; an invited designation was not independently verified.
