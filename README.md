# Jichun Zhao — academic website

Personal academic website for Jichun Zhao (Elliot Chiu), PhD Candidate at HIT Lab NZ, University of Canterbury.

Live site: https://elliot1540.github.io/ElliotChiu.github.io/

## Editing content

- `_pages/about.md`: homepage, research overview, experience and contact.
- `_portfolio/`: all four existing research/project records and their permanent URLs.
- `_publications/`: all six existing publication records. Lists are generated from this collection, sorted by `sort_order`.
- `_pages/cv.md`: full CV, education, teaching, languages and memberships.
- `_config.yml`: profile links, email and site metadata.
- `_data/navigation.yml`: navigation labels and destinations.
- `_layouts/academic.html` and `assets/css/academic.css`: shared semantic layout and responsive styles. No JavaScript, remote fonts or new framework required.

The original AcademicPages layouts and assets remain available for older utility pages. Existing project/publication URLs and about/portfolio/resume redirects are retained.

## Preview and publish

Use Ruby 3.1 (as in the existing deployment workflow), then run `bundle install` and `bundle exec jekyll serve`. Open the reported local URL with `/ElliotChiu.github.io/` appended. Pushes to `master` use the existing GitHub Pages workflow.

## Content to complete when confirmed

- PhD start date and the precise wording of the master's degree affiliations.
- Publication DOI / publisher URLs, original-language titles if appropriate, and missing volume, issue and page information for the 2026 article. Existing bibliographic records have been preserved, not independently reclassified.
- Project images, demonstrations, individual contributions and confirmed outcomes. Research areas and the museum concept are not presented as completed studies.
- A downloadable CV, if desired. The current CV link opens the maintained HTML version.

Based on AcademicPages and Minimal Mistakes; see LICENSE.
