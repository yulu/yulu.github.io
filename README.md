This is the publish branch. The site should be generated locally (since Github build does not support the jekyll-toc plugin). Generate the `_site/` in master branch by

```shell
bundle exec jekyll build
```

Then copy the `_site/*` content to this branch and push. 

```shell
cp -r _site /tmp/
git checkout -b gh-pages
rm -rf *
cp -r /tmp/_site/* ./
git commit -a -m "your commit message"
git push origin gh-pages
```
