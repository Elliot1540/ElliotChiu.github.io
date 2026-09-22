---
layout: academic
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Profile
------
Jichun Zhao (Elliot Chiu) is a PhD Candidate at HIT Lab NZ and DISC101 Tutor at the University of Canterbury in Christchurch, New Zealand.

Research focus
------
My work focuses on Human–Computer Interaction, XR Accessibility, Digital Cultural Heritage, Ageing, and Handheld Augmented Reality, with an emphasis on inclusive and meaningful immersive experiences.

Current positions
------
* PhD Candidate, HIT Lab NZ, University of Canterbury
* Tutor, DISC101 – Storytelling for Digital Screens, University of Canterbury
* Christchurch, New Zealand

Education
------
* PhD Candidate, HIT Lab NZ, University of Canterbury
* Master’s Degree in Art · Design Studies, Tsinghua University and Jiangsu Normal University, 2022–2025
* Bachelor’s Degree in Art · Digital Media Art, Jiangsu Normal University, 2018–2022

Research visits
------
<div class="timeline"><article class="planned"><p class="period">Oct–Dec 2026 <span class="status-tag">Planned</span></p><div><h3>Visiting Research</h3><p><a href="https://www.riec.tohoku.ac.jp/en/">Research Institute of Electrical Communication (RIEC), Tohoku University</a></p><p class="muted">Sendai, Japan · Upcoming research visit</p></div></article></div>

Summer schools
------
<div class="timeline"><article><p class="period">Jul–Aug 2023</p><div><h3>Summer School</h3><p>School of Design, Jiangnan University</p></div></article>
    <article><p class="period">Jun–Jul 2023</p><div><h3>Summer School</h3><p>Nanjing Normal University</p></div></article></div>

Teaching
------
* Tutor, DISC101 – Storytelling for Digital Screens, Dovedale Campus, University of Canterbury

Research interests
------
* Human–Computer Interaction
* XR Accessibility
* Digital Cultural Heritage
* Ageing
* Handheld Augmented Reality

Profiles
------
* [Google Scholar](https://scholar.google.com/citations?user=B5KPFnEAAAAJ)
* [ORCID](https://orcid.org/0009-0000-0993-8279)
* [GitHub](https://github.com/Elliot1540)
* [LinkedIn](https://www.linkedin.com/in/jichun-zhao-28359938b/)

Publications
------
{% include academic-publications.html %}

Projects
------
<ul>{% for post in site.portfolio %}
  <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a>{% if post.excerpt %}: <span>{{ post.excerpt | strip_html }}</span>{% endif %}</li>
{% endfor %}</ul>

{% if site.portfolio.size == 0 %}
Selected projects will be added here.
{% endif %}

Languages
------
* English
* Chinese
* Cantonese

Professional memberships
------
{% include academic-memberships.html %}
