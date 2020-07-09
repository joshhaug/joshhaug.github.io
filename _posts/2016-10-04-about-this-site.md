---
layout: post
title: How To Make This Website
date: '2016-10-04T01:02:23-07:00'
---

<div class="message">
How I made this website.  Guaranteed to be boring for non-developers.
</div>

**How did you make it?**

> I modeled my effort on [this one](http://joshualande.com/jekyll-github-pages-poole). In short, it uses [Poole](https://github.com/poole/poole), which is a theme for [Jekyll](http://jekyllrb.com/).  I write the posts in markdown and Jekyll converts the files to HTML.

**How did you get math to render on your site?**

> The math on this site is rendered using [MathJax](https://www.mathjax.org/).  To get this working, I navigated to Jekyll's `_layouts/default.html` and included this snippet:

{% highlight html %}

<script type="text/javascript"
    src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>

{% endhighlight %}

> Now I can use the LaTeX math format in my blog posts and it comes out as a beautiful equation.  For example, the equation for the aerodynamic diameter of an aerosol particle[^fn-aerodyn] is represented as `$${a} = d_{e}\left(\frac{\rho_{p}}{\rho_{0}\chi}\right)^{\frac{1}{2}}$$` in my code, but produces...

$${a} = d_{e}\left(\frac{\rho_{p}}{\rho_{0}\chi}\right)^{\frac{1}{2}}$$

**Why do your code blocks look so nice?**

> The built-in support for code blocks produced ugly horizontal scroll bars.  To add functionality for code wrapping, I went to `_sass/_code.scss`, found the block that started with `pre {` and added in `white-space: pre-wrap;`, which did the trick.  If you're on mobile, however, the code blocks are gonna look ugly.  

**How are you hosting it?**

> This website is [hosted on github](https://github.com/joshhaug/joshhaug.github.io).  

**How did you set up that SSL certificate?**

> SSL is not enabled automatically for GitHub pages.  To get https working, I followed the instructions [here](https://sheharyar.me/blog/free-ssl-for-github-pages-with-custom-domains/).

-----

[^fn-aerodyn]: In case you're interested, the particle is assumed to have a density p₀ = 1000 kg/m³.  I'm still trying out using footnotes in markdown, so that's what I'm doing here.
