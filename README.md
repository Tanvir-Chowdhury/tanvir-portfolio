# Tanvir portfolio — GitHub Pages

React + Vite, entirely static. The deployment repository is
`Tanvir-Chowdhury/tanvir-portfolio`; its default/deployment branch is `main`.

Production URL: https://tanvir-chowdhury.github.io/tanvir-portfolio/

Vite's `base` is `/tanvir-portfolio/` in `vite.config.ts`, in development and
production. Imported assets are rewritten by Vite; public asset URLs in React
must use `import.meta.env.BASE_URL`. Do not use `/assets/...` or `/kage/...`.

## Develop and verify

Use Node.js 22 (22.12 or later) and npm:

```sh
npm ci
npm run dev
# http://localhost:8080/tanvir-portfolio/
npm run build
npm run verify:pages
npm run preview
# http://localhost:4173/tanvir-portfolio/
```

`dist/` is the complete publishable site and is ignored by Git. The asset audit
checks the generated HTML, CSS and bundle references, including the locally
bundled Three.js runtime, portrait and fonts. It rejects a leftover Kage demo.

For a test without Vite's SPA fallback, serve a parent directory containing
`dist` under the name `tanvir-portfolio` with any static HTTP server. A Python
HTTP server is sufficient for local verification; no server ships to Pages.

## GitHub settings and deployment

1. Open https://github.com/Tanvir-Chowdhury/tanvir-portfolio/settings/pages.
2. Under **Build and deployment → Source**, select **GitHub Actions** (not
   deployment from the old `gh-pages` branch).
3. For the repository-based URL above, leave **Custom domain** empty. If a
   custom domain is currently configured, deliberately remove it only if the
   repository-based URL is the desired canonical destination.
4. Ensure repository Actions are enabled and official `actions/*` actions are
   allowed. If the `github-pages` environment restricts branches, allow `main`.
5. Commit these source changes and push to `main`, or run **Deploy to GitHub
   Pages** manually from the Actions tab on `main`.
6. Wait for both `build` and `deploy` jobs to succeed. Open the deployment URL
   shown by the deploy job. No PAT or custom deployment secret is needed.

`.github/workflows/deploy.yml` follows Vite's official Pages workflow:
https://vite.dev/guide/static-deploy.html#github-pages. It uses `npm ci`, builds,
audits `dist`, uploads a Pages artifact, and deploys with `pages: write` and
`id-token: write`. Deployments are serialized rather than interrupted. Manual
runs from other branches may build but cannot deploy.

## Routes and content

The portfolio is one continuous page at `/tanvir-portfolio/`. HashRouter handles
unknown routes with a 404 view whose home link stays inside the repository.
Section links use native scrolling without overwriting the router hash.

Portfolio content lives in `src/data/content.ts`. Contact opens an email draft
in the visitor's mail app. Legacy API, login and admin files are retained but
are not imported into the static site. Portfolio fonts are bundled locally
from Fontsource; their licenses are in `public/licenses/`.

## Cinematic portfolio

Kage was a motion reference, not a separate destination. The demo button,
iframe, route and copied template assets have been removed.

- `CinematicScene.tsx`: a rounded Three.js neon sculpture with volumetric glow,
  moving from right to left and toward the viewer as the page scrolls on desktop
  and mobile, plus subtle desktop pointer parallax. It sits behind the content.
  Loaded as a separate local bundle, rendered on demand with a
  1.5 pixel ratio cap, and paused in hidden tabs.
- `ChapterFlow.tsx`: native-scroll progress, chapter navigation, hero departure,
  and project stack progression; no wheel interception or scroll hijacking.
- `Projects.tsx`: three featured stories with a sticky desktop stack, followed
  by the remaining archive. All 21 projects and category filters remain.

The existing portrait, typography, amber/purple palette and content are kept.
The desktop portrait dots and photo share the same image fit and dimensions.
Mobile uses the static portrait and normal document flow, with a centered footer
below its scrolling text strip. Reduced motion keeps the neon sculpture static
and removes hero pinning and project stacking. CSS atmosphere and readable
content remain available if WebGL cannot initialize.

## Production verification

```sh
npm run build
npm run verify:pages
npx tsc --noEmit -p tsconfig.app.json
```

Check the production output under the repository subpath on a plain static
server, then verify the deployment at the live URL:

- The home page loads directly and after refresh; there is no Explore Kage link.
- Desktop: scroll through the pinned hero and project stack; the neon sculpture
  sweeps left and approaches through the entire page on desktop and mobile,
  including reverse scrolling.
- About, Work and Contact navigation reaches the correct section; chapter links
  work with both pointer and keyboard input.
- All project filters work and project details open with Enter or Space.
- At narrow widths, all content fits and the mobile menu opens/closes normally.
- Reduced motion leaves content visible without the 3D animation or pinning.
- Unknown routes (`#/missing`) recover through Return to Home.
- No missing local bundles, fonts or images, and no requests to the old backend.

Push changes to `main` and confirm both workflow jobs succeed before treating
that revision as deployed. The production server is GitHub Pages; the local
Vite and Python servers are only development/verification tools.
