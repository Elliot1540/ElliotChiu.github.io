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
Jichun Zhao (preferred name: Elliot Chiu) is a PhD Candidate at HIT Lab NZ, University of Canterbury in Christchurch, New Zealand.

Research focus
======
My work focuses on Human-Computer Interaction, XR Accessibility, Digital Cultural Heritage, Ageing, and Augmented Reality, with an emphasis on inclusive and meaningful immersive experiences.

Current position
======
* PhD Candidate, HIT Lab NZ
* University of Canterbury
* Christchurch, New Zealand

Research interests
======
* Human-Computer Interaction
* XR Accessibility
* Digital Cultural Heritage
* Ageing
* Augmented Reality

Profiles
======
* [Google Scholar](https://scholar.google.com/citations?user=B5KPFnEAAAAJ)
* [ORCID](https://orcid.org/0009-0000-0993-8279)
* [GitHub](https://github.com/Elliot1540)

Publications
======
{% if site.publications.size > 0 %}
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
{% else %}
Publication records will be added here. For current entries, see [Google Scholar](https://scholar.google.com/citations?user=B5KPFnEAAAAJ).
{% endif %}
  
{% if site.talks.size > 0 %}
Talks
======
  <ul>{% for post in site.talks reversed %}
    {% include archive-single-talk-cv.html  %}
  {% endfor %}</ul>
{% endif %}
  
{% if site.teaching.size > 0 %}
Teaching
======
  <ul>{% for post in site.teaching reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
{% endif %}
