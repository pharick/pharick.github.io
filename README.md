# pharick.github.io/site

My personal timeline: a diary of what I build, read and learn, published with
[Eleventy](https://www.11ty.dev/) on GitHub Pages.

Live site: <https://pharick.github.io/site/>

## Adding an entry

Every entry is a Markdown file in `src/posts/<year>/`. The quickest way to
create one:

```sh
npm run new -- "Finished the Rust book" --type book --tags rust,books
```

This creates `src/posts/2026/2026-09-11-finished-the-rust-book.md` with the
front matter filled in. Open it, write the body, commit, push. The site is
rebuilt and deployed automatically.

Front matter reference:

```yaml
---
title: "Finished the Rust book"
date: 2026-09-11          # the day it happened; posts are sorted by this
type: book                # project | course | book | concept | article | talk | milestone | note
summary: "One or two sentences shown on the timeline card."
tags: [rust, books]       # any words; each tag gets its own page under /tags/
links:                    # optional
  - label: Repository
    url: https://github.com/pharick/...
draft: false              # optional; true hides the entry from the build
---
```

Post types (badge colours and icons) are defined in `eleventy.config.js`;
add new ones there and give them a colour in `src/assets/css/style.css`.

## Local development

```sh
npm install
npm run dev      # http://localhost:8080 with live reload
npm run build    # writes the static site to _site/
```

## Deployment

`.github/workflows/deploy.yml` builds the site on every push to `main` and
publishes it with GitHub Pages. One-time setup in the repository settings:
**Settings → Pages → Build and deployment → Source: GitHub Actions**.

The workflow sets the URL prefix automatically: `/site/` for this repository,
or `/` if the repository is ever renamed to `pharick.github.io`. If you rename
it, also update `url` in `src/_data/site.json`.

## Layout

```
src/
  _data/site.json        site title, author, URL
  _includes/             layouts (base, post) and the timeline partial
  assets/                CSS, favicon
  posts/<year>/*.md      the entries
  index.njk              the timeline
  about.md               about page
  tags.njk, tag.njk      tag index and per-tag timelines
  feed.njk               Atom feed
scripts/new-post.js      `npm run new`
eleventy.config.js       collections, filters, post types
```
