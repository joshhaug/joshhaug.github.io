---
layout: page
title:
---

# Prototypes

{% for post in site.posts %}

{% if post.tags contains "Hardware" %}

## [ {{ post.title }} ]({{ post.url }})

{% endif %}

{% endfor %}

# Data Analysis

{% for post in site.posts %}

{% if post.tags contains "Data" %}

## [ {{ post.title }} ]({{ post.url }})

{% endif %}

{% endfor %}

# Miscellaneous

{% for post in site.posts %}

{% if post.tags contains "Misc" %}

## [ {{ post.title }} ]({{ post.url }})

{% endif %}

{% endfor %}
