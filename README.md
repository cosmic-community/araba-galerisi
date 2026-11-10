# Araba Galerisi - Premium Otomobil Showroom
![App Preview](https://imgix.cosmicjs.com/0eea2440-dcf5-11f1-83c6-9160013cbdca-autopilot-photo-1503376780353-7e6692767b70-1794308050044.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, dark, premium Turkish-language car dealership website built with Next.js 16 and [Cosmic](https://www.cosmicjs.com). Cars, reviews, blog posts and site settings are all managed in your Cosmic bucket.

## Features

- 🏎️ Hero section with a sports car, powered by Site Ayarları
- 🚗 Featured cars grid on the homepage
- 🔎 Car listing with brand, price, fuel type and year filters, plus sorting
- 🖼️ Car detail page with image gallery, specs table and customer reviews
- 📰 Blog/news section with category filter (Posts and Categories)
- ℹ️ About page and 📞 Contact page with a form
- 📱 Fully responsive, dark premium design
- 🇹🇷 All UI text in Turkish

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6af2f690dd6b09cd5e179fe1&clone_repository=6af2f8d0dd6b09cd5e17a08d)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online store with products (including images, pricing, description, and inventory status), product categories, and customer reviews.
>
> User instructions: Turkish-language car showcase / car dealership example website. Pages: homepage with a hero section featuring a sports car, featured cars grid, car listing page with filters (brand, price, fuel type, year), car detail page with image gallery, specs (engine, horsepower, transmission, fuel, mileage, price), a blog/news section about cars using the existing Posts and Categories, an About page and a Contact page with a form. Modern, dark, premium automotive design, fully responsive, all UI text in Turkish."

### Code Generation Prompt

> Build a Next.js application for an online business called "Araba Galerisi". The content is managed in Cosmic CMS with the following object types: cars, reviews, site-settings. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: Turkish-language car showcase / car dealership example website. Pages: homepage with a hero section featuring a sports car, featured cars grid, car listing page with filters (brand, price, fuel type, year), car detail page with image gallery, specs (engine, horsepower, transmission, fuel, mileage, price), a blog/news section about cars using the existing Posts and Categories, an About page and a Contact page with a form. Modern, dark, premium automotive design, fully responsive, all UI text in Turkish.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org) (App Router, Server Components)
- React 19
- TypeScript (strict)
- Tailwind CSS 3 with the Typography plugin
- [Cosmic](https://www.cosmicjs.com/docs) headless CMS (`@cosmicjs/sdk`)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed
- A Cosmic bucket with the `cars`, `reviews`, `site-settings`, `posts` and `categories` object types

### Installation

```bash
bun install
# set COSMIC_BUCKET_SLUG, COSMIC_READ_KEY and COSMIC_WRITE_KEY in your environment
bun run dev
```

## Cosmic SDK Examples

```typescript
// Fetch all cars with connected objects
const { objects } = await cosmic.objects
  .find({ type: 'cars' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

// Reviews for a single car (query by object id)
const { objects: reviews } = await cosmic.objects
  .find({ type: 'reviews', 'metadata.car': carId })
  .depth(1)
```

## Cosmic CMS Integration

| Object type | Used for |
| --- | --- |
| `cars` | Listing, filters, detail page, featured grid |
| `reviews` | Homepage testimonials and per-car reviews |
| `site-settings` | Hero, about content, contact details |
| `posts` / `categories` | Blog and news section |

Contact form submissions are validated by `/api/contact`. To forward messages by e-mail, connect a provider such as Resend inside `app/api/contact/route.ts`.

## Deployment Options

- **Vercel:** import the repository and add `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY` and `COSMIC_WRITE_KEY` in Project Settings → Environment Variables.
- **Netlify:** use the Next.js runtime and set the same environment variables in the site settings.
<!-- README_END -->