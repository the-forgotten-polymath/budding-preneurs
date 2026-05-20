# Hutch — Interior Design Website
## UI/UX Design Specification Document
 
---
 
## 1. Brand Overview
 
| Property | Value |
|----------|-------|
| **Brand Name** | Hutch |
| **Tagline** | *Creating Interiors That Inspire Living* |
| **Industry** | Interior Design Studio |
| **Tone** | Warm, Sophisticated, Modern, Professional |
| **Target Audience** | Homeowners, Real Estate Developers, Commercial Clients |
 
---
 
## 2. Color Palette
 
| Role | Color Name | Hex Code | Usage |
|------|-----------|----------|-------|
| **Primary Brand** | Burnt Orange / Terracotta | `#C9540A` | Logo, CTAs, accent headings |
| **Dark Heading** | Charcoal Black | `#1A1A1A` | Main headings, body text |
| **Background** | Off-White / Warm White | `#FAF8F5` | Page background |
| **Accent Italic** | Deep Amber Orange | `#D4600C` | Italic highlights in headings |
| **Card Background** | Light Warm Gray | `#F4F1ED` | Service cards, feature blocks |
| **CTA Button** | Terracotta Orange | `#C9540A` | Primary buttons |
| **CTA Text** | White | `#FFFFFF` | Button labels |
| **Secondary Text** | Medium Gray | `#6B6B6B` | Subheadings, paragraph text |
| **Footer Background** | Deep Charcoal | `#1C1C1C` | Footer section |
| **Border/Divider** | Soft Warm Gray | `#E8E4DF` | Card borders, dividers |
| **Testimonial BG** | Rich Dark Brown | `#2C1F14` | Testimonials section overlay |
 
---
 
## 3. Typography
 
### Font Families
 
| Role | Font | Style | Weight |
|------|------|-------|--------|
| **Logo** | Custom Sans-Serif (lowercase) | Regular | 600 |
| **Hero Display** | Bold Sans-Serif (e.g., Bebas Neue / Oswald) | Uppercase | 900 |
| **Section Headings** | Serif or Semi-Serif (e.g., Playfair Display) | Mixed Italic | 700 |
| **Body Text** | Clean Sans-Serif (e.g., DM Sans / Nunito) | Regular | 400 |
| **Navigation** | Clean Sans-Serif | Regular | 400–500 |
| **CTA / Labels** | Sans-Serif | Medium | 500–600 |
 
### Type Scale
 
| Element | Size | Weight | Notes |
|---------|------|--------|-------|
| Hero Headline | `80–100px` | 900 | Uppercase, full-width display |
| Section Title | `32–40px` | 700 | Mixed Roman + Italic words |
| Card Title | `18–20px` | 600 | — |
| Body Paragraph | `15–16px` | 400 | Line-height: 1.7 |
| Navigation | `14px` | 400 | Letter-spacing: 0.02em |
| Buttons | `13–14px` | 600 | Uppercase or Sentence case |
| Stats / Numbers | `36–40px` | 800 | Bold, brand color |
| Caption/Meta | `12px` | 400 | Muted gray |
 
### Typographic Style Rule
> Headings combine **roman** (regular weight) and ***italic + colored*** words for visual emphasis.
> Example: *"We are a* **interior** *design studio* functional, *and timeless spaces designed to* **look** *beautiful..."*
 
---
 
## 4. Layout & Grid System
 
```
Max Content Width : 1280px
Gutters           : 24px (desktop), 16px (mobile)
Column System     : 12-column grid
Section Padding   : 80px top/bottom (desktop), 48px (mobile)
Card Gaps         : 20–24px
Border Radius     : 12px (cards), 8px (buttons), 4px (tags)
```
 
---
 
## 5. Page Sections — Full Breakdown
 
---
 
### 5.1 Navigation Bar
 
**Layout:** Horizontal, full-width, sticky on scroll
 
| Element | Detail |
|---------|--------|
| Logo | `hutch` in lowercase, warm brand color |
| Nav Links | Home · About us · Project · Blogs · Contact Us |
| Active State | Pill/capsule highlight on active nav item (terracotta bg, white text) |
| CTA Button | `Start Project →` — Terracotta background, white text, rounded |
| Position | Fixed top, white background, subtle bottom border on scroll |
 
---
 
### 5.2 Hero Section
 
**Layout:** Two-column — Left (text + image), Right (unused / full bleed image)
 
| Element | Detail |
|---------|--------|
| Eyebrow Text | None — straight to headline |
| Main Headline | `HUTCH` in giant display type (charcoal) + "Creating **Interiors** That Inspire Living" stacked beside |
| Sub-headline Style | Word "Interiors" in italic terracotta color |
| CTA Link | `VIEW PORTFOLIO →` underlined link, small caps |
| Hero Image | Full-width photo of a modern living room (green feature wall, pendant lights, blue sofa) |
| Play Button | Circular white play button centered on the image (video preview) |
| Image Style | Rounded corners (16px), full bleed to edges |
 
---
 
### 5.3 Who We Are — Intro Strip
 
**Layout:** Single full-width paragraph, centered or left-aligned
 
| Element | Detail |
|---------|--------|
| Section Label | `Who we are` — small, gray, label style (rotated vertical or inline left) |
| Paragraph | Large body text: *"We are a **interior** design studio functional, and timeless spaces designed to **look** beautiful and feel inspiring for modern living and work."* |
| Italic Highlights | Words "interior" and "look" in italic terracotta |
| Weight Mix | Regular + Bold mixed in one sentence for rhythm |
 
---
 
### 5.4 Our Services Section
 
**Layout:** Section header + 4-column card grid
 
**Section Header:**
- Left: `Our` (roman) + `Services` (italic, terracotta)
- Right: Navigation arrows `< >`
**Service Cards (×4):**
 
| # | Icon | Service Name | Description |
|---|------|-------------|-------------|
| 1 | 🏠 Home icon | **Residential Design** | Full-service design for family homes, apartments, and villas tailored to personal style |
| 2 | 🏢 Building icon | **Commercial Spaces** | Creating impactful environments for retail, hospitality, and public spaces |
| 3 | 💼 Office icon | **Office Design** | Productive and innovative workspace solutions that enhance employee well-being |
| 4 | 🛋️ Furniture icon | **Custom Furniture** | Bespoke furniture design and sourcing to ensure unique pieces that perfectly fit your space |
 
**Card Style:**
- Warm gray background (`#F4F1ED`)
- Icon at top left (line-style, terracotta color)
- Title in dark bold
- Description in gray, small body text
- `Read More` button — outlined style, small, bottom of card
- Rounded corners: `12px`
- Subtle drop shadow on hover
---
 
### 5.5 Quote + About Us Block
 
**Layout:** Two-column — Left (quote), Right (about us text + stats)
 
**Left — Pull Quote:**
```
"Design is not just
what it looks like
and feels like.
Design is how it
works."
```
- Dark background panel (deep charcoal or near-black)
- White text, large quotation mark
- Decorative abstract illustration (line art vase/plant)
**Right — About Us:**
- Label: `About Us` — small, italic, terracotta
- Heading: `Designing` (italic terracotta) + `Comfort With Your Modern` + `Home & Office` (italic terracotta)
- Body: 2-paragraph description of the studio philosophy
- Stats Row:
  | Stat | Value |
  |------|-------|
  | Projects | `500+` |
  | Years Exp | `12+` |
  | Awards | `49+` |
---
 
### 5.6 Featured Projects Section (Homepage Preview)
 
**Layout:** Tabs + 3-column image grid
 
**Filter Tabs:** `All Project` · `Residential` · `Commercial` · `Hospitality`
- Active tab: Terracotta background, white text, pill shape
**Project Cards (×6 in full grid):**
 
| Card Element | Style |
|-------------|-------|
| Thumbnail Image | Aspect ratio 4:3, rounded 12px corners |
| Project Tags | Small pills (bedroom count, type, etc.) |
| Project Title | e.g., *"Ivory Nest – A Modern Residential Interior Project"* |
| Stats Row | Floor area · Rooms · Status icons |
| Hover State | Slight scale + shadow lift |
 
---
 
### 5.7 Testimonials Section
 
**Layout:** Dark overlay section, full-width, asymmetric
 
| Element | Detail |
|---------|--------|
| Section BG | Rich dark brown / near-black with warm tones |
| Label | `Testimonials` — small all-caps, terracotta |
| Heading | `Voices of Appreciation` — white, serif italic |
| Stars | 4.5/5 rating with gold star icons |
| Review Text | Left-aligned testimonial body text in white/light gray |
| Reviewer Image | Circular avatar, bottom-left |
| Reviewer Name | Name + Role + "Global Top Interior Clients" |
| Background Image | Semi-transparent interior photo, right half |
| Navigation | Arrow buttons for carousel |
| Counter | `250+` clients in overlay badge |
 
---
 
### 5.8 Our Working Process
 
**Layout:** 4-step horizontal process with numbered steps
 
| Step | # | Title | Brief Description |
|------|---|-------|-------------------|
| Discovery | 01 | Discovery | Initial consultation to understand needs, style, and budget |
| Concept | 02 | Concept | Developing initial moodboards and layout ideas for approval |
| Design | 03 | Design | Detailed design with consultation on materials, finishes |
| Execution | 04 | Execution | Managing contractors, procurement, and installation |
 
**Style:**
- Steps numbered with large `01` `02` `03` `04` in muted gray
- Active step highlighted in terracotta
- Horizontal connector line between steps
- Each step has an icon + title + description below
---
 
### 5.9 FAQ Section
 
**Layout:** Two-column — Left (heading + image), Right (accordion)
 
**Left:**
- Label: `FAQ`
- Heading: `Frequently Asked Questions?`
- Image: Interior photo (lamp/moody lighting)
**Right — Accordion Questions:**
1. Is this skincare suitable for all skin types?
2. Are your products safe for sensitive skin?
3. How long does it take to see visible results?
4. Are your products made with natural ingredients?
5. Can I use these products every day?
> *(Note: FAQ content in original appears to be placeholder from a different template; should be replaced with interior design FAQs)*
 
**Suggested Interior Design FAQs:**
1. How long does a typical interior design project take?
2. What is included in your design consultation?
3. Do you work on both residential and commercial projects?
4. How do you handle project budgets and pricing?
5. Can I see examples of your completed projects?
**Accordion Style:**
- Question row with `+` / `−` toggle icon
- Expanded answer with smooth CSS transition
- Bottom border divider between items
- Active item has terracotta icon color
---
 
### 5.10 CTA Banner Section
 
**Layout:** Full-width banner, centered content
 
| Element | Detail |
|---------|--------|
| Background | Soft blurred lifestyle photo (warm tones) with dark overlay |
| Heading | `Start` (dark) + `Designing` (italic terracotta) + `Your Perfect Space To Life` |
| Subtext | "Book a free consultation and explore design solutions tailored specifically to your space, vision, and way of living." |
| Button | `Book a Free Consultation →` — white background, dark text, rounded pill |
 
---
 
### 5.11 Footer
 
**Layout:** Dark background, multi-column layout
 
| Column | Content |
|--------|---------|
| **Brand** | `hutch` logo (white) + short tagline + social icons (Facebook, Twitter, Instagram, LinkedIn) + Privacy/Terms links |
| **Quick Links** | Home · About · Project · Blogs · FAQ · Contact Us |
| **Product / Services** | Residential Design · Commercial Spaces · Office Design · Custom Furniture |
| **Newsletter** | Label + Email input field + `Subscribe` button |
| **Bottom Bar** | Copyright text |
 
**Footer Style:**
- Background: Deep charcoal `#1C1C1C`
- Text: White headers, light gray links
- Social icons: Circular, outlined
- Input field: Dark bordered, white text
---
 
## 6. Interactive Components
 
### Buttons
 
| Type | Style |
|------|-------|
| **Primary CTA** | Terracotta bg · White text · Rounded corners (8px) · Arrow icon |
| **Secondary / Outline** | White bg · Terracotta border · Terracotta text |
| **Ghost / Link** | Underlined · Terracotta color · Arrow →  |
| **Nav Active** | Terracotta bg · White text · Pill shape |
| **Filter Tab Active** | Terracotta bg · White text · Rounded pill |
| **Filter Tab Inactive** | White/transparent · Dark text · Rounded pill |
 
### Hover States
- Cards: `transform: translateY(-4px)` + `box-shadow` elevation
- Buttons: `opacity: 0.9` + subtle scale `1.02`
- Nav links: Underline slide-in from left
- Project images: Zoom `scale(1.05)` with overflow hidden
### Carousel / Slider
- Featured Projects: Horizontal scroll with arrows
- Testimonials: Fade + slide transition
- Services: Arrow-navigated (mobile swipeable)
---
 
## 7. Iconography
 
| Style | Detail |
|-------|--------|
| Type | Line icons (1.5px stroke weight) |
| Color | Terracotta (`#C9540A`) on cards; White on dark backgrounds |
| Size | 24×24px (nav/body), 32×32px (service cards) |
| Library Suggestion | Lucide Icons / Feather Icons / Phosphor Icons |
 
---
 
## 8. Imagery Guidelines
 
| Type | Style |
|------|-------|
| **Interior Photos** | High-resolution, warm-toned, natural light preferred |
| **Aspect Ratios** | Hero: 16:9 · Cards: 4:3 · About: 3:4 (portrait) |
| **Color Grading** | Warm, slightly desaturated — matches brand palette |
| **Overlays** | Dark gradient overlay for text readability on photo backgrounds |
| **Border Radius** | 12–16px on all image containers |
| **Avoid** | Cold/blue-toned photos, overly bright/white sterile spaces |
 
---
 
## 9. Spacing System (8pt Grid)
 
| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` | Icon padding, micro gaps |
| `--space-sm` | `8px` | Tag padding, tight spacing |
| `--space-md` | `16px` | Card padding, inline gaps |
| `--space-lg` | `24px` | Card gaps, grid gutters |
| `--space-xl` | `40px` | Section inner spacing |
| `--space-2xl` | `64px` | Between sections (mobile) |
| `--space-3xl` | `96px` | Between sections (desktop) |
 
---
 
## 10. Responsive Breakpoints
 
| Breakpoint | Width | Layout Changes |
|-----------|-------|----------------|
| **Mobile** | `< 640px` | Single column, stack everything, hamburger menu |
| **Tablet** | `640px – 1024px` | 2-column grid, collapsible nav |
| **Desktop** | `1024px – 1280px` | Full layout, 3–4 column grids |
| **Wide** | `> 1280px` | Max-width container centered, same as desktop |
 
---
 
## 11. Animation & Motion
 
| Element | Animation | Timing |
|---------|-----------|--------|
| Page Load Hero | Fade in + slide up | `600ms ease-out` |
| Section Reveal | Scroll-triggered fade + translateY | `400ms` staggered |
| Service Cards | Hover lift | `200ms ease` |
| Project Images | Hover zoom (scale 1.05) | `300ms ease` |
| Accordion | Height expand/collapse | `300ms cubic-bezier` |
| Carousel Slides | Horizontal slide | `500ms ease-in-out` |
| CTA Button | Pulse ring on hover | `600ms infinite` |
| Navbar | Background appear on scroll | `200ms` |
 
---
 
## 12. CSS Variables Reference
 
```css
:root {
  /* Colors */
  --color-primary:        #C9540A;
  --color-primary-dark:   #A8420A;
  --color-text-dark:      #1A1A1A;
  --color-text-gray:      #6B6B6B;
  --color-text-light:     #9A9A9A;
  --color-bg:             #FAF8F5;
  --color-bg-card:        #F4F1ED;
  --color-bg-dark:        #1C1C1C;
  --color-border:         #E8E4DF;
  --color-white:          #FFFFFF;
 
  /* Typography */
  --font-display:   'Bebas Neue', 'Oswald', sans-serif;
  --font-heading:   'Playfair Display', Georgia, serif;
  --font-body:      'DM Sans', 'Nunito', sans-serif;
 
  /* Spacing */
  --space-xs:  4px;
  --space-sm:  8px;
  --space-md:  16px;
  --space-lg:  24px;
  --space-xl:  40px;
  --space-2xl: 64px;
  --space-3xl: 96px;
 
  /* Borders */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-full: 999px;
 
  /* Shadows */
  --shadow-card: 0 4px 20px rgba(0, 0, 0, 0.08);
  --shadow-hover: 0 12px 40px rgba(0, 0, 0, 0.14);
 
  /* Transitions */
  --transition-fast:   200ms ease;
  --transition-normal: 300ms ease;
  --transition-slow:   500ms ease-in-out;
}
```
 
---
 
## 13. Recommended Tech Stack
 
| Layer | Recommendation |
|-------|---------------|
| **Framework** | Next.js 14 (React) or plain HTML/CSS/JS |
| **Styling** | Tailwind CSS + CSS Custom Properties |
| **Animations** | Framer Motion (React) or GSAP |
| **Icons** | Lucide React / Phosphor Icons |
| **Fonts** | Google Fonts — Playfair Display + DM Sans |
| **Image Optimization** | Next/Image (lazy loading, WebP) |
| **Carousel** | Swiper.js or Embla Carousel |
| **Accordion** | Radix UI Accordion or custom CSS |
| **CMS (optional)** | Sanity.io / Contentful for project portfolio |
 
---
 
## 14. Page Sections — Order Summary
 
```
1.  ── Navbar (Sticky)
2.  ── Hero Section (Display headline + hero image)
3.  ── Who We Are (Intro paragraph)
4.  ── Our Services (4 cards carousel)
5.  ── Quote + About Us (Split layout)
6.  ── Featured Projects (Tabbed grid gallery)
7.  ── Testimonials (Dark carousel section)
8.  ── Our Working Process (4-step timeline)
9.  ── FAQ (Accordion + image)
10. ── CTA Banner (Book a consultation)
11. ── Footer (Multi-column dark)
```
 
---
 
*Document prepared for the Hutch Interior Design Website Redesign Project.*
*All design decisions are based on the provided UI/UX reference mockup.*