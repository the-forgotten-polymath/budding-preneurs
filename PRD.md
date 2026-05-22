# 📄 Product Requirements Document (PRD)
## Buddingpreneurs — Member Platform with Lead & Conversion Tracking

---

**Document Version:** 1.0  
**Status:** Ready for Development  
**Platform:** Web (existing site — feature overlay)  
**Prepared For:** Buddingpreneurs Dev Team  
**Last Updated:** May 2026

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Goals & Success Metrics](#2-goals--success-metrics)
3. [User Personas](#3-user-personas)
4. [System Architecture Overview](#4-system-architecture-overview)
5. [Feature Set — Detailed Specifications](#5-feature-set--detailed-specifications)
   - 5.1 Public Member Profile Page
   - 5.2 Action Layer (Conversion Triggers)
   - 5.3 Digital Visiting Card (V-Card System)
   - 5.4 Member Dashboard
   - 5.5 Vendor Directory (Discovery Engine)
   - 5.6 Lead Tracking System
   - 5.7 Conversion Tracking System
   - 5.8 Admin Analytics Dashboard
   - 5.9 Trust & Credibility Layer
6. [Data Models](#6-data-models)
7. [API Endpoints](#7-api-endpoints)
8. [Non-Functional Requirements](#8-non-functional-requirements)
9. [Implementation Phases (Roadmap)](#9-implementation-phases-roadmap)
10. [Out of Scope (v1)](#10-out-of-scope-v1)
11. [Open Questions & Decisions](#11-open-questions--decisions)

---

## 1. Executive Summary

Buddingpreneurs is a membership-based directory platform for early-stage entrepreneurs and small business owners (primarily sellers). The platform needs to evolve from a **static digital brochure directory** into a **full-cycle marketplace + CRM-lite + analytics engine**.

The core problem:

> *"Can I know whether members are getting clients or not?"*

This PRD defines the complete feature set to answer that question — reliably, scalably, and with real data — through three tracking levels: **activity tracking**, **lead tracking**, and **conversion tracking**.

---

## 2. Goals & Success Metrics

### Business Goals

| Goal | Metric | Target (3 months post-launch) |
|---|---|---|
| Increase member retention | Renewal rate | ≥ 60% |
| Prove platform ROI | Leads generated / member / month | ≥ 5 |
| Justify membership fee | Avg. conversions / member / month | ≥ 1 |
| Reduce churn | Member-reported satisfaction | ≥ 4/5 |

### Product Goals

| Goal | How Measured |
|---|---|
| Members can see profile activity | Dashboard view count, click count |
| Members can manage incoming leads | Leads inbox in dashboard |
| Admin can see platform-wide performance | Admin analytics panel |
| Visitors can discover members easily | Directory with filter/sort |

---

## 3. User Personas

### Persona 1 — The Seller Member (Primary)
- **Who:** Small business owner, freelancer, home entrepreneur (e.g., interior designer, fashion seller, digital marketer)
- **Goal:** Get discovered, receive inquiries, convert to paying clients
- **Pain Point:** No visibility into whether their profile is working
- **Needs:** Profile, leads inbox, conversion tracking, shareable V-card

### Persona 2 — The Buyer/Visitor (Secondary)
- **Who:** Someone looking for a service or product in a local/niche category
- **Goal:** Find a trusted seller, get in touch quickly
- **Pain Point:** Too many options, no trust signals
- **Needs:** Filtered directory, seller profile with reviews, fast contact CTA

### Persona 3 — The Platform Admin (Internal)
- **Who:** Buddingpreneurs team / client
- **Goal:** Understand platform health, prove value to members, identify top performers
- **Needs:** Admin dashboard, export capabilities, member management

---

## 4. System Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                  BUDDINGPRENEURS PLATFORM                │
├─────────────────┬──────────────────┬────────────────────┤
│   PUBLIC LAYER  │   MEMBER LAYER   │    ADMIN LAYER     │
│                 │                  │                    │
│ - Directory     │ - Dashboard      │ - Analytics Panel  │
│ - Profile Pages │ - Leads Inbox    │ - Member Manager   │
│ - Search/Filter │ - Conversion Log │ - Export Reports   │
│ - V-Card View   │ - Profile Editor │ - Featured Mgmt    │
└─────────────────┴──────────────────┴────────────────────┘
          ↓                 ↓                  ↓
┌─────────────────────────────────────────────────────────┐
│                     TRACKING ENGINE                      │
│  Profile Views | CTA Clicks | Form Leads | Conversions  │
└─────────────────────────────────────────────────────────┘
          ↓                 ↓
┌──────────────────┐  ┌─────────────────────────────────┐
│    DATABASE      │  │         NOTIFICATION LAYER       │
│ Members, Leads,  │  │  Email alerts | WhatsApp notify  │
│ Events, Sessions │  │  (new lead received)             │
└──────────────────┘  └─────────────────────────────────┘
```

---

## 5. Feature Set — Detailed Specifications

---

### 5.1 Public Member Profile Page

**URL Pattern:** `/member/{username}`

**Purpose:** SEO-optimized, conversion-focused public-facing page for each seller.

#### Layout Sections

| Section | Details |
|---|---|
| **Hero Banner** | Cover/brand image (1200×400px recommended), overlaid with profile photo (circular, 120px) |
| **Identity Block** | Business name, category badge, city, member since, verified badge (if applicable) |
| **About / USP** | Rich-text description field (500 char max displayed, expandable). Focused on value proposition, not generic bio. |
| **Product / Service Catalog** | Grid of cards: image + title + short description + optional price range. Max 12 items in v1. |
| **Action Layer** | Sticky CTA block (see 5.2) |
| **Social Links** | Instagram, Facebook, YouTube, Website — icon row |
| **Location** | Optional — shows city/area (not full address) for trust |
| **Reviews** | Star rating + text reviews (Phase 2) |

#### SEO Requirements

- Page title: `{Business Name} — {Category} in {City} | Buddingpreneurs`
- Meta description: auto-generated from "About" field
- Open Graph tags for WhatsApp/social sharing
- Canonical URL on profile page
- Structured data: `LocalBusiness` schema markup

#### Profile Completeness Indicator

Display a **% complete** bar visible only to the logged-in member:

- Profile photo: 15%
- Banner: 10%
- About (min 100 chars): 20%
- At least 1 product/service: 20%
- Phone/WhatsApp: 15%
- Social links (1+): 10%
- Category + City: 10%

---

### 5.2 Action Layer (Conversion Triggers)

**Purpose:** Every profile must have clear, tracked conversion points. This is the core monetization proof layer.

#### CTA Components (Sticky on Mobile, Sidebar on Desktop)

| CTA | Behavior | Tracking Event |
|---|---|---|
| 📞 **Call** | Opens `tel:` link | `event: call_click` |
| 💬 **WhatsApp** | Opens `https://wa.me/{number}?text=Hi+I+found+you+on+Buddingpreneurs+(Member+ID:+{id})` | `event: whatsapp_click` |
| 📩 **Inquiry Form** | Opens modal form (see below) | `event: form_open`, `event: form_submit` |
| 🔗 **Website** | Opens external link in new tab | `event: website_click` |
| 📇 **Save Contact** | Downloads .vcf or opens V-Card modal | `event: vcard_download` |

#### Inquiry Form Fields

```
Name*         [text input]
Phone*        [tel input — 10 digits]
Requirement*  [textarea — 200 chars max]
Budget        [optional dropdown: <5k / 5k–20k / 20k–50k / 50k+]
Source        [hidden — auto-filled: "Profile Page"]
Member ID     [hidden — auto-filled]
Timestamp     [hidden — auto-filled]
```

#### WhatsApp Pre-filled Message Template

```
Hi, I found you on Buddingpreneurs (Ref: BP-{memberID}).
I'm interested in your {category} services.
Could we connect?
```

> This allows the seller to manually identify platform-sourced leads even outside the system.

---

### 5.3 Digital Visiting Card (V-Card System)

**Purpose:** Allow members to share their profile as a digital business card — offline and online.

#### Features

| Feature | Details |
|---|---|
| **Shareable Link** | `buddingpreneurs.com/member/{username}` — copyable with one click |
| **QR Code** | Auto-generated QR that links to profile. Downloadable as PNG. |
| **Save Contact (.vcf)** | Generates vCard 3.0 file with: Name, Phone, Email, Website, Category, Company |
| **Share Sheet** | Native browser share API (mobile) + copy link fallback |

#### QR Code Spec

- Format: PNG, 400×400px minimum
- Contains: `https://buddingpreneurs.com/member/{username}`
- Member can download and print on physical materials

#### View Count on V-Card Shares

Track separately:
- `vcard_qr_scan` — QR code scan event
- `vcard_link_share` — link copied event
- `vcard_download` — .vcf file downloaded

---

### 5.4 Member Dashboard (Private)

**URL:** `/dashboard` (authenticated)

**Purpose:** Give each member a private analytics and lead management workspace.

#### Dashboard Sections

##### A. Stats Overview (Top Cards)

| Card | Data Shown | Period |
|---|---|---|
| 👁️ Profile Views | Total unique views | This month / All time |
| 💬 WhatsApp Clicks | Total clicks | This month / All time |
| 📞 Call Clicks | Total clicks | This month / All time |
| 📩 Leads Received | Total inquiry form submissions | This month / All time |
| ✅ Conversions | Member-marked as "Got Client" | This month / All time |
| 📊 Conversion Rate | (Conversions / Leads) × 100 | This month |

##### B. Activity Chart

- Line chart: Profile views over last 30 days
- Bar chart: CTA clicks breakdown (WhatsApp / Call / Form / Website)
- Granularity: Daily

##### C. Leads Inbox

Table view of all received inquiries:

| Column | Details |
|---|---|
| Date | Submission timestamp |
| Name | Visitor name |
| Phone | Masked: `98XXXX1234` — clickable to reveal (logged as `lead_phone_reveal`) |
| Requirement | Short text |
| Budget | If filled |
| Status | New / Contacted / Converted / Not Relevant |
| Actions | Mark as Converted, Archive |

> **Note:** Phone number is masked by default to prevent data harvesting. Reveal is logged.

##### D. Profile Editor

Fields editable from dashboard (no admin approval needed for content, but image uploads go through basic moderation queue):

- Profile photo
- Banner image
- Business name
- Category (from predefined list)
- About / USP text
- Product/Service catalog (add/edit/delete items)
- Contact details (phone, WhatsApp, email)
- Social links
- City / Location

##### E. V-Card & QR Section

- View current QR code
- Download QR as PNG
- Copy shareable link
- Download .vcf file

---

### 5.5 Vendor Directory (Discovery Engine)

**URL:** `/directory` or `/find`

**Purpose:** Buyers discover sellers. This is the top-of-funnel for lead generation.

#### Filter Panel

| Filter | Type | Options |
|---|---|---|
| Category | Multi-select dropdown | Interior Design, Fashion, Digital Marketing, Food, Beauty, Education, Finance, Legal, etc. (admin-managed list) |
| City | Searchable dropdown | Free text with autocomplete |
| Budget Range | Range slider | ₹0 – ₹1,00,000+ |
| Verified | Toggle | Verified members only |

#### Sort Options

| Sort | Logic |
|---|---|
| ⭐ Featured | Paid featured members first (admin-managed) |
| 👁️ Most Viewed | Highest profile views this month |
| 🆕 Recently Joined | `created_at` DESC |
| 📩 Most Active | Highest lead count (proxy for popularity) |

#### Member Card (Directory Listing)

```
┌─────────────────────────────────┐
│  [Profile Photo]  Business Name │
│                   Category • City│
│  Short about (truncated 80 char) │
│                                  │
│  ⭐ 4.5  •  Verified ✅           │
│  [WhatsApp]  [Inquiry]  [Profile]│
└─────────────────────────────────┘
```

#### Pagination / Infinite Scroll

- 12 cards per page (desktop), 8 (mobile)
- Option: infinite scroll (preferred for engagement)

#### SEO for Directory

- Directory page title: `Find {Category} Sellers in {City} | Buddingpreneurs`
- Each filter combination generates a unique, crawlable URL: `/directory?category=fashion&city=delhi`
- Sitemap includes all member profile URLs

---

### 5.6 Lead Tracking System

**Purpose:** Capture, store, and display every inquiry or contact intent as a structured lead.

#### Lead Sources Tracked

| Source | Trigger |
|---|---|
| `inquiry_form` | Form submission on profile page |
| `whatsapp_click` | Click on WhatsApp CTA |
| `call_click` | Click on Call CTA |
| `website_click` | Click on external website link |
| `vcard_download` | .vcf download |
| `qr_scan` | QR code scan (tracked via redirect URL) |

> Note: WhatsApp and Call clicks are **intent signals** (Level 1). Only form submissions are **qualified leads** (Level 2).

#### Lead Object

```json
{
  "lead_id": "LID-20260521-00123",
  "member_id": "MID-00456",
  "source": "inquiry_form",
  "visitor_name": "Rahul Sharma",
  "visitor_phone": "9876543210",
  "requirement": "Need interior design for 2BHK",
  "budget": "50k-1L",
  "status": "new",
  "created_at": "2026-05-21T14:32:00Z",
  "updated_at": "2026-05-21T14:32:00Z",
  "converted": false,
  "deal_value": null,
  "notes": ""
}
```

#### Lead Status Flow

```
New → Contacted → [Converted ✅ | Not Relevant ❌ | Lost 🔴]
```

Members update status manually from their dashboard.

#### Notifications

| Trigger | Channel | Message |
|---|---|---|
| New lead received | Email to member | "You have a new inquiry from Rahul Sharma" |
| New lead received | WhatsApp to member (optional Phase 2) | Same message |

---

### 5.7 Conversion Tracking System

**Purpose:** Allow members to self-report client conversions, creating a closed-loop ROI measurement.

#### Conversion Toggle

From the Leads Inbox, the member can:
1. Click **"Mark as Converted"** on any lead
2. Optional: Enter deal value (₹ amount)
3. Optional: Add a private note

This updates:
- `lead.converted = true`
- `lead.deal_value = ₹XXXX`
- `member.conversion_count += 1`

#### Why Self-Reported?

Fully automated conversion tracking (e.g., via payment confirmation) is not feasible in v1 since transactions happen offline. Self-reporting with optional deal value is the pragmatic v1 solution.

> In v2, a "Referral Code" system or payment integration can replace/supplement self-reporting.

#### Conversion Rate Display

```
Conversion Rate = (Converted Leads / Total Form Leads) × 100
```

Shown in:
- Member dashboard
- Admin panel (per member + aggregate)

---

### 5.8 Admin Analytics Dashboard

**URL:** `/admin/analytics` (admin-only)

**Purpose:** Give the Buddingpreneurs team a complete picture of platform health.

#### Top-Level Metrics (Summary Cards)

| Metric | Description |
|---|---|
| Total Members | Active member count |
| Total Profile Views | Platform-wide (this month / all time) |
| Total Leads Generated | Form submissions across all members |
| Total Conversions | Self-reported across all members |
| Avg. Conversion Rate | Platform average |
| Top Performing Category | Most leads generated by category |

#### Charts

| Chart | Type | Details |
|---|---|---|
| Platform Activity | Line | Daily profile views over 30/90 days |
| Leads by Category | Bar | Which categories generate most leads |
| Conversion Funnel | Funnel | Views → Clicks → Leads → Conversions |
| Top Members | Table | Ranked by: Views / Leads / Conversions |

#### Member Management Table

Columns:
- Member name
- Category
- City
- Join date
- Plan (Free / Basic / Premium / Featured)
- Profile views (this month)
- Leads received (this month)
- Conversions (this month)
- Status (Active / Suspended / Expired)
- Actions: View profile, Edit, Suspend, Mark Featured

#### Export

- Export any table to CSV
- Export date-range reports
- Export: "Member performance report" (PDF, Phase 2)

#### Featured Member Management

Admin can:
- Mark/unmark members as Featured (appears first in directory)
- Set featured duration (date range)
- View current featured slots used

---

### 5.9 Trust & Credibility Layer

**Purpose:** Give buyers confidence. Trust signals directly impact lead-to-conversion rates.

#### Verified Member Badge ✅

- Admin manually approves verification
- Criteria (internal, not shown to member): ID proof uploaded + active membership
- Shown on: Profile page, directory card

#### Top Performer Tag 🏆

- Auto-assigned by system based on:
  - ≥ 10 leads received in last 30 days
  - ≥ 3 conversions in last 30 days
  - Active member
- Refreshes monthly

#### Reviews & Ratings ⭐ (Phase 2)

- Buyers who submitted an inquiry can leave a review (invite-only via email after 7 days)
- 1–5 star rating + optional text
- Admin moderation before publish
- Aggregate rating shown on profile + directory card

#### "Recently Active" Indicator

- Show a green dot or "Active this week" label if member logged into dashboard in last 7 days
- Increases buyer confidence that the seller is responsive

---

## 6. Data Models

### Members Table

```sql
members (
  id              UUID PRIMARY KEY,
  username        VARCHAR(50) UNIQUE,
  business_name   VARCHAR(100),
  category_id     INT FK → categories,
  city            VARCHAR(100),
  about           TEXT,
  phone           VARCHAR(15),
  whatsapp        VARCHAR(15),
  email           VARCHAR(100),
  website_url     VARCHAR(255),
  instagram_url   VARCHAR(255),
  facebook_url    VARCHAR(255),
  profile_photo   VARCHAR(255),   -- S3/CDN URL
  banner_image    VARCHAR(255),
  is_verified     BOOLEAN DEFAULT FALSE,
  is_featured     BOOLEAN DEFAULT FALSE,
  featured_until  DATE,
  plan            ENUM('free', 'basic', 'premium'),
  status          ENUM('active', 'suspended', 'expired'),
  created_at      TIMESTAMP,
  updated_at      TIMESTAMP
)
```

### Products/Services Table

```sql
products (
  id          UUID PRIMARY KEY,
  member_id   UUID FK → members,
  title       VARCHAR(100),
  description TEXT,
  image_url   VARCHAR(255),
  price_min   DECIMAL(10,2),
  price_max   DECIMAL(10,2),
  currency    VARCHAR(5) DEFAULT 'INR',
  is_active   BOOLEAN DEFAULT TRUE,
  sort_order  INT,
  created_at  TIMESTAMP
)
```

### Events Table (Activity Tracking)

```sql
events (
  id          UUID PRIMARY KEY,
  member_id   UUID FK → members,
  event_type  ENUM('profile_view', 'whatsapp_click', 'call_click',
                   'website_click', 'form_open', 'form_submit',
                   'vcard_download', 'qr_scan', 'lead_phone_reveal'),
  session_id  VARCHAR(100),   -- anonymous visitor session
  source      VARCHAR(50),    -- referrer: 'directory', 'direct', 'whatsapp_share', etc.
  ip_hash     VARCHAR(64),    -- hashed for privacy
  created_at  TIMESTAMP
)
```

### Leads Table

```sql
leads (
  id              UUID PRIMARY KEY,
  member_id       UUID FK → members,
  visitor_name    VARCHAR(100),
  visitor_phone   VARCHAR(15),
  requirement     TEXT,
  budget          VARCHAR(50),
  source          ENUM('inquiry_form', 'whatsapp_click', 'call_click', 'qr_scan'),
  status          ENUM('new', 'contacted', 'converted', 'not_relevant', 'lost'),
  converted       BOOLEAN DEFAULT FALSE,
  deal_value      DECIMAL(10,2),
  notes           TEXT,
  created_at      TIMESTAMP,
  updated_at      TIMESTAMP
)
```

### Reviews Table (Phase 2)

```sql
reviews (
  id          UUID PRIMARY KEY,
  member_id   UUID FK → members,
  lead_id     UUID FK → leads,  -- ensures only real inquirers can review
  rating      TINYINT CHECK (1–5),
  review_text TEXT,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMP
)
```

---

## 7. API Endpoints

### Public

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/members/{username}` | Fetch public profile data |
| GET | `/api/directory` | List members with filter/sort params |
| POST | `/api/leads` | Submit inquiry form |
| POST | `/api/events` | Log tracking event (view, click) |
| GET | `/api/members/{username}/qr` | Get QR code image |
| GET | `/api/members/{username}/vcard` | Download .vcf file |

### Member (Authenticated)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/me/dashboard` | Dashboard stats summary |
| GET | `/api/me/events?range=30d` | Activity chart data |
| GET | `/api/me/leads` | Leads inbox |
| PATCH | `/api/me/leads/{id}` | Update lead status / mark converted |
| PUT | `/api/me/profile` | Update profile fields |
| POST | `/api/me/products` | Add product/service |
| PATCH | `/api/me/products/{id}` | Edit product |
| DELETE | `/api/me/products/{id}` | Delete product |

### Admin (Admin-only)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/stats` | Platform-level analytics |
| GET | `/api/admin/members` | All members with filters |
| PATCH | `/api/admin/members/{id}` | Edit member (plan, status, featured) |
| GET | `/api/admin/leads` | All leads (platform-wide) |
| GET | `/api/admin/export/members` | CSV export |
| GET | `/api/admin/export/leads` | CSV export |

---

## 8. Non-Functional Requirements

### Performance

| Requirement | Target |
|---|---|
| Profile page load time | < 2 seconds (LCP) |
| Directory page load | < 2.5 seconds |
| Dashboard data load | < 1.5 seconds |
| Event logging (fire & forget) | Non-blocking, async |

### Security

- All authentication via JWT (short-lived access token + refresh token)
- Phone numbers stored encrypted at rest
- Masked by default in UI (reveal is logged)
- Rate limiting on `/api/leads` endpoint: 5 submissions / IP / hour
- CORS restricted to `buddingpreneurs.com`
- Admin routes protected by role check middleware

### Privacy

- IP addresses stored as SHA-256 hash (never raw)
- No personal data of visitors stored without consent
- Inquiry form includes: *"Your details will be shared with the seller."*
- Cookie/session consent banner for tracking (DPDP Act compliance, India)

### Scalability

- Events table will grow fast — partition by `created_at` monthly
- Use background jobs for dashboard aggregations (not real-time queries on every load)
- Cache member profile data (Redis or edge caching) — TTL 5 minutes

### Accessibility

- WCAG 2.1 AA compliance
- All CTA buttons have ARIA labels
- Color contrast ratio ≥ 4.5:1
- Mobile-first responsive design

---

## 9. Implementation Phases (Roadmap)

### Phase 1 — MVP (Weeks 1–4)

**Goal:** Get tracking + leads working on existing website.

- [ ] Member profile page (enhanced with Action Layer)
- [ ] Inquiry form with lead storage
- [ ] WhatsApp CTA with pre-filled message + member ID
- [ ] Basic event logging (profile views, CTA clicks)
- [ ] Member dashboard (stats cards + leads inbox)
- [ ] V-Card: shareable link + QR code
- [ ] Vendor directory with basic filters

**Exit Criteria:** Members can receive leads and see basic stats.

---

### Phase 2 — Growth Layer (Weeks 5–8)

**Goal:** Add conversion tracking + admin visibility.

- [ ] Lead status management (New → Converted flow)
- [ ] "Mark as Converted" with deal value
- [ ] Admin analytics dashboard
- [ ] Export to CSV
- [ ] Profile completeness indicator
- [ ] "Top Performer" auto-tag
- [ ] Email notification on new lead
- [ ] Activity chart (line/bar) in dashboard

**Exit Criteria:** Admin can answer "Are members getting clients?" with real data.

---

### Phase 3 — Trust + Retention (Weeks 9–12)

**Goal:** Increase buyer trust and member stickiness.

- [ ] Reviews & ratings system
- [ ] "Recently Active" indicator
- [ ] Budget range filter in directory
- [ ] Featured member slot management (admin)
- [ ] Monthly performance report email to members
- [ ] Profile SEO audit tool (internal)
- [ ] WhatsApp notification for new leads (Twilio/WATI integration)

---

### Phase 4 — Monetisation Layer (Post-Week 12)

- [ ] Tiered membership plans (Free / Basic / Premium)
- [ ] Featured listing as paid upgrade
- [ ] Referral system (member refers buyer → tracked)
- [ ] Analytics upgrade (traffic source breakdown)
- [ ] Mobile app (PWA first, then native)

---

## 10. Out of Scope (v1)

The following are explicitly **not** in scope for Phase 1–2:

- Payment gateway integration
- In-platform messaging/chat between buyer and seller
- Video profiles or reels
- Automated WhatsApp message sending (bot)
- Rating system (Phase 3)
- Native mobile app
- Multi-language support
- AI-powered profile recommendations
- Bulk member import via CSV

---

## 11. Open Questions & Decisions

| # | Question | Owner | Decision Needed By |
|---|---|---|---|
| 1 | Should conversion tracking be self-reported only, or can we add a "Deal Confirmed by Buyer" flow? | Product | Before Phase 2 start |
| 2 | Should phone number be fully hidden until the seller "unlocks" the lead (like JustDial)? | Business | Before Phase 1 dev |
| 3 | What is the initial category list for the directory? (Admin-managed or member-typed free text?) | Admin | Before Phase 1 dev |
| 4 | How are spam leads handled? (CAPTCHA on inquiry form?) | Dev | Before Phase 1 dev |
| 5 | Will the platform support membership payments itself, or is billing handled offline? | Business | Before Phase 4 |
| 6 | Who does content moderation on product images and profile photos? | Ops | Before Phase 1 launch |
| 7 | What is the maximum number of product/service items per member per plan tier? | Business | Before Phase 1 dev |

---

## Appendix — WhatsApp Tracking Reference

### Pre-filled Message Strategy

Every WhatsApp CTA opens this URL:

```
https://wa.me/91{phone}?text=Hi%2C+I+found+you+on+Buddingpreneurs+%28Ref%3A+BP-{memberID}%29.+I%27m+interested+in+your+{category}+services.+Could+we+connect%3F
```

This allows sellers to:
1. Know the lead came from Buddingpreneurs
2. Reference the member ID for any platform disputes
3. Track manually even without the platform's CRM

---

## Appendix — Event Tracking Reference Sheet

| Event Name | Trigger | Data Logged |
|---|---|---|
| `profile_view` | Any visit to `/member/{username}` | member_id, session_id, source (referrer), timestamp |
| `whatsapp_click` | Click on WhatsApp CTA | member_id, session_id |
| `call_click` | Click on Call CTA | member_id, session_id |
| `website_click` | Click on Website link | member_id, session_id |
| `form_open` | Inquiry form opened | member_id, session_id |
| `form_submit` | Inquiry form submitted | member_id, lead_id |
| `vcard_download` | .vcf downloaded | member_id, session_id |
| `qr_scan` | QR redirect followed | member_id, session_id |
| `lead_phone_reveal` | Member clicks to reveal phone in leads inbox | member_id, lead_id |
| `share_link_copy` | Member copies shareable profile link | member_id |

---

*End of PRD — Buddingpreneurs Member Platform v1.0*

*This document should be treated as a living spec. All feature decisions and scope changes must be version-tracked.*