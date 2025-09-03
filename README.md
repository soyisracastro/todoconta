# Todoconta Landing Page

This is the official landing page for **Todoconta**, a provider of accounting services and tax consulting in Mexico. This project was migrated from WordPress to Astro to create a fast, SEO-friendly, and secure user experience.

The live site can be found at [todoconta.com](https://todoconta.com).

## ✨ Key Features

- **Modern Tech Stack**: Built with [Astro](https://astro.build/) and TypeScript for optimal performance and developer experience.
- **SEO Focused**: Features extensive 301 redirects to preserve SEO ranking from the previous WordPress site, sitemap generation, and security headers.
- **Content-Driven**: Uses Astro's type-safe Content Collections (`src/content/`) to manage services and products using Markdown files.
- **Optimized for Performance**: Implements features like inlined stylesheets, esbuild for minification, and HTML compression.
- **Developer Experience**: Comes with pre-configured ESLint, Prettier, and TypeScript type-checking for code quality and consistency.

## 🚀 Project Structure

The project follows a standard Astro directory structure:

- `src/pages`: Contains all site pages, utilizing Astro's file-based routing. Dynamic routes like `[product].astro` are used for content collections.
- `src/components`: Reusable Astro components for UI elements (e.g., `Navbar.astro`, `ServiceCard.astro`).
- `src/layouts`: Defines the overall HTML structure for different page types (e.g., `LandingLayout.astro`).
- `src/content`: Manages all dynamic content. Each subdirectory (e.g., `products`, `services`) is a separate collection defined in `src/content/config.ts`.
- `src/styles`: Global CSS and style files.
- `public`: Stores all static assets like images, `robots.txt`, and the favicon.
- `astro.config.mjs`: The main Astro configuration file, containing site settings, redirects, and build optimizations.

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/)
- **Language**: TypeScript
- **Code Quality**: [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)

## 📦 Available Scripts

You can use the following npm scripts to work with the project:

- `npm run dev`: Starts the development server at `http://localhost:4321`.
- `npm run build`: Builds the static site for production into the `dist/` directory.
- `npm run preview`: Serves the production build locally to preview it before deployment.
- `npm run type-check`: Runs `astro check` to validate types across the project.
- `npm run format`: Formats all relevant files using Prettier.
- `npm run lint`: Lints the codebase with ESLint to find and fix problems.

## Repository

The source code is hosted on GitHub: [https://github.com/iscasur/todoconta.git](https://github.com/iscasur/todoconta.git)

## 📄 License

This project is licensed under the MIT License.
