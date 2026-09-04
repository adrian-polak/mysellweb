# MySellWeb — Project README

A freelance web design and graphic design studio site, built with plain HTML5, CSS3 and vanilla JavaScript. No frameworks, no build step, no dependencies to install.

## File structure

```
/
├── index.html          Homepage
├── work.html            Portfolio / selected work
├── services.html        Services, pricing, FAQ
├── about.html            About page
├── contact.html          Project enquiry form
├── css/
│   └── styles.css        All shared styling (design system + components)
├── js/
│   └── main.js            All shared JavaScript (nav, animations, form)
├── projects/
│   ├── barber.html         Case study: The Fade House
│   ├── gym.html             Case study: Forge Strength Studio
│   └── restaurant.html     Case study: Marlow & Co. Café
└── assets/
    ├── images/            Put screenshots, photos and graphics here
    ├── videos/             Put MP4 demo recordings here
    └── icons/               Put a favicon or extra icons here
```

## 1. Running the site locally

No build tools or servers are required, but opening `index.html` directly with a double-click works fine for most testing. For the closest match to a real deploy (some browsers restrict certain things on `file://` URLs), run a tiny local server instead:

```bash
cd MySellWeb
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser. If you have Node installed, `npx serve` works the same way.

## 2. Replacing portfolio images

Every image placeholder is already marked in the HTML with an HTML comment directly above a dashed placeholder box, for example in `work.html`:

```html
<!-- REPLACE ME: main cover screenshot for this project -->
<!-- <img src="assets/images/barbershop-cover.jpg" alt="Homepage of The Fade House barbershop website concept"> -->
<div class="placeholder-tag">...</div>
```

To swap in a real image:
1. Save your screenshot into `assets/images/` (for example `barbershop-cover.jpg`).
2. Delete the `<div class="placeholder-tag">...</div>` block.
3. Uncomment the `<img>` line above it (remove the `<!--` and `-->`) and update the `src` if your filename is different.
4. Write a real, descriptive `alt` attribute for accessibility and SEO.

Recommended sizes: cover/hero images around 1600×1200px, desktop screenshots around 1600×1000px, mobile screenshots around 750×1500px. Compress images (TinyPNG or Squoosh) before adding them, since large files slow the site down.

## 3. Adding MP4 portfolio videos

Each project page (`projects/barber.html`, `gym.html`, `restaurant.html`) has a commented-out video block near the bottom, above a "video demo" placeholder:

```html
<!--
<div class="media-block reveal" style="margin-top: var(--space-6);">
  <video controls poster="../assets/images/barber-video-poster.jpg">
    <source src="../assets/videos/barber-demo.mp4" type="video/mp4">
    Your browser does not support embedded video.
  </video>
</div>
-->
```

To add a video:
1. Save an MP4 file into `assets/videos/` (keep it under roughly 15–20MB; compress with HandBrake if needed).
2. Delete the placeholder `<div class="media-block reveal" ...><div class="placeholder-tag">...</div></div>` block below the comment.
3. Uncomment the `<video>` block and update the file paths.

## 4. Adding another project

1. Open `work.html`. Copy one full `<article class="project-card">...</article>` block, paste it where you want the new project to appear, and update the industry tag, title, description, service tags and the link's `href`.
2. Copy `projects/barber.html` to a new file, for example `projects/tradesperson.html`.
3. Update its `<title>`, meta description, heading, meta row, description, challenge, solution, services and media placeholders.
4. Update the `href` in the `work.html` card you just added to point at the new file.
5. If you'd like the project on the homepage too, repeat the same card-copy step inside the "Featured Work" section of `index.html`.

## 5. Changing colours

Every colour on the site is a CSS variable at the top of `css/styles.css`, inside `:root`. The most important one is `--accent`:

```css
--accent: #d4ff3d;   /* change this single value to re-theme the whole site */
```

Change `--accent` (and `--accent-dim`, used for hover states) to any colour, and every button, link underline, badge and highlight updates automatically. To go lighter overall, adjust `--bg`, `--bg-raised` and `--surface` together, and check text contrast afterwards.

## 6. Changing prices

Prices appear in two places, `index.html` and `services.html`, inside the `#pricing` section. Each package is one `.price-card` block. Update the number inside `.price-value`, for example:

```html
<div class="price-value">€300<span> starting</span></div>
```

Update both files together so the homepage and services page stay in sync, or remove the pricing section from one page and link to the other instead.

## 7. Replacing your contact information

Search each HTML file for `your@email.com`, `yourhandle` and `MySellWeb` and replace them with your real details. The main spots are:
- The footer on every page (`your@email.com`, Instagram, LinkedIn links)
- The mobile menu footer on every page
- `contact.html` (the sidebar and the "Prefer email?" line)
- The `<title>` tags and Open Graph meta tags (swap `MySellWeb` for your studio name, and `https://www.yourdomain.com` for your real domain once you have one)

## 8. Connecting the contact form

The form in `contact.html` does not send email yet, since this is a static site. Open `js/main.js` and find the section headed `6. CONTACT FORM` for full instructions. Quick version using Formspree (free, easiest):

1. Create a form at [formspree.io](https://formspree.io) and copy your form endpoint.
2. In `contact.html`, replace the form's `action` attribute with your endpoint:
   `action="https://formspree.io/f/yourFormID"`
3. In `js/main.js`, delete or comment out the `e.preventDefault();` line inside the `contact-form` submit handler, so the form submits normally to Formspree instead of only showing the local success message.

Netlify Forms and a custom backend are also covered in the same comment block if you'd rather use one of those.

## 9. Deploying the website online

This is a static site, so any static host works. Two easy, free options:

**Netlify**
1. Create a free account at netlify.com.
2. Drag the whole `MySellWeb` folder onto the Netlify dashboard, or connect a GitHub repo containing it.
3. Netlify gives you a live URL immediately. Add a custom domain from the site settings once you own one.

**Vercel**
1. Create a free account at vercel.com.
2. Import the project folder or a connected GitHub repo.
3. Deploy, then attach a custom domain the same way.

Either way, once you're live, update the `og:url` meta tags and any hard-coded domain references across the HTML files to match your real domain.

## 10. Pre-launch checklist

- [ ] Replace `your@email.com` everywhere with your real email
- [ ] Replace Instagram and LinkedIn placeholder links with your real profiles (or remove them)
- [ ] Replace "MySellWeb" with your real studio name across every page, including `<title>` tags
- [ ] Update the Open Graph URLs once you have a real domain
- [ ] Replace portfolio placeholder screenshots with real project images (or keep them as concept work, clearly labelled)
- [ ] Update the About page if any personal detail needs adjusting
- [ ] Confirm prices in `index.html` and `services.html` match
- [ ] Connect the contact form to Formspree, Netlify Forms or your own backend
- [ ] Test the mobile menu, all links and the form on a real phone
- [ ] Run the site through a Lighthouse check in Chrome DevTools for performance and accessibility
- [ ] Deploy, then click through every page and link on the live URL
