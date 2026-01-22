# RepsForReels Blog Documentation

A comprehensive guide to the SEO-optimized blog system for repsforreels.app.

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Writing Blog Posts](#writing-blog-posts)
4. [SEO Features](#seo-features)
5. [Content Strategy](#content-strategy)
6. [Components Reference](#components-reference)
7. [Deployment](#deployment)
8. [Maintenance](#maintenance)

---

## Overview

The RepsForReels blog is built with:
- **SvelteKit** — Framework
- **mdsvex** — Markdown + Svelte components
- **Tailwind CSS** — Styling with typography plugin
- **Cloudflare Pages** — Hosting

### Key Features
- Static site generation (SSG) for optimal performance
- Automatic SEO optimization (meta tags, schema.org)
- RSS feed at `/rss.xml`
- Dynamic sitemap at `/sitemap.xml`
- Category and tag pages
- Table of contents generation
- Related posts algorithm
- Newsletter subscription integration
- Social sharing buttons

---

## Architecture

### Directory Structure

```
website/
├── src/
│   ├── content/
│   │   └── blog/                    # Blog posts (Markdown)
│   │       ├── post-slug.md
│   │       └── another-post.md
│   │
│   ├── lib/
│   │   └── blog/                    # Blog module
│   │       ├── index.ts             # Module exports
│   │       ├── types.ts             # TypeScript types
│   │       ├── utils.ts             # Utility functions
│   │       ├── seo.ts               # SEO/schema generators
│   │       ├── layouts/
│   │       │   └── BlogPost.svelte  # mdsvex layout
│   │       └── components/
│   │           ├── BlogCard.svelte
│   │           ├── AuthorCard.svelte
│   │           ├── TableOfContents.svelte
│   │           ├── ShareButtons.svelte
│   │           ├── RelatedPosts.svelte
│   │           ├── NewsletterCTA.svelte
│   │           ├── CategoryFilter.svelte
│   │           ├── Breadcrumbs.svelte
│   │           └── index.ts
│   │
│   └── routes/
│       ├── blog/
│       │   ├── +page.svelte         # Blog listing
│       │   ├── +page.server.ts      # Data loading
│       │   ├── [slug]/
│       │   │   ├── +page.svelte     # Individual post
│       │   │   └── +page.ts         # Post loading
│       │   ├── category/
│       │   │   └── [category]/
│       │   │       ├── +page.svelte
│       │   │       └── +page.server.ts
│       │   └── tag/
│       │       └── [tag]/
│       │           ├── +page.svelte
│       │           └── +page.server.ts
│       │
│       ├── rss.xml/
│       │   └── +server.ts           # RSS feed endpoint
│       │
│       └── sitemap.xml/
│           └── +server.ts           # Sitemap endpoint
│
└── static/
    └── blog/
        ├── images/                   # Blog post images
        └── authors/                  # Author avatars
```

### Tech Stack Details

| Component | Technology |
|-----------|------------|
| Markdown Processing | mdsvex |
| Syntax Highlighting | Shiki |
| Heading Links | rehype-slug + rehype-autolink-headings |
| Typography | @tailwindcss/typography |
| Schema.org | Custom JSON-LD generators |

---

## Writing Blog Posts

### Creating a New Post

1. Create a new `.md` file in `src/content/blog/`
2. Use a URL-friendly filename: `my-post-title.md`
3. Add frontmatter metadata
4. Write your content in Markdown

### Frontmatter Template

```yaml
---
title: "Your Post Title — Make It Compelling"
description: "A 150-160 character description for SEO and social sharing."
date: "2026-01-22"
updated: "2026-01-23"  # Optional, for updates
author: "Aman Verma"
authorTitle: "Founder, RepsForReels"
authorImage: "/blog/authors/aman.webp"
authorTwitter: "@repsforreels"
category: "Screen Time"  # Must match a valid category
tags: ["doomscrolling", "screen time", "tips"]
image: "/blog/images/your-image.webp"
imageAlt: "Descriptive alt text for accessibility and SEO"
readTime: 8
wordCount: 1800
featured: false  # Set true for homepage feature
pinned: false    # Set true to pin to top
draft: false     # Set true to hide in production
---

Your content here...
```

### Available Categories

| Category | Slug | Use For |
|----------|------|---------|
| Screen Time | `screen-time` | Tips on managing screen time, doomscrolling |
| Exercise & Fitness | `exercise-fitness` | Workout guides, fitness motivation |
| Digital Wellness | `digital-wellness` | Healthier tech relationships |
| Product Updates | `product-updates` | RepsForReels features, news |
| Research & Studies | `research` | Data-driven content, statistics |
| Success Stories | `success-stories` | User testimonials, transformations |
| Tips & Guides | `tips-and-guides` | How-to content, practical advice |

### Markdown Features

#### Standard Markdown
```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text** and *italic text*

- Bullet list
- Another item

1. Numbered list
2. Second item

[Link text](https://example.com)

![Alt text](/path/to/image.webp)

> Blockquote for callouts

`inline code`
```

#### Code Blocks
```markdown
\`\`\`javascript
const example = "syntax highlighted";
\`\`\`
```

#### Tables
```markdown
| Column 1 | Column 2 |
|----------|----------|
| Data     | Data     |
```

#### Svelte Components in Markdown
You can import and use Svelte components:

```markdown
<script>
  import CustomComponent from '$lib/components/CustomComponent.svelte';
</script>

Regular markdown content...

<CustomComponent prop="value" />

More markdown...
```

---

## SEO Features

### Automatic SEO Optimization

Every blog post automatically gets:

1. **Meta Tags**
   - Title, description, keywords
   - Open Graph (Facebook, LinkedIn)
   - Twitter Cards
   - Canonical URL

2. **Schema.org JSON-LD**
   - Article schema
   - Breadcrumb schema
   - Author information
   - Publisher (organization) data

3. **Technical SEO**
   - Static HTML generation (fast loading)
   - Semantic HTML structure
   - Automatic heading anchors
   - Sitemap inclusion

### SEO Best Practices Checklist

For each blog post:

- [ ] Title includes primary keyword
- [ ] Description is 150-160 characters
- [ ] First-person titles when applicable ("I tried...", "How I...")
- [ ] Image has descriptive alt text
- [ ] Internal links to related posts
- [ ] External links to sources
- [ ] Headings use H2 and H3 (not H1 in content)
- [ ] Target keyword appears in first 100 words

### Image Guidelines

| Type | Dimensions | Format | Location |
|------|------------|--------|----------|
| Hero image | 1200x630 | WebP | `/static/blog/images/` |
| Content images | 800px wide max | WebP | `/static/blog/images/` |
| Author avatar | 200x200 | WebP | `/static/blog/authors/` |
| OG image | 1200x630 | WebP | Same as hero or custom |

---

## Content Strategy

### Pillar-Cluster Model

Organize content into topic clusters for topical authority:

```
PILLAR: Complete Guide to Beating Screen Time Addiction
├── Cluster: I Cut My Screen Time From 9 Hours to 2 Hours
├── Cluster: 11 Best Apps to Stop Doomscrolling
├── Cluster: Doomscrolling Statistics 2026
├── Cluster: What Happens to Your Brain When You Doomscroll
└── Cluster: How to Do a Digital Detox
```

### Content Types to Create

| Type | Purpose | Example |
|------|---------|---------|
| Personal Story | E-E-A-T, relatability | "How I cut my screen time..." |
| Listicle | SEO, shareability | "11 best apps to stop..." |
| Data Post | Authority, backlinks | "50 statistics about..." |
| How-To Guide | Practical value | "How to do a digital detox" |
| Comparison | Commercial intent | "RepsForReels vs Opal vs Forest" |
| Research Deep Dive | Authority | "The psychology of phone addiction" |

### Recommended Publishing Cadence

| Phase | Frequency | Focus |
|-------|-----------|-------|
| Launch (Month 1-2) | 3x/week | Build content base |
| Growth (Month 3-6) | 2x/week | Fill cluster gaps |
| Maintenance (Month 6+) | 1-2x/week | New topics, refresh old |

### Keyword Targets

**Primary (High Priority)**
- best apps to stop doomscrolling
- how to stop doomscrolling
- screen time blocker app
- phone addiction apps

**Secondary (Growing)**
- digital wellness apps
- exercise motivation apps
- reduce screen time

**Branded (Own)**
- repsforreels
- reps for reels app
- exercise to unlock phone

---

## Components Reference

### BlogCard

Displays a blog post preview in the listing.

```svelte
<BlogCard post={post} featured={false} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| post | ProcessedBlogPost | required | Post data object |
| featured | boolean | false | Larger card variant |

### TableOfContents

Auto-generates TOC from H2/H3 headings.

```svelte
<TableOfContents />
```

- Collapsible on mobile
- Sticky sidebar on desktop
- Highlights active section while scrolling

### ShareButtons

Social sharing for the current post.

```svelte
<ShareButtons
  url="https://repsforreels.app/blog/my-post"
  title="My Post Title"
  description="Post description"
/>
```

### NewsletterCTA

Email signup component.

```svelte
<NewsletterCTA />
```

**Note:** Update the `handleSubmit` function in `NewsletterCTA.svelte` to integrate with your actual newsletter provider.

### RelatedPosts

Shows related articles based on category and tags.

```svelte
<RelatedPosts posts={relatedPostsArray} title="Related Articles" />
```

### CategoryFilter

Category navigation tabs.

```svelte
<CategoryFilter activeCategory="screen-time" />
```

### Breadcrumbs

Navigation breadcrumbs.

```svelte
<Breadcrumbs items={[
  { name: 'Blog', href: '/blog' },
  { name: 'Category', href: '/blog/category/screen-time' },
  { name: 'Post Title' }
]} />
```

---

## Deployment

### Build Command

```bash
cd website
npm run build
```

### Preview Locally

```bash
npm run preview
```

### Deploy to Production

The site deploys automatically via GitHub CI/CD:

```bash
# From repo root
git subtree push --prefix=website website main
```

This pushes changes to the `atlasly322/repsforreels-website` repo, which triggers Cloudflare Pages deployment.

### Pre-Deployment Checklist

- [ ] Run `npm run build` locally to catch errors
- [ ] Check all images exist in `/static/blog/`
- [ ] Verify no `draft: true` posts are published
- [ ] Test RSS feed renders correctly
- [ ] Verify sitemap includes new posts

---

## Maintenance

### Regular Tasks

**Weekly**
- Publish new blog posts
- Check analytics for top performers
- Monitor Google Search Console for issues

**Monthly**
- Update statistics posts with fresh data
- Review and update outdated content
- Check for broken links

**Quarterly**
- Audit content against keyword rankings
- Identify content gaps
- Update meta descriptions for underperforming posts

### Adding a New Category

1. Edit `src/lib/blog/types.ts`:
   ```typescript
   export type BlogCategory =
     | 'Screen Time'
     | 'Your New Category'  // Add here
     // ...

   export const BLOG_CATEGORIES = [
     // ...
     {
       name: 'Your New Category',
       slug: 'your-new-category',
       description: 'Description for SEO'
     }
   ];
   ```

2. Create a pillar post for the new category
3. Plan 8-12 cluster articles

### Updating Author Information

Edit the frontmatter in individual posts, or create an authors config file for consistency.

Default author avatar is generated from initials using DiceBear API.

### Image Optimization

Convert images to WebP before adding:

```bash
# Using ImageMagick
convert input.jpg -quality 80 output.webp

# Using cwebp
cwebp -q 80 input.jpg -o output.webp
```

Recommended tools:
- [Squoosh](https://squoosh.app/) — Browser-based
- [ImageOptim](https://imageoptim.com/) — Mac app

---

## Troubleshooting

### Common Issues

**Build fails with mdsvex error**
- Check frontmatter YAML is valid
- Ensure no tabs in YAML (use spaces)
- Verify all required fields present

**Post not showing in listing**
- Check `draft` is not `true`
- Verify date is not in the future
- Run `npm run build` to regenerate

**Images not loading**
- Confirm image exists in `/static/blog/images/`
- Check path starts with `/blog/images/`
- Verify WebP is correctly generated

**RSS feed empty**
- Ensure at least one post exists
- Check posts are not all drafts
- Rebuild the site

### Getting Help

1. Check this documentation
2. Review existing posts for examples
3. Check browser console for errors
4. Review build output for warnings

---

## Quick Reference

### Creating a Post (Checklist)

1. [ ] Create file: `src/content/blog/url-slug.md`
2. [ ] Add complete frontmatter
3. [ ] Write content with H2/H3 structure
4. [ ] Add hero image to `/static/blog/images/`
5. [ ] Set appropriate category and tags
6. [ ] Include internal links to related posts
7. [ ] Cite sources with external links
8. [ ] Run local build to verify
9. [ ] Commit and push to deploy

### File Naming Convention

```
# Posts
how-i-did-something.md        # Personal stories
10-best-apps-for-x.md         # Listicles
topic-statistics-2026.md      # Data posts
complete-guide-to-topic.md    # Pillar pages

# Images
topic-name-hero.webp          # Hero images
topic-name-comparison.webp    # Content images
```

### Frontmatter Quick Copy

```yaml
---
title: ""
description: ""
date: "2026-01-22"
author: "Aman Verma"
authorTitle: "Founder, RepsForReels"
authorImage: "/blog/authors/aman.webp"
authorTwitter: "@repsforreels"
category: "Screen Time"
tags: []
image: "/blog/images/.webp"
imageAlt: ""
readTime:
wordCount:
featured: false
---
```

---

## Resources

- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [mdsvex Documentation](https://mdsvex.pngwn.io/docs)
- [Tailwind Typography](https://tailwindcss.com/docs/typography-plugin)
- [Schema.org Article](https://schema.org/Article)
- [Google Search Central](https://developers.google.com/search/docs)

---

*Last updated: January 22, 2026*
