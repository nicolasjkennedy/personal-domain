# Personal Website

A minimalist black-and-white personal website built with Next.js, TypeScript, and Tailwind CSS. Features an animated dot field background and halftone portrait processing for an editorial, modern aesthetic.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open [http://localhost:3000/personal-domain/](http://localhost:3000/personal-domain/)** in your browser.
   
   **Note:** The site is configured for GitHub Pages deployment under `/personal-domain/`, so local development also uses this path. For production deployment to a custom domain, remove `basePath` and `assetPrefix` from `next.config.mjs`.

## How to Edit Content

All content is stored in a single file: **`src/content/site.ts`**

### What to Update:

1. **Personal Information:**
   - `name`: Your full name
   - `headline`: Your professional headline
   - `summary`: Array of 2-4 bullet points about yourself
   - `location`: Your location
   - `currently`: Your current role/school

2. **Social Links:**
   - Update URLs in the `socials` object:
     - `linkedin`: Your LinkedIn profile URL
     - `github`: Your GitHub profile URL (optional)
     - `email`: Your email (use `mailto:your.email@example.com`)
     - `resume`: Path to your resume PDF (e.g., `/Nicolas_Kennedy_resume_cursor.pdf`)
     - `website`: Your personal website URL (optional)

3. **Hero Photo:**
   - Add your photo to the `public` folder named exactly `me.jpg` (e.g., `public/me.jpg`)
   - The `Portrait` component will automatically apply halftone/dithered processing
   - The image will be converted to high-contrast black-and-white with editorial texture

4. **Education:**
   - Edit the `education` array with your schools, degrees, dates, and highlights

5. **Experience:**
   - Edit the `experience` array with your work history
   - Add tech stack tags in the `tech` array for each role (optional)

6. **Projects:**
   - Update the `projects` array with your projects
   - Set `featured: true` for projects you want to highlight in the featured section
   - Add links (GitHub, live demo, case study) in the `links` object
   - Use `#` as placeholder links if projects are not yet live

7. **Certifications:**
   - Update the `certifications` array with your certifications
   - Add `credentialLink` if you have a verification URL (optional)

## How to Deploy

### Deploy to GitHub Pages

This project is configured for static export and GitHub Pages deployment. The GitHub Actions workflow is already set up in `.github/workflows/deploy.yml`.

**Important:** The `basePath` in `next.config.mjs` is set to `/personal-domain/`. This means:
- Your GitHub repository should be named `personal-domain` (or update the `basePath` in `next.config.mjs` to match your repository name)
- Your site will be available at: `https://<username>.github.io/personal-domain/`

**Steps to deploy:**

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Configure GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - The workflow will automatically run on every push to `main`

3. **Access your site:**
   After the workflow completes (usually 1-2 minutes), your site will be available at:
   `https://<username>.github.io/personal-domain/`

**Note:** If your repository has a different name, update the `basePath` and `assetPrefix` in `next.config.mjs` to match your repository name (e.g., if your repo is `my-portfolio`, change both to `/my-portfolio/`).

### Deploy to Vercel

1. **Push your code to GitHub** (same as above)

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Next.js settings
   - **Important:** Remove `basePath` and `assetPrefix` from `next.config.mjs` for Vercel deployment
   - Click "Deploy"

### Other Deployment Options

- **Netlify:** Similar to Vercel, connect your GitHub repo (remove basePath for Netlify)
- **Self-hosted:** Build with `npm run build` and serve the `out/` directory with any static file server

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata & DotFieldBackground
│   ├── page.tsx            # Main page with all sections
│   └── globals.css          # Global styles
├── components/
│   ├── Navigation.tsx      # Sticky navigation bar
│   ├── DotFieldBackground.tsx  # Animated canvas dot field background
│   ├── Portrait.tsx         # Halftone portrait processing component
│   ├── AnimateOnScroll.tsx  # Scroll-triggered animations
│   └── sections/           # Section components
│       ├── Hero.tsx        # Hero section with portrait
│       ├── Education.tsx
│       ├── Experience.tsx
│       ├── Projects.tsx
│       ├── Certifications.tsx
│       └── Contact.tsx
├── lib/
│   └── imageProcessing.ts  # Halftone/dither image processing utilities
├── src/
│   └── content/
│       └── site.ts         # All content data (EDIT THIS!)
└── public/                 # Static assets
    ├── me.jpg              # Your portrait photo (required)
    └── *.pdf               # Resume PDF
```

## Customization

### Colors
The site uses a strict black-and-white palette. Colors are defined in `app/globals.css`:
- Background: `#0a0a0a` (off-black)
- Foreground: `#f5f5f5` (near-white)
- All text and borders use white/gray opacity variations

### Typography
- Headings: Inter (sans-serif) - bold, tight tracking
- Body: Inter (sans-serif) - light weight, relaxed leading
- Monospace: System monospace (for dates, tech tags, metadata)

### Background Effects
- **DotFieldBackground**: Animated canvas with thousands of drifting dots
  - Configurable in `app/layout.tsx` via props
  - Respects `prefers-reduced-motion`
  - Mouse interaction repels nearby dots

### Portrait Processing
- **Portrait Component**: Applies halftone/dithered editorial effect
  - High contrast black-and-white conversion
  - Grain texture for print feel
  - Processing options in `components/sections/Hero.tsx`
  - Fallback to CSS filters if processing fails

### Spacing
The design uses generous whitespace. Adjust padding/margins in component files if needed.

## Build & Production

```bash
# Build for production (creates static export in out/ directory)
npm run build

# For local testing of static export:
# After building, serve the out/ directory with any static server:
# npx serve out

# Lint code
npm run lint
```

**Note:** This project uses static export (`output: "export"`), so `npm start` is not available. The build creates a fully static site in the `out/` directory that can be served by any static file server.

## Notes

- **Portrait Image**: Place your photo at `public/me.jpg` for automatic halftone processing
- **Resume PDF**: Place your resume PDF in the `public` folder and update the path in `site.ts`
- The site is fully responsive and accessible (WCAG compliant)
- SEO metadata is configured in `app/layout.tsx`
- Smooth scrolling is enabled for anchor links
- All animations respect `prefers-reduced-motion` preference
- The dot field background is performance-optimized with requestAnimationFrame

## Features

- ✅ Minimalist black-and-white editorial design
- ✅ Animated dot field background (3,000-15,000 dots)
- ✅ Halftone portrait processing with high contrast
- ✅ Smooth scroll navigation
- ✅ Fully responsive (mobile-first)
- ✅ Accessibility best practices
- ✅ Performance optimized
- ✅ SEO ready
