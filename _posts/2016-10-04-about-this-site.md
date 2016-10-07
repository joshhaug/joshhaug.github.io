---
layout: post
title: About This Website
date: '2016-10-04T01:02:23-07:00'
---


<div class="message">
This post addresses some frequently asked questions about this site.
</div>

**How did you make it?**

> I built this website using Poole, an open-source wrapper for Jekyll.  I write the posts in markdown and Jekyll converts the files to HTML.  All it takes is a simple `jekyll serve` followed by a quick `git commit` -- just like that, it's live!  

> * Learn more about Poole [at the official repository](https://github.com/poole/poole)
> * If you don't know what Jekyll is, [learn about it here](http://jekyllrb.com/)




**How did you know how to do it?**

> Joshua Lande wrote an insightful blog post about using Poole and I modeled my effort on his.  (Thanks, Joshua!) [Click here](http://joshualande.com/about/) for more info about him.  Joshuas Unite!




**How are you hosting [www.jhaug.com](jhaug.com)?**

> This website is hosted on [github](https://github.com/joshhaug/joshhaug.github.io).  




**How did you get math to render on your site?**

> Great question.  The math here is rendered using [MathJax](https://www.mathjax.org/).  All I did was navigate to Jekyll's `_layouts/post.html` and included this snippet:

{% highlight html %}
<script type="text/javascript"
    src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>
{% endhighlight %}

> Now I can use the LaTeX math format in my blog posts and it comes out as a beautiful equation!  For example, the equation for the aerodynamic diameter of an aerosol particle[^fn-aerodyn] is represented as `$${a} = d_{e}\left(\frac{\rho_{p}}{\rho_{0}\chi}\right)^{\frac{1}{2}}$$` in my code, but produces...

$${a} = d_{e}\left(\frac{\rho_{p}}{\rho_{0}\chi}\right)^{\frac{1}{2}}$$


**Why do your code blocks look so nice?**

> The built-in support for code blocks produced ugly horizontal scroll bars.  To add functionality for code wrapping, I went to `_sass/_code.scss`, found the block that started with `pre {` and added in `white-space: pre-wrap;`, which did the trick.  
> 


-----
[^fn-aerodyn]: In case you're interested, the aerodynamic diameter of a particle is the diameter of a spherical particle with the same settling velocity as the irregular particle.  This particle is assumed to have a density of 1000 kg/m^3.  







