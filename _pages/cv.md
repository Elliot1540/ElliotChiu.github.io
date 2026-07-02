---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Profile
======
Jichun Zhao (Elliot Chiu) is a PhD Candidate at HIT Lab NZ, University of Canterbury in Christchurch, New Zealand.

Research focus
======
My work focuses on Human–Computer Interaction, XR Accessibility, Digital Cultural Heritage, Ageing, and Handheld Augmented Reality, with an emphasis on inclusive and meaningful immersive experiences.

Current position
======
* PhD Candidate, HIT Lab NZ
* University of Canterbury
* Christchurch, New Zealand

Research interests
======
* Human–Computer Interaction
* XR Accessibility
* Digital Cultural Heritage
* Ageing
* Handheld Augmented Reality

Profiles
======
* [Google Scholar](https://scholar.google.com/citations?user=B5KPFnEAAAAJ)
* [ORCID](https://orcid.org/0009-0000-0993-8279)
* [GitHub](https://github.com/Elliot1540)

Publications
======
{% assign publications_by_year = site.publications | sort: "sort_order" | reverse %}

<ul>{% for post in publications_by_year %}
  {% include archive-single-cv.html %}
{% endfor %}</ul>

Projects
======
<ul>{% for post in site.portfolio %}
  <li><a href="{{ base_path }}{{ post.url }}">{{ post.title }}</a>{% if post.excerpt %}: {{ post.excerpt | strip_html }}{% endif %}</li>
{% endfor %}</ul>

{% if site.portfolio.size == 0 %}
Selected projects will be added here.
{% endif %}
