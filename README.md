# Darrell Cenido Personal Website

A GitHub Pages personal site for Darrell Cenido with:

- **About Me**: overview, affiliations, and hobbies
- **Personal Statement**: “I stopped dotting my i’s” essay
- **Resume**: interactive journey map and resume download
- **Gallery**: embedded YouTube, Instagram, Hudl, and feature content adapted from [darrell.cenido.info](https://darrell.cenido.info)
- **Blog**: coming soon

## Color palette

- Dark chocolate coffee brown `#3B2414`
- Light cream / tan `#F5E6D3` / `#E8D5B7`
- Dark navy accents `#0F1C2E`
- Light baby blue accents `#A8D5E5`

## Enable GitHub Pages (one-time)

The site files are already on `main`. Turn on Pages once in GitHub:

1. Open [repository Settings → Pages](https://github.com/Darrell-10/Darrell-Cenido-Personal-Website/settings/pages)
2. Under **Build and deployment**:
   - **Source:** Deploy from a branch
   - **Branch:** `main` / folder: `/ (root)`
3. Save

Your site will publish at:

**https://darrell-10.github.io/Darrell-Cenido-Personal-Website/**

Optional: if you prefer GitHub Actions deploys, set Source to **GitHub Actions** instead, then re-run the `Deploy GitHub Pages` workflow.

## Local preview

```bash
python3 -m http.server 8000
```

Visit `http://localhost:8000`.

## Site map

| Page | File |
|------|------|
| About Me | `index.html` |
| Personal Statement | `statement.html` |
| Resume | `professional.html` |
| Gallery | `gallery.html` |
| Blog | `blog.html` |
| Resume PDF | `assets/Darrell_Cenido_Resume.pdf` |
