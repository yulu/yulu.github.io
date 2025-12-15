# LittleCheeseCake Blog - AI Agent Instructions

## Project Overview
Personal Jekyll blog (`littlecheesecake.me`) with multi-category content: tech posts, life journal, tech stack articles, and a book collection. Built with Jekyll 3.x, hosted on GitHub Pages.

## Architecture & Content Structure

### Three Blog Categories
- **blog1/** - Tech posts (`/blog1/index.html`, category: `blog1`)
- **blog2/** - Life journal (`/blog2/index.html`, category: `blog2`) 
- **blog3/** - Tech stack articles (`/blog3/index.html`, category: `blog3`)

Posts in `blogX/_posts/` use filename format: `YYYY-MM-DD-title.md`

### Book Collection System
- Books live in `_books/collection/*.md` as a Jekyll collection
- Front matter requires: `layout: post`, `category` (tech/non-fiction/fiction), `author`, `cover` (image URL)
- Optional: `status: noted` adds "Done" ribbon on shelf
- Rendered as grid view in `/books/index.html` organized by category

### Front Matter Patterns
**Blog posts:**
```yaml
layout: post
title: "Post Title"
date: YYYY-MM-DD HH:MM:SS
categories: blog1  # or blog2, blog3
tags: "tag1 tag2"  # space-separated string
image_url: https://...  # optional hero image
video: https://...  # optional embedded video
```

**Books:**
```yaml
layout: post
tag: reading_status/reading  # or other status
category: tech  # or non-fiction, fiction
author: Author Name
cover: https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/books/...
status: noted  # optional, shows "Done" ribbon
```

## Development Workflow

### Local Development
```bash
bundle install
bundle exec jekyll serve
```
Server runs at `http://localhost:4000`. Jekyll watches for changes and rebuilds automatically.

### Key Dependencies
- Ruby 3.1.3 required
- `jekyll-toc` - Auto-generates table of contents in post layout
- `jekyll-sitemap` - Generates sitemap.xml
- `webrick` - Required for Ruby 3+

## Styling & Assets

### SCSS Architecture
- Entry point: `css/main.scss` (with Jekyll front matter)
- Partials in `_sass/`: `_base.scss`, `_layout.scss`, `_syntax-highlighting.scss`
- Variables defined in `main.scss`: fonts, colors, spacing, breakpoints

### Asset Hosting
Images/covers hosted on S3: `https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/`

## Layout System

- `default.html` - Base layout with header/footer
- `post.html` - Article layout with hero image, TOC (`{% toc %}`), sharing buttons, "Buy Me a Coffee"
- `page.html` - Simple page layout
- Includes in `_includes/`: modular header, nav, footer, analytics, comments

## Important Conventions

1. **Posts are filtered by `categories` field** - must match folder name (blog1/blog2/blog3)
2. **Books use Jekyll collection** - defined in `_config.yml`, not regular posts
3. **Table of contents auto-generated** via `{% toc %}` in post layout (requires `jekyll-toc`)
4. **Site config in `_config.yml`** - title, email, description, timezone (Asia/Singapore)
5. **Liquid templating throughout** - use `site.baseurl`, `prepend: site.baseurl` for URLs

## Common Tasks

**Add new tech post:**
Create `blog1/_posts/YYYY-MM-DD-title.md` with `categories: blog1`

**Add new book:**
Create `_books/collection/Book Title.md` with required front matter (layout, category, author, cover)

**Modify navigation:**
Edit `_includes/nav.html` - uses site.baseurl for links

**Update styles:**
Modify SCSS in `_sass/` directory, changes apply on rebuild
