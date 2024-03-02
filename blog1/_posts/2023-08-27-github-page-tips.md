---
layout: post
title:  "Publish Jekyll Site to GitHub Pages"
date:   2023-08-27 00:00:00
categories: blog1
summary: "Here I am sharing a solution to use Github Action to build github pages with non-official jekyll plugins."
tags: "ci/cd github_actions"
toc: true
---

### Why My GitHub Page Failed to Deploy

I was working on a few tech blogs on my reading notes. I felt that the content of the blogs became verbose, it would be nice to add a table of content to these blog posts for easier navigation. I searched around and found one Jekyll plugin [jekyll-toc](https://github.com/toshimaru/jekyll-toc), which fit to my problem nicely. I set it up and tested. It worked perfectly. Then I pushed my changes.

Boom, a build failure

![](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/github_page/github_page_build_failure.png)

The build log says:

```
 Liquid Exception: Liquid syntax error (line 39): Unknown tag 'toc' in /_layouts/post.html
/usr/local/bundle/gems/liquid-4.0.4/lib/liquid/document.rb:23:in `unknown_tag': Liquid syntax error (line 39): Unknown tag 'toc' (Liquid::SyntaxError)
```

It seemed that the Jekyll plugin `jekyll-toc` is [not officially supported by Github Page](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll#plugins).

Dig deeper: GitHub Action uses this [jekyll-build-pages](https://github.com/actions/jekyll-build-pages) by default to build the Jekyll artifacts. The [github-pages dependencies need to be satisfied](https://github.com/actions/jekyll-build-pages/blob/1e8be5b76cb2afddabb92a257cc8ca17a24adc98/entrypoint.sh#L17).


### A Hacky Solution ([Reference](https://dqdongg.com/blog/github/2018/12/29/Blog-Jekyll-toc-plugin.html))

By understanding how [GitHub Pages works for Jekyll](https://jekyllrb.com/docs/github-pages/), we can find one way to solve this problem - to build the static source files locally and push the generated files and serve that directly. Here's the steps:

- Step 1: The site should be generated locally. Generate the `_site/` in master branch by

```shell
bundle exec jekyll build
```

- Step 2: Then copy the `_site/*` content to the /gh-pages branch and push

```shell
cp -r _site /tmp/
git checkout -b gh-pages
rm -rf *
cp -r /tmp/_site/* ./
git commit -a -m "your commit message"
git push origin gh-pages
```

- Step3: This GitHub Page site will work after config the Page Build and deployment setting by serving the static files from /gh-pages branch as shown below

![](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/github_page/github_page_config.png)


### A Proper Solution

However the above approach is a bit manual and hacky. A better solution however, is to [customize the GitHub Action Workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow). Touch the following config script as `.github/workflows/jekyll.yml`. The key is that we need a proper Ruby Runtime for the build to run with.

[From GitHub Action starter-workflows](https://github.com/actions/starter-workflows/blob/1c61cfc44d2a372d82735888ab06bc9491e1e3d6/pages/jekyll.yml):
```yml
# This workflow uses actions that are not certified by GitHub.
# They are provided by a third-party and are governed by
# separate terms of service, privacy policy, and support
# documentation.

name: Deploy Jekyll site to Pages

on:
  push:
    branches: ["master"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Setup Ruby
        uses: ruby/setup-ruby@55283cc23133118229fd3f97f9336ee23a179fcf # v1.146.0
        with:
          ruby-version: '3.1'
          bundler-cache: true
          cache-version: 0
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v3
      - name: Build with Jekyll
        # Outputs to the './_site' directory by default
        run: bundle exec jekyll build --baseurl "${{ steps.pages.outputs.base_path }}"
        env:
          JEKYLL_ENV: production
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
    
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

Now it works for me!

![](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/github_page/github_page_build_success.png)


### References

- [Use jekyll-toc plugin on GitHub Pages](https://dqdongg.com/blog/github/2018/12/29/Blog-Jekyll-toc-plugin.html)
- [Creating a custom GitHub Actions workflow to publish your site](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#creating-a-custom-github-actions-workflow-to-publish-your-site)
- [GitHub Action start-workflows](https://github.com/actions/starter-workflows/tree/main/pages)
- [GitHub Action jekyll-build-pages](https://github.com/actions/jekyll-build-pages)