:warning: This branch is not in use, this deployment flow is a backup of the master branch, in case the custom workflows fails

This is the publish branch. The site should be generated locally (since Github build does not support the jekyll-toc plugin). Generate the `_site/` in master branch by

```shell
bundle exec jekyll build
```

Then copy the `_site/*` content to this branch and push to this branch

```shell
cp -r _site /tmp/
git checkout -b gh-pages
rm -rf *
cp -r /tmp/_site/* ./
git commit -a -m "your commit message"
git push origin gh-pages
```

This GitHub Page site will work after config the Page Build and deployment setting


Reference
- [Use jekyll-toc plugin on Github Pages](https://dqdongg.com/blog/github/2018/12/29/Blog-Jekyll-toc-plugin.html)
- [GitHub Pages official dependencies](https://pages.github.com/versions/)
