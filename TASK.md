# TASK.md — notes.davishiggins.com

## Curated Notes — Premium Personal Writing Hub

  

---

  

## Vision

Build a cinematic, editorial-grade personal writing hub titled **"Curated Notes"** at `notes.davishiggins.com`. This is not a blog. It is a premium, motion-driven reading experience that feels like a cross between `landonorris.com` (bold editorial storytelling, scroll-driven reveals, large impactful typography), `labs.higginsd.com` (cinematic dark motion, high-performance feel), and `davishiggins.com` (DH brand identity, navy palette, gold accent, glassmorphism). The result should look like it cost $20,000 to build and make any recruiter or client who lands on it stop scrolling.

  

---

  

## Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript strict)

- **Styling**: Tailwind CSS v3

- **Animations**: Framer Motion + GSAP + ScrollTrigger

- **Smooth Scroll**: Lenis (`@studio-freight/lenis`)

- **Content**: Local MDX files + `gray-matter` + `next-mdx-remote`

- **Typography**: `@tailwindcss/typography`

- **Fonts**: `Syne` (display/headings — bold, geometric, editorial) + `Inter` (body)

- **Deployment**: Vercel → `notes.davishiggins.com` via Cloudflare CNAME

  

---

  

## File Structure

```

notes-davishiggins/

├── app/

│   ├── layout.tsx

│   ├── page.tsx                     # Feed page — hero + marquee + tag filter + note cards

│   └── notes/

│       └── [slug]/

│           └── page.tsx             # Individual note reading page

├── components/

│   ├── Header.tsx                   # Sticky header: DH logo left, back link right

│   ├── Hero.tsx                     # GSAP animated hero: "CURATED" + "NOTES" split reveal

│   ├── Marquee.tsx                  # Scrolling text marquee strip

│   ├── NoteCard.tsx                 # Feed card with Framer Motion hover animations

│   ├── TagFilter.tsx                # 'use client' — pill filter bar

│   ├── ReadingProgress.tsx          # Thin gold reading progress bar (note pages only)

│   ├── PageTransition.tsx           # Framer Motion page wipe transition

│   ├── CustomCursor.tsx             # Custom cursor ring + dot

│   └── Footer.tsx                  # Minimal footer with Bible verse

├── content/

│   └── notes/

│       ├── propify-breakdown.mdx

│       ├── crowncode-build.mdx

│       ├── kewaunee-dashboards.mdx

│       ├── ai-workflow-system.mdx

│       └── building-in-public.mdx

├── lib/

│   └── notes.ts

├── providers/

│   └── LenisProvider.tsx

├── public/

│   └── dh-logo.png

├── styles/

│   └── globals.css

├── tailwind.config.ts

├── next.config.ts

└── package.json

```

  

---

  

## Design System

  

### Colors (CSS Variables in globals.css)

```css

:root {

  --bg:            #05070b;

  --bg-card:       rgba(255,255,255,0.04);

  --bg-card-hover: rgba(255,255,255,0.07);

  --border:        rgba(255,255,255,0.08);

  --border-hover:  rgba(201,168,76,0.4);

  --gold:          #C9A84C;

  --gold-dim:      rgba(201,168,76,0.15);

  --text:          #f0f0f0;

  --text-muted:    rgba(255,255,255,0.4);

  --text-dim:      rgba(255,255,255,0.2);

  --blue:          #3B82F6;

  --green:         #10B981;

  --purple:        #8B5CF6;

  --amber:         #F59E0B;

}

```

  

### Background

- Base: `#05070b`

- CSS grain texture via `body::before` pseudo-element — SVG noise, `opacity: 0.03`, fixed, `pointer-events: none`, `z-index: 9999`

- Radial gradient: `radial-gradient(ellipse at 50% -20%, rgba(201,168,76,0.06) 0%, transparent 60%)` on `body`

  

### Typography

- **Display**: `Syne` (Google Font, weight 700/800) — hero, titles, labels

- **Body**: `Inter` (Google Font, weight 400/500) — all prose, meta, UI

- Hero title: `clamp(72px, 11vw, 160px)`, Syne 800

- Eyebrow labels: `10px`, `letter-spacing: 0.25em`, uppercase, Inter, muted

- Load both via `next/font/google`, inject as CSS variables into `layout.tsx`

  

---

  

## Component Specs

  

### Header.tsx (position: fixed, full width)

- Background: `rgba(5,7,11,0.85)` + `backdrop-filter: blur(20px)`

- Border bottom: `1px solid rgba(255,255,255,0.05)`

- Left: DH logo (white rounded box, 40px) + "DAVIS HIGGINS" in gold Syne 700 + "Curated Notes" in muted Inter 11px

- Right: `← davishiggins.com` — muted, hover gold underline, Framer Motion subtle x shift on hover

- Layout: `flex justify-between items-center px-8 py-4`

  

### Hero.tsx (GSAP — required, precise)

Full viewport height (`100dvh`). Dark bg. Content left-aligned, slightly off-center (not perfectly centered — editorial asymmetry like landonorris.com).

  

**GSAP timeline on mount:**

1. Eyebrow text (`"notes.davishiggins.com"`) — `from: { opacity: 0, y: 12 }`, delay 0.2s

2. `"CURATED"` — `from: { x: -120, opacity: 0 }`, duration 1s, ease `power3.out`, delay 0.3s

3. `"NOTES"` — `from: { x: 120, opacity: 0 }`, duration 1s, ease `power3.out`, delay 0.4s

4. Subtitle — `from: { opacity: 0, y: 16 }`, delay 0.6s

5. Scroll indicator — `from: { opacity: 0 }`, delay 1s

  

**Typography:**

- `"CURATED"` — Syne 800, `clamp(72px, 11vw, 160px)`, white, line-height 0.9

- `"NOTES"` — Syne 800, same size, gold `#C9A84C`, italic

- Subtitle: `"Thinking out loud on data science, AI, and building."` — Inter 16px, muted, max-width 480px

- Eyebrow: `"notes.davishiggins.com"` — 10px, uppercase, letter-spacing 0.25em, gold-dim

  

**ScrollTrigger hero exit:** As user scrolls, hero text `scale: 0.96`, `opacity: 0` — smooth cinematic push-away.

  

### Marquee.tsx

Between hero and feed. Full width strip.

- Top/bottom: `1px solid rgba(201,168,76,0.2)`

- Background: `rgba(255,255,255,0.02)`

- Text: `CURATED NOTES · DATA SCIENCE · AI · CHARLOTTE, NC · UNC CHARLOTTE · BUILDING IN PUBLIC · PROPIFY · CROWNCODE AI · HIGGINS DIGITAL ·` (repeated 2x)

- Font: Syne 700, 11px, uppercase, letter-spacing 0.15em, gold `#C9A84C`

- CSS `animation: marquee 32s linear infinite` — pause on hover

  

### TagFilter.tsx ('use client')

Pills: `All` `Projects` `Learning` `Systems` `Perspective` + count badge per tag

- Active: bg `#C9A84C`, text `#05070b`, Syne 700

- Inactive: transparent, border `rgba(255,255,255,0.12)`, muted text, Inter

- Hover: border → gold, text brightens, Framer Motion `whileHover={{ y: -2 }}`

- `useState` for active tag — filters `NoteCard` list client-side

  

### NoteCard.tsx

Single column, `max-width: 680px`, centered.

  

Structure per card:

```

[tag pill]  [read time]                      [formatted date]

[TITLE — Syne 700, 22px, white]

[excerpt — Inter 14px, muted, 2 lines max]

[→ Read note — small, gold]

──────────────────────────────────────────────────────────────

```

  

Framer Motion:

- Enter: `initial={{ opacity:0, y:24 }}` → `whileInView={{ opacity:1, y:0 }}`, stagger 0.08s per card, `viewport={{ once:true }}`

- Hover: `whileHover={{ x: 8 }}` on outer div + left border `2px solid #C9A84C` appears

- Arrow: `whileHover={{ x: 5 }}` independently

  

Card: `background: var(--bg-card)`, `border: 1px solid var(--border)`, `border-radius: 14px`, `padding: 28px 32px`

Hover: background → `var(--bg-card-hover)`, border → `var(--border-hover)`

  

Tag pill colors (bg-opacity-10 + text):

- Projects: blue `#3B82F6`

- Learning: green `#10B981`

- Systems: purple `#8B5CF6`

- Perspective: amber `#F59E0B`

  

### ReadingProgress.tsx ('use client')

Fixed `top: 0`, `left: 0`, `right: 0`, `height: 2px`, `z-index: 100`

Framer Motion `motion.div` with `scaleX` tied to scroll progress, `transformOrigin: 'left'`, color `#C9A84C`

  

### CustomCursor.tsx ('use client')

Two elements, `position: fixed`, `pointer-events: none`, `z-index: 9998`

1. Dot: 6px circle, white, follows mouse instantly

2. Ring: 36px, `border: 1.5px solid rgba(255,255,255,0.35)`, lerped position (~80ms lag)

On hover over `a`, `button`, `[data-cursor="pointer"]`: ring scales to 52px, border → gold

`body { cursor: none }` — disable on `@media (hover: none)`

  

### Footer.tsx

Centered, `padding: 48px 0 32px`

1. DH logo (28px, opacity 0.7)

2. Bible verse: `"I can do all things through Christ who strengthens me. — Philippians 4:13"` — 12px, muted, italic

3. `© 2025 Davis Higgins · notes.davishiggins.com` — 11px, dim, Inter

  

---

  

## lib/notes.ts

```ts

import fs from 'fs'

import path from 'path'

import matter from 'gray-matter'

  

export type Note = {

  slug: string

  title: string

  date: string

  tag: string

  excerpt: string

  readTime: string

  relatedProject?: string

  relatedProjectLabel?: string

  content: string

}

  

const NOTES_DIR = path.join(process.cwd(), 'content/notes')

  

export function getAllNotes(): Note[] {

  const files = fs.readdirSync(NOTES_DIR).filter(f => f.endsWith('.mdx'))

  return files

    .map(file => {

      const slug = file.replace('.mdx', '')

      const raw = fs.readFileSync(path.join(NOTES_DIR, file), 'utf-8')

      const { data, content } = matter(raw)

      return { slug, content, ...data } as Note

    })

    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

}

  

export function getNoteBySlug(slug: string): Note | null {

  const filePath = path.join(NOTES_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')

  const { data, content } = matter(raw)

  return { slug, content, ...data } as Note

}

```

  

---

  

## Individual Note Page (/notes/[slug])

  

Layout (top to bottom):

1. `ReadingProgress` bar

2. Header (same sticky header)

3. Back button: `← Curated Notes` — Inter 13px, muted, `whileHover={{ x: -4 }}`, hover gold

4. Note meta row: `[tag pill]  [date]  [readTime]`

5. Title: Syne 800, `clamp(36px, 5vw, 64px)`, white, `max-width: 720px`

6. `<hr />` — `rgba(201,168,76,0.15)`, margin 32px 0

7. Body: `prose prose-invert prose-lg` with Tailwind typography customizations

8. Related project callout (if `relatedProject` exists): glassmorphism card, gold border, `"View [relatedProjectLabel] →"` as external link

9. Footer

  

**Note body entrance**: Framer Motion `initial={{ opacity:0, y:20 }}` → `animate={{ opacity:1, y:0 }}`, delay 0.2s, duration 0.6s

  

---

  

## Seed Notes — Write Every Word

  

Every note must be complete. No placeholder text. No lorem ipsum. Write as Davis — direct, technical, honest, personal. Short paragraphs. First person. Mix real technical detail with genuine reflection.

  

---

  

### Note 1: propify-breakdown.mdx

```mdx

---

title: "How I Actually Built Propify (And What Broke Along the Way)"

date: "2025-05-15"

tag: "Projects"

excerpt: "The honest behind-the-scenes of building a full-stack NBA analytics platform as a junior in college — architecture decisions, the ML layer, what broke, and what I'd do differently."

readTime: "7 min read"

relatedProject: "https://propifyai.davishiggins.com"

relatedProjectLabel: "View Propify"

---

  

Propify started the way most of my projects start — I needed something that didn't exist.

  

I was spending more time pulling stats from five different sites than actually thinking about the pick I was trying to evaluate. Box scores on ESPN. Prop lines on PrizePicks. Recent averages somewhere else. Defense matchup data from a fourth tab. By the time I had everything in front of me, I'd already lost the thread of what I was actually trying to figure out. I built Propify to solve that for myself.

  

The first version was a Streamlit app. It worked. Looked rough, loaded slowly, and Render would put it to sleep after 15 minutes of inactivity — which meant every time someone clicked the link, they were waiting 30 seconds for it to wake up before they could do anything. I moved it to Railway, which helped, but by then I already knew the architecture was wrong. Streamlit is a prototype tool. It's not a product. If I wanted Propify to be a real platform, it needed to be built like one.

  

So I migrated. FastAPI on the backend, Next.js on the frontend. That decision added about three weeks to the timeline and was completely worth it.

  

**The ML Layer**

  

The core of Propify is a prediction engine built on a Random Forest Regressor with Ridge regression as a fallback. The question I kept asking during the build was: what does this model actually need to be useful?

  

Not accurate in some abstract benchmark sense — useful for a human making a real decision. That distinction changed how I built it.

  

Player prop data is noisy. Small sample sizes, opponent variance, pace of play, injury context that doesn't show up in box scores. A complex model on that data doesn't give you better predictions — it gives you confidently wrong predictions. So the Random Forest was chosen deliberately for its resistance to overfitting on small samples, and Ridge regression sits underneath it as the fallback when the forest's confidence is low.

  

One thing I learned the hard way: you cannot use standard k-fold cross-validation on sequential sports data. K-fold shuffles the data randomly before splitting, which means your model trains on future games to predict past ones. That's data leakage. Time-series validation splits the data chronologically — train on everything before date X, validate on date X forward. The model saw lower validation accuracy when I switched, but it was actually measuring the right thing for the first time.

  

The feature set is approximately 30 features per player: rolling averages at multiple windows, head-to-head historical performance against the specific opponent, positional matchup data, home/away splits, rest days, pace adjustments. None of that is groundbreaking — the value isn't in any single feature, it's in having all of them in one place with consistent preprocessing.

  

I want to be honest about the limitations: this model is not going to beat Vegas. Vegas has decades of data, entire teams of quants, and real-time information flows I don't have access to. That was never the point. The point was to remove enough noise that I could think clearly about a pick, have supporting data in one place, and track the results honestly over time.

  

**The Technical Pain**

  

CORS nearly killed me. The issue was a specific conflict: when you send requests with credentials, the server cannot respond with a wildcard `Access-Control-Allow-Origin: *`. You have to specify the exact origin. I was doing both — returning the wildcard and sending credentials — and the browser was rejecting every response silently. Took longer than I'd like to admit to diagnose because the error message was almost identical to a completely different CORS error.

  

Stripe subscriptions were a first. Implementing a payment wall as a 20-year-old who had never touched billing infrastructure was a genuinely new experience. The Stripe docs are good but they don't tell you what to do when your webhook fires before your database write completes. I learned about idempotency keys the hard way.

  

Clerk auth with Cloudflare DNS — the CNAME setup took longer than the actual auth integration. The documentation assumes you're on a standard subdomain setup. When you're managing a multi-subdomain architecture across `davishiggins.com`, `higginsd.com`, and related properties, the DNS propagation and certificate validation order matters in ways that aren't obvious.

  

**What I'd Do Differently**

  

I'd design the database schema before writing any application code. I made assumptions about how player data would be structured that required two migrations to fix later. Both were avoidable with 30 more minutes of upfront thinking.

  

I'd also write tests earlier. Not because I believe in test-driven development as a religion, but because the manual testing burden for a stateful application with auth and subscriptions gets heavy fast.

  

**What It Actually Taught Me**

  

Propify is the first thing I've built where I had to think like a product manager, a data scientist, a backend engineer, and a designer at the same time — simultaneously, not in sequence. That forced context-switching is disorienting at first. After a few months of it, it becomes a competitive advantage.

  

The thing I'm most proud of isn't the ML model or the architecture. It's the pick tracker. Being honest about results over time — logging every pick, tracking net profit, acknowledging the losing streaks — is harder than building the prediction engine. It's the part that makes Propify a tool for disciplined thinking rather than just a way to feel confident.

```

  

---

  

### Note 2: crowncode-build.mdx

```mdx

---

title: "CrownCode AI: Building a Claude-Powered Website Generator in a Week"

date: "2025-04-28"

tag: "Projects"

excerpt: "What I learned shipping an AI-powered website generator built on Claude — the prompt engineering decisions, the architecture, and why the hardest part had nothing to do with code."

readTime: "5 min read"

relatedProject: "https://crowncode.higginsd.com"

relatedProjectLabel: "View CrownCode AI"

---

  

CrownCode started with a question I kept coming back to.

  

What's the real barrier for someone who needs a website but has no technical background? It's not budget — you can get a Squarespace site for $16 a month. It's not even the tools. It's the blank page problem. Someone who runs a small business, a personal brand, or a local service doesn't know what a good website looks like for their context. They don't know what to ask for. And every tool that exists assumes they already have an answer to that question.

  

CrownCode was built to eliminate that barrier. Describe your business. Get a real, deployable website. That's the entire promise.

  

**The Architecture**

  

The technical foundation is straightforward: Claude API on the backend, routed through a Vercel serverless proxy, with a Next.js frontend. The proxy pattern is the same one I built for the portfolio assistant on `portfolio.davishiggins.com` — it keeps the API key off the client and gives me a clean interface to control request structure.

  

The interesting part isn't the infrastructure. It's the prompt engineering.

  

Getting Claude to produce clean, deployable HTML/CSS instead of tutorial code is a different problem than most people expect. The first version of my system prompt produced code that technically worked but looked like a generic template. Centered hero, blue button, three-column feature grid, stock photo placeholders. Exactly the kind of thing that makes someone's small business look like it was built from a kit.

  

The breakthrough was specificity in constraints. Not "build a website for a coffee shop" — "build a single-page site for a specialty coffee shop in Charlotte, NC. Dark background. Matte cream typography. Menu section with four items in a two-column grid. No hero image — use a full-width text headline instead. Contact section with just a phone number and address. No footer links."

  

That level of specificity produces something that looks designed. The aesthetic constraints are as important as the functional ones, and they need to be in the prompt, not left as assumptions.

  

The other thing I learned: Claude needs to know what it's NOT building. "No stock image placeholders" eliminates a whole category of output that looks unfinished. "No purple gradients" removes the single most generic AI-generated aesthetic. "No Inter font" forces a more intentional typographic choice. Negative constraints are underused in AI product design.

  

**Latency Was Harder Than the Claude Integration**

  

The Claude integration took about a day. Latency handling took three.

  

Generating a full website takes 6-10 seconds depending on complexity. That's a long time to show someone a spinner. The solution is streaming — reading the response in chunks and rendering it incrementally so the user sees the site being built in real time rather than waiting for a complete response.

  

Implementing streaming correctly in a Next.js serverless function is not as simple as the documentation makes it look. There's a specific interaction between Vercel's response handling and the ReadableStream API that requires careful buffer management. I broke the output encoding twice before getting it right.

  

**Where CrownCode Lives**

  

CrownCode is deployed at `crowncode.higginsd.com` rather than its own domain. That's intentional — it's part of the Higgins Digital ecosystem. The subdomain structure puts it under the agency brand, which is the right positioning. CrownCode isn't a standalone product yet; it's a capability demonstration and a lead generation tool.

  

The longer-term vision: a client describes their business in a few sentences, selects their industry, and receives a fully structured, branded site with copy, layout, and styling optimized for their context — in under two minutes. The infrastructure is already capable of this. The product layer is what needs development.

  

**What I'd Change**

  

The prompt engineering is still manual. Every constraint in the system prompt was written by hand based on observing bad outputs and adding corrective language. The better version of this is a structured constraint system — dropdowns and toggles that inject specific prompt segments based on user input. That would make the quality more consistent and reduce the variance in output quality across different business types.

  

I'd also add an edit layer. Right now, generation is one-shot. If the user wants to change the color scheme or restructure a section, they re-generate. An edit interface that lets users make targeted changes through natural language — "make the hero text larger" or "change the background to dark navy" — is the feature that would turn CrownCode from impressive into indispensable.

```

  

---

  

### Note 3: kewaunee-dashboards.mdx

```mdx

---

title: "What 20+ Executive Dashboards Actually Taught Me About Data"

date: "2025-03-10"

tag: "Projects"

excerpt: "My internship at Kewaunee Scientific changed how I think about data. Not because of the tools — because of what it looks like when data is broken and nobody knows it."

readTime: "6 min read"

---

  

My first week at Kewaunee, I sat down in front of a Zoho Analytics workspace and realized very quickly that the gap between "data analyst" on a job posting and what data analysis actually looks like inside a real business is significant.

  

The data I was working with hadn't been architected for analysis. It had been created for operations — sales reps logging deals, estimators entering project specs, managers tracking open jobs. Over years of normal use, the same concept had accumulated different names in different systems, date fields had inconsistent formats, and there was no single source of truth for anything. This is not a criticism of Kewaunee. This is how most business data looks when you get close to it.

  

The first real project I was given was an audit. 2,000+ CRM and estimating records, reviewed for consistency and accuracy.

  

**What an Audit Actually Looks Like**

  

People hear "data audit" and imagine elegant SQL queries catching anomalies. The reality, at least at this stage, was more manual. I was looking for patterns in the inconsistencies — field names that meant different things in different contexts, records with missing values that were genuinely missing versus records where "missing" meant something specific to the business, duplicate entries created by different users working the same account.

  

The thing that surprised me most was how much the inconsistencies were invisible to the people who had been working with the data for years. When you're inside a system every day, you develop workarounds without realizing you've developed workarounds. You know that "Project Status: Pending" in this system means something different than "Pending" in that system. That knowledge lives in your head and nowhere else.

  

The data dictionary project was designed to solve exactly that. Document every field, every table, every metric definition in a single place. Define what "closed" means, what "active" means, what the difference between "proposal sent" and "quote approved" is in terms of the actual sales process.

  

Every time two people pull a report and get different numbers, it's almost never because one of them made a mistake. It's because they're defining the same metric in two different ways and nobody wrote it down. The data dictionary fixes that at the root.

  

**Building the Dashboards**

  

The 20+ executive dashboards and 100+ visualizations I built over the internship taught me something that no data science class had: executives don't look at dashboards to analyze data. They look at them to make decisions fast.

  

That distinction completely changes how you design a dashboard. The most important number on the screen needs to be immediately obvious — not buried in a tab, not accessible after a filter, not visible only after scrolling. It needs to be the first thing someone sees when the dashboard loads. Every other element either supports that number or explains it.

  

I also learned what happens when you over-engineer a dashboard. I built one early on with 14 different visualizations, three filter panels, and a table that could sort six ways. Nobody used it. I rebuilt it with four numbers, two charts, and a single date range filter. That version got referenced in weekly meetings.

  

The expiring project tracking system was the most operationally meaningful thing I built. Projects in the pipeline have expiration dates that aren't visible anywhere in the standard interface — they're in the data, but you'd have to know to look. I built a tracker that surfaced projects approaching expiration with color-coded urgency levels, giving the sales team time to act before deals went cold. That's the version of analytics work I find most satisfying: not reporting on what happened, but creating visibility that changes what happens next.

  

**The Bigger Lesson**

  

The actual work of data analysis — in a real business, on real data — is mostly preparation. Cleaning, auditing, documenting, standardizing. The visualizations and the insights are the last 20% of the work. The first 80% is making sure the foundation is reliable enough that the 20% is actually worth building on.

  

That's not glamorous. It's also not what most data science courses spend time on. If I had to identify the single biggest gap between academic data science and professional data science, that's it.

  

The tools matter less than the discipline. Zoho Analytics, Tableau, Power BI, Looker — they're all capable of producing good dashboards if the data going in is clean and the design decisions are intentional. None of them can fix a messy foundation for you.

```

  

---

  

### Note 4: ai-workflow-system.mdx

```mdx

---

title: "How I Actually Use AI Every Day (It's Not What You Think)"

date: "2025-02-20"

tag: "Systems"

excerpt: "I use AI every single day — not to skip work, but to do more of it. Here's the actual system: how I structure prompts, manage context, and use Claude to ship real things faster."

readTime: "5 min read"

relatedProject: "https://ai.davishiggins.com"

relatedProjectLabel: "View AI Workflow System"

---

  

Most people assume that heavy AI users are using it to cheat or take shortcuts. My use is basically the opposite.

  

I'm 20 years old, a junior at UNC Charlotte studying data science with an AI minor. I run a web development agency on the side. I'm building and maintaining Propify as a full-stack product. I interned as a data analyst where I was responsible for real deliverables. I'm in a fraternity. I play sports. I go to the gym. I take a full course load.

  

AI isn't how I skip the work. It's how I manage a workload that wouldn't otherwise be manageable.

  

**The Core of the System: TASK.md**

  

Almost every project I build starts with a TASK.md file. Not a vague outline — a specific, structured document that describes the exact thing I want to build. File structure, design tokens, component behavior, animation specs, typography choices, deployment steps. Written before a single line of code exists.

  

The reasoning is simple: Claude Code is exceptional at building exactly what you describe. If your description is vague, the output is vague. If your description is precise, the output is precise. That's not a limitation of the model — it's a law of communication that applies to humans too. The TASK.md forces me to think through the entire build before I start, which catches problems early and gives the AI a reliable spec to work from.

  

I use this workflow for every serious project. The notes.davishiggins.com site you're reading this on was built from a TASK.md. Propify's migration from Streamlit to FastAPI + Next.js was driven by a TASK.md. The Higgins Digital site rebuild had one. It's the single highest-leverage habit in my workflow.

  

**Prompt Engineering Principles I Actually Use**

  

Specificity over generality. "Build a dark, minimal landing page for a construction company in Charlotte — two-column hero, white headline on black, three service cards, contact section, no gradients, no stock images" produces something useful. "Build a landing page for a construction company" produces a template.

  

Negative constraints. Tell the AI what you don't want. "No Inter font. No purple gradients. No card designs with drop shadows." This eliminates entire categories of generic output and forces more intentional decisions.

  

Reference-driven prompting. Pointing at real examples — "the aesthetic should feel like this site" — gives the model a visual anchor that's more informative than purely descriptive language.

  

Role-setting in system prompts. For the portfolio assistant on `portfolio.davishiggins.com`, I wrote a detailed system prompt that gives Claude the full context of my background, my projects, my technical skills, and how I want it to represent me. That context changes the quality of every response significantly.

  

**Critical Review Is Non-Negotiable**

  

I want to be direct about this because I think it gets glossed over: AI-generated code needs a human who understands what it's supposed to do.

  

I review every significant output before it ships. Not just for bugs — for correctness of approach, appropriateness of architecture, things that technically work but create problems six months from now. There are patterns that appear in AI-generated code that look fine on the surface and create real maintenance problems over time. Catching them requires understanding the system well enough to recognize them.

  

If you don't know enough to review the output critically, you need to learn more before relying on the output. The tool raises the ceiling for people who already have a foundation. It doesn't build the foundation for you.

  

**The Daily Workflow**

  

Morning: identify what needs to ship. Set context in Claude Code with the relevant TASK.md or project background. Break the work into discrete tasks. Build in chunks, review outputs, iterate. Any time I'm uncertain about an architectural decision, I discuss it with the model before implementing — not to get the answer, but to pressure-test my thinking.

  

For research: Perplexity for fast lookups, Claude for synthesis and analysis of longer documents. For documentation: Obsidian with custom templates I've refined over time to capture decisions and context alongside the work itself.

  

The model I keep coming back to: AI is a power tool. A skilled builder with a power drill does better work faster than an unskilled builder with a hand drill — but they do worse work than a skilled builder with a hand drill if they don't know what they're building. Skill first. Tools second.

```

  

---

  

### Note 5: building-in-public.mdx

```mdx

---

title: "Building in Public at 20: What It Actually Looks Like"

date: "2025-01-18"

tag: "Perspective"

excerpt: "I'm 20 years old, a junior at UNC Charlotte, and I've shipped real products for two years. Here's what nobody tells you about building in public when you're still figuring everything out."

readTime: "4 min read"

---

  

I'm 20 years old, a junior at UNC Charlotte, and I've built and shipped about eight real products in the last two years.

  

Not side projects sitting in a private GitHub repo. Real things with real domains, real users, and real decisions behind them. Propify. CrownCode AI. The Higgins Digital agency site. A full-stack photography portfolio for a friend. The HBG construction website that went from a 47 to 98 Lighthouse score. The Phi Delta Theta chaplain platform. An AI workflow system. This site.

  

I'm telling you this not to be impressive but because I think the number matters. Eight things. Two years. While carrying a 3.88 GPA, working a technical internship, running an agency, lifting weights, playing soccer and basketball, serving in my fraternity, and trying to be a decent person. That context is the actual point.

  

**The Part Nobody Talks About**

  

Every single one of those builds had a phase where nothing worked and I had no idea why.

  

The Propify CORS issue took days to diagnose. The HBG website had dependency version mismatches from my first Claude Code attempt that required starting from scratch. Higgins Digital's email routing failed after launch because of Resend domain verification that wasn't mentioned anywhere obvious in the documentation. CrownCode's streaming implementation broke the output encoding twice before I got it right.

  

Building in public means building where failure is also public. I share the finished products. I don't always share the three days at 1am before the finished product exists. I'm trying to do more of that — because the failure part is where most of the learning happens, and pretending it doesn't exist makes the whole thing look easier than it is.

  

**Why I Build as Much as I Do**

  

I want to be honest about this because I think it matters more than the technical content.

  

I have a history with mental health. I'm not going into detail here, but it's real and it's shaped how I move through the world. One of the things I've figured out about myself is that building — actually making something tangible, shipping it, having it work — is one of the most stabilizing things I know how to do. When things feel heavy or unclear, deploying something real is proof that I can figure things out. That I can start from nothing and end with something.

  

That might sound like a coping mechanism. I think it is one, and I think that's okay. The motivation behind good work doesn't need to be purely logical. It just needs to produce something worth making.

  

**On Faith**

  

I'm a Christian. Philippians 4:13 is in the footer of every site I build — not as decoration, but because it's the thing I come back to at 1am when a project feels impossible and I don't have another logical reason to keep going. "I can do all things through Christ who strengthens me" is not a productivity framework. It's a foundation. It goes under everything else.

  

**What I'd Tell Someone Starting Out**

  

Don't wait until you're ready. You are not going to be ready. Readiness is something you develop by doing the thing before you feel ready, not a prerequisite you reach before you start.

  

Every project you ship teaches you things that no class, no tutorial, and no course can. The Kewaunee internship taught me more about real-world data in six months than two years of coursework. Building Propify taught me more about product development than any PM framework I've read. The photography portfolio I built for Wyatt taught me more about CSS architecture than any documentation ever did.

  

Your work is the credential. Put it in public. Build things that help people. Be honest about what worked and what didn't. Stay disciplined about shipping — finishing matters more than perfecting.

  

The gap between people who talk about building and people who actually build is just execution. That's it. Start. Break things. Figure it out. Repeat.

```

  

---

  

## providers/LenisProvider.tsx

```tsx

'use client'

import { useEffect, useRef } from 'react'

import Lenis from '@studio-freight/lenis'

  

export function LenisProvider({ children }: { children: React.ReactNode }) {

  const lenisRef = useRef<Lenis | null>(null)

  

  useEffect(() => {

    const lenis = new Lenis({

      duration: 1.2,

      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

    })

    lenisRef.current = lenis

  

    function raf(time: number) {

      lenis.raf(time)

      requestAnimationFrame(raf)

    }

    requestAnimationFrame(raf)

  

    return () => lenis.destroy()

  }, [])

  

  return <>{children}</>

}

```

  

---

  

## package.json

```json

{

  "name": "notes-davishiggins",

  "version": "0.1.0",

  "private": true,

  "scripts": {

    "dev": "next dev",

    "build": "next build",

    "start": "next start"

  },

  "dependencies": {

    "next": "^15.0.0",

    "react": "^18.0.0",

    "react-dom": "^18.0.0",

    "framer-motion": "^11.0.0",

    "gsap": "^3.12.0",

    "@studio-freight/lenis": "^1.0.42",

    "gray-matter": "^4.0.3",

    "next-mdx-remote": "^4.4.1",

    "@tailwindcss/typography": "^0.5.13"

  },

  "devDependencies": {

    "typescript": "^5.0.0",

    "@types/node": "^20.0.0",

    "@types/react": "^18.0.0",

    "tailwindcss": "^3.4.0",

    "autoprefixer": "^10.4.0",

    "postcss": "^8.4.0"

  }

}

```

  

---

  

## Deployment

1. `git init` → GitHub repo `notes-davishiggins`

2. Connect to Vercel → Framework: Next.js → auto-deploy on push to `main`

3. Vercel → Settings → Domains → add `notes.davishiggins.com`

4. Cloudflare DNS → CNAME: Name `notes`, Target `cname.vercel-dns.com`, Proxy: OFF (DNS only)

  

---

  

## Hard Constraints

- TypeScript strict throughout — no `any`, no `// @ts-ignore`

- App Router only — no `pages/` directory

- No CMS, no database, no auth, no newsletter, no comments

- All components are Server Components by default — only add `'use client'` where strictly required (TagFilter, CustomCursor, ReadingProgress, LenisProvider, Hero GSAP)

- GSAP: import inside `useEffect` only — never at module level (SSR will break)

- Register ScrollTrigger: `gsap.registerPlugin(ScrollTrigger)` inside `useEffect`

- Custom cursor and GSAP hero: disable on `@media (hover: none)` for mobile

- No UI component libraries — build everything from scratch

- No lorem ipsum — every note is written in full with real content

- DH logo: `/public/dh-logo.png` — use the uploaded transparent PNG

- Adding a new note = new `.mdx` file in `/content/notes/` + `git push` — that's it