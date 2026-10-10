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
checks the actual generated HTML, CSS and bundle references and confirms that
Kage's Three.js runtime, 14 WebP images and embedded fonts are included.

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

- `/tanvir-portfolio/` — portfolio.
- `/tanvir-portfolio/#/kage` — Kage in a full-height iframe with portfolio navigation.
- `/tanvir-portfolio/kage/` — standalone Kage document, also refreshable.
- `/tanvir-portfolio/kage/#pathways` — native Kage section link.
- Unknown hash routes show a 404 view whose home link stays within the repository.

React routes use `HashRouter`: share `#/kage`, not `/kage` as a React route.
GitHub Pages does not rewrite arbitrary URL paths to `index.html`.
Portfolio section links scroll in place; they do not replace the router hash.

Portfolio content lives in `src/data/content.ts`. It no longer fetches project
or experience data from the legacy backend. Contact opens an email draft in
the visitor's mail application; they review and send it there. Legacy API,
login and admin source files are retained but are not imported into the site.
Portfolio fonts are bundled from Fontsource with npm; Kage fonts are embedded.

## Kage source and assets

Vendored from the MIT-licensed `@designcodeio/threeui@1.2.0` npm package:
`lib-dist/assets/landing-pages/kage.html` and `secret-pathways-assets/`.
Reference: https://threeui.com/landing-pages/kage-landing-page.
The license is preserved in `public/kage/LICENSE.txt`; the HTML is renamed to
`public/kage/index.html`. These are source assets, not generated build output.
All references inside the authored HTML remain document-relative, so Vite can
copy the directory intact. The iframe uses `BASE_URL + 'kage/'`. No remote
ThreeUI iframe, runtime CDN or external image storage is needed.

When updating Kage, keep the HTML, `secret-pathways-assets/`, fonts and runtime
together. Run the build/audit and test both the iframe and standalone document.
The demo is credited to ThreeUI and is separate from Tanvir's authored work.

## Production acceptance checks

After deployment, repeat these checks at the live URL (a local build alone does
not prove that repository permissions or Pages settings are correct):

- Load the home page and refresh `#/kage` and `kage/` directly.
- Confirm the browser network panel shows no missing local files and no calls
  to the old portfolio backend or ThreeUI asset hosts.
- Scroll the portfolio, use Work/Contact navigation, and open project details.
- Enter Kage, wait for its loader, scroll its chapters and test its menu.
- Test mobile widths and return to the portfolio from the iframe route.
- Check the unknown route `#/missing` and its Return to Home link.

The public Pages URL already existed during setup; these local changes must be
pushed and successfully deployed before that URL can validate this revision.
