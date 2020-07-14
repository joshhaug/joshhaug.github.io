---
layout: page
title: All Posts
---

<!-- {% for post in site.posts %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
{% endfor %} -->

<div class="message">
Here's a list of all the posts in this site.
</div>

{% for post in site.posts %}

### [ {{ post.title }} ]({{ post.url }})

{% endfor %}
