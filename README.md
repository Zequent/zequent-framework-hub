# Zequent Framework Hub

Developer hub, landing page, and documentation site for the Zequent autonomous robotics framework..



## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm start
```

## Documentation Sync

SDK documentation lives in a separate repository ([zequent-framework-docs](https://github.com/Zequent/zequent-framework-docs)) and is pulled into this project automatically.

### How it works

The sync process clones the docs repo, converts each markdown file into a proper Next.js page, and places it under `src/app/docs/sdk/`. This means:

- Raw `.md` files become routable `page.mdx` files inside their own directories
- YAML frontmatter is converted to JS metadata exports that the MDX pipeline expects
- File names are turned into URL-friendly slugs (e.g. `QUICKSTART.md` becomes `/docs/sdk/client/quickstart`)
- The rehype plugin automatically extracts section headings for sidebar navigation

The result is that documentation written in the external repo shows up in the docs site with full navigation, syntax highlighting, and search support -- without any manual copying or formatting.

### Automatic sync (CI)

A GitHub Actions workflow runs every 6 hours and on manual trigger. It executes the sync script and commits any changes. See `.github/workflows/sync-docs.yml`.

### Manual sync (local development)

```bash
npm run sync-docs
```

This runs `scripts/sync-docs.sh` which does the same conversion locally. The `prebuild` hook also runs it before every production build.

### Adding new documentation

To add more docs, commit them to the [zequent-framework-docs](https://github.com/Zequent/zequent-framework-docs) repository. They will be picked up on the next sync cycle. If you add a new folder in the docs repo, update the sync script to handle it and add corresponding entries to the navigation in `src/components/docs/Navigation.tsx`.

### Configuration

The sync script and workflow are configured to pull from:

- Repository: `https://github.com/Zequent/zequent-framework-docs`
- Branch: `main`
- Schedule: every 6 hours (`0 */6 * * *`) (Can be edited due to requirements)

To change the sync frequency, edit the cron expression in `.github/workflows/sync-docs.yml`.
