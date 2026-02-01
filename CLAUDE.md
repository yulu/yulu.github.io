# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal Jekyll blog (littlecheesecake.me) with three blog categories and a book collection. Built with Jekyll 4.2.2, Ruby 3.1.3, hosted on GitHub Pages.

## Development Commands

```bash
# Install dependencies
bundle install

# Local development server (http://localhost:4000)
bundle exec jekyll serve

# Production build
bundle exec jekyll build
```

## Content Structure

### Three Blog Categories
- **blog1/_posts/** - Tech posts (category: `blog1`)
- **blog2/_posts/** - Life journal (category: `blog2`)
- **blog3/_posts/** - Tech stack articles (category: `blog3`)

Post filename format: `YYYY-MM-DD-title.md`

### Book Collection
Books stored in `_books/collection/*.md` as a Jekyll collection. Required front matter:
- `layout: post`
- `category`: tech, non-fiction, or fiction
- `author`: Author name
- `cover`: S3 image URL
- `status: noted` (optional): shows "Done" ribbon

### Front Matter for Blog Posts
```yaml
layout: post
title: "Post Title"
date: YYYY-MM-DD HH:MM:SS
categories: blog1  # must match folder: blog1, blog2, or blog3
tags: "tag1 tag2"  # space-separated string
image_url: https://...  # optional hero image
```

## Architecture

- **Layouts**: `_layouts/` - default.html (base), post.html (articles with TOC), page.html
- **Includes**: `_includes/` - modular header, nav, footer, analytics, comments
- **Styles**: `css/main.scss` entry point, partials in `_sass/`
- **Config**: `_config.yml` - site settings, timezone (Asia/Singapore)

Key plugins: `jekyll-toc` (auto table of contents via `{% toc %}`), `jekyll-sitemap`

## Asset Hosting

Images and book covers hosted on S3: `https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/`

## Deployment

Automatic via GitHub Actions on push to master branch (`.github/workflows/jekyll.yml`).
