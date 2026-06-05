# TASK.md — notes.davishiggins.com (Premium Redesign)

## Full Visual, Animation, and Design Overhaul

  

Read this file completely before touching a single file. Implement every section in exact order. Run a full build check after completion. Zero TypeScript errors. Zero em dashes anywhere. Zero placeholder content.

  

---

  

## VISION

  

`notes.davishiggins.com` should feel like a premium personal operating system for ideas. It is not a blog. It is not a portfolio. It is a curated archive of how Davis Higgins thinks, builds, and grows. Every design decision, animation, color, and typographic choice must reinforce that.

  

The final experience should stop a recruiter mid-scroll. It should make a potential client trust the craft immediately. It should feel handcrafted, intelligent, and unmistakably personal.

  

Do not copy any reference site. Synthesize them into one original experience.

  

---

  

## DESIGN INSPIRATION REFERENCES

  

Use these websites as design inspiration. Study the specific quality described for each and implement that quality throughout the site.

  

- **landonorris.com**: Primary animation reference. Large bold editorial typography, scroll-driven reveals, asymmetric layouts, cinematic hero sections, dramatic text entrances. The site feels alive. Every scroll event triggers something intentional.

  

- **linear.app**: Premium SaaS polish. Smooth motion between sections, clean dark UI, subtle gradient depth, precise spacing systems, sections that breathe. Nothing feels crowded or accidental.

  

- **raycast.com**: Dark productivity interface. Sharp card design, fast snappy interactions, glowing accent details on active elements, command-center energy without being cold.

  

- **arc.net**: Calm personal internet aesthetic. Human-centered layout, modern minimal motion, warmth in a dark UI, thoughtful whitespace.

  

- **obsidian.md**: Second-brain / knowledge-base feeling. Connected ideas, note-taking aesthetic, writing and thought organization. The site feels like it contains something worth returning to.

  

- **Awwwards animation leaders**: High-end scroll motion, hover states that surprise, page transitions that feel physical, animated backgrounds that add depth without distraction.

  

- **Awwwards storytelling leaders**: Each excerpt should feel like the opening of a personal story, not a blog card. Emotional pull. Specific language. Tension before the read.

  

- **Awwwards typography leaders**: Premium editorial type hierarchy. Strong display headings. Clean, highly readable article body. Intentional font pairing with personality.

  

- **Framer personal galleries**: Modern personal-brand layouts, polished responsive card sections, clean grid architecture that feels considered.

  

The final site should NOT copy any of these. Combine them into a unique Davis Higgins Notes experience: dark, premium, extremely animated, thoughtful, clean, and impressive. A high-end personal knowledge archive where each excerpt represents a real lesson from building, faith, health, school, work, AI, and personal growth.

  

---

  

## SECTION 1: COMPLETE COLOR SYSTEM — GOLD REPLACES ALL BLUE

  

Remove every instance of electric blue (#0055FF), Tarheel blue (#4B9CD3), light blue, and any blue-tinted UI element. Replace with gold-based accents throughout.

  

### New CSS Variables — replace globals.css entirely

  

```css

:root {

  /* Core Backgrounds */

  --bg:              #06080F;

  --bg-deep:         #030508;

  --bg-card:         rgba(255, 255, 255, 0.03);

  --bg-card-hover:   rgba(255, 255, 255, 0.055);

  --bg-nav:          rgba(6, 8, 15, 0.82);

  

  /* Gold System */

  --gold:            #C9A84C;

  --gold-bright:     #E4C06E;

  --gold-dim:        rgba(201, 168, 76, 0.18);

  --gold-glow:       rgba(201, 168, 76, 0.12);

  --gold-border:     rgba(201, 168, 76, 0.25);

  --gold-border-hot: rgba(201, 168, 76, 0.55);

  

  /* Text */

  --text:            #F2EFE9;

  --text-muted:      rgba(242, 239, 233, 0.45);

  --text-dim:        rgba(242, 239, 233, 0.2);

  

  /* Borders */

  --border:          rgba(255, 255, 255, 0.07);

  --border-hover:    rgba(201, 168, 76, 0.4);

  

  /* Category Colors — all warm, no blue */

  --cat-projects:    #C9A84C;

  --cat-data-ai:     #E4C06E;

  --cat-business:    #A07830;

  --cat-personal:    #D4B87A;

  

  /* Cursor */

  --cursor-ring:     rgba(201, 168, 76, 0.5);

  --cursor-dot:      #C9A84C;

  

  /* Glow */

  --glow-gold:       rgba(201, 168, 76, 0.14);

  --glow-gold-hot:   rgba(201, 168, 76, 0.28);

}

```

  

### Background — Layered, Animated, Atmospheric

  

Apply these layers on `body` in order:

  

**Layer 1 — base color**: `background-color: #06080F`

  

**Layer 2 — gold radial gradients** (static, set as background-image):

```css

background-image:

  radial-gradient(ellipse 60% 40% at 20% -5%, rgba(201, 168, 76, 0.09) 0%, transparent 65%),

  radial-gradient(ellipse 40% 30% at 85% 15%, rgba(228, 192, 110, 0.06) 0%, transparent 55%),

  radial-gradient(ellipse 80% 60% at 50% 100%, rgba(160, 120, 48, 0.04) 0%, transparent 70%);

```

  

**Layer 3 — animated breathing glow** (subtle CSS animation):

```css

@keyframes bgBreathe {

  0%, 100% { opacity: 1; }

  50%       { opacity: 0.7; }

}

```

Apply to a `::before` pseudo-element with the same gradient, `animation: bgBreathe 12s ease-in-out infinite`.

  

**Layer 4 — SVG grain texture** (existing pattern, opacity 0.028):

```css

body::after {

  content: '';

  position: fixed;

  inset: 0;

  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");

  opacity: 0.028;

  pointer-events: none;

  z-index: 9998;

}

```

  

### Reading Progress Bar

Change color from blue to `#C9A84C` (gold).

  

### Custom Cursor

- Ring border: `rgba(201, 168, 76, 0.45)` at rest

- Ring border on hover: `#C9A84C` full opacity

- Dot: `#C9A84C`

  

### Marquee Strip

- Background: `rgba(201, 168, 76, 0.04)`

- Top and bottom border: `1px solid rgba(201, 168, 76, 0.18)`

- Text color: `#C9A84C`

  

---

  

## SECTION 2: TYPOGRAPHY UPGRADE

  

Replace the current font pairing with a more distinctive editorial system.

  

### Fonts (import via next/font/google)

- **Display/Hero**: `Syne` — weight 700, 800. Used for hero heading, note titles, large callouts. Italic variant for accent word.

- **UI/Labels**: `DM Sans` — weight 400, 500, 600. Replaces Inter for all UI elements, nav, cards, meta text. Feels sharper and more premium than Inter.

- **Body/Articles**: `Lora` — weight 400, 400 italic. Used inside individual note pages for the prose body. Serif creates an editorial reading experience, distinct from the UI.

  

Inject all three as CSS variables:

```css

--font-display: var(--font-syne);

--font-ui:      var(--font-dm-sans);

--font-body:    var(--font-lora);

```

  

Apply `font-family: var(--font-ui)` globally. Override with display or body where specified.

  

### Type Scale

- Hero display: `clamp(52px, 9vw, 120px)`, Syne 800, line-height 0.9

- Featured card title: `clamp(28px, 4vw, 48px)`, Syne 700

- Note card title: `22px`, Syne 700

- Eyebrow labels: `10px`, DM Sans 500, `letter-spacing: 0.2em`, uppercase

- Body prose: `17px`, Lora 400, `line-height: 1.78`

- UI meta (date, read time): `12px`, DM Sans 500, muted

  

---

  

## SECTION 3: HEADER — COMPLETE REDESIGN

  

The header must be impressively animated and visually striking. Remove the square box around the logo entirely.

  

### Layout

```

[DH signature logo — floating, no container]  [DAVIS HIGGINS / Curated Notes]  [← davishiggins.com]

```

  

Three-part header: logo left, wordmark center-left, back link right. All on one row.

  

### Logo Treatment

- Display the DH signature logo as a floating image, no bounding box, no background, no border

- Size: 52px height on desktop, 38px on mobile

- `filter: brightness(0) saturate(100%) invert(74%) sepia(45%) saturate(600%) hue-rotate(5deg) brightness(95%)` — this tints a dark logo to gold

- On hover: `filter` shifts to full brightness gold (`#C9A84C` tint), subtle scale 1.04, transition 0.3s ease

- If `noteslogo.svg` is provided and animatable: trigger the signature draw-on animation on page load (see Section 7 for full implementation). If only PNG: use static image with gold filter.

  

### Wordmark (next to logo)

- Top line: "DAVIS HIGGINS" — DM Sans 600, 11px, `letter-spacing: 0.18em`, uppercase, `var(--text)`

- Bottom line: "Curated Notes" — DM Sans 400, 11px, muted, `letter-spacing: 0.08em`

- Subtle gold separator line `|` between logo and wordmark, `rgba(201,168,76,0.3)`

  

### Back Link (right side)

- "← davishiggins.com" — DM Sans 500, 12px, muted

- Hover: text shifts to `var(--gold)`, arrow slides left 4px with Framer Motion

  

### Scroll Behavior (Framer Motion useScroll)

At scroll position 0: header background transparent, no border

Past 60px: background transitions to `rgba(6, 8, 15, 0.88)`, `backdrop-filter: blur(20px)`, bottom border `1px solid rgba(201,168,76,0.12)` fades in

Use `useMotionValue` + `useTransform` from Framer Motion. All transitions: 0.4s ease.

  

### Header Load Animation

On page load, the entire header fades in from `y: -8, opacity: 0` to `y: 0, opacity: 1`, duration 0.6s, delay 0.1s.

  

---

  

## SECTION 4: HERO — CINEMATIC REDESIGN

  

The hero must be the most impressive part of the page. Take direct inspiration from landonorris.com for the scale and drama of the typography entrance.

  

### Layout

Full viewport height (`100dvh`). Left-aligned content, positioned at 15% from left, vertically centered.

  

```

[eyebrow: notes.davishiggins.com — gold, small, uppercase]

[CURATED]

[NOTES.]

[subtitle with Davis's name]

[scroll indicator]

```

  

### GSAP Animation Timeline (on mount, fires once)

Every element starts invisible. Timeline executes in sequence:

  

1. **t=0.0s**: Eyebrow text — `from: { opacity:0, y:10 }` to `{ opacity:1, y:0 }`, duration 0.5s

2. **t=0.2s**: "CURATED" — characters split individually using SplitText or manual span wrapping. Each character: `from: { y:'100%', opacity:0 }` to `{ y:'0%', opacity:1 }`, duration 0.7s, stagger 0.04s per character, ease `power4.out`

3. **t=0.5s**: "NOTES." — same character split entrance, stagger 0.04s, ease `power4.out`, gold color

4. **t=0.85s**: Subtitle line — `from: { opacity:0, y:14 }` to `{ opacity:1, y:0 }`, duration 0.5s

5. **t=1.1s**: Scroll indicator — `from: { opacity:0 }` to `{ opacity:1 }`, duration 0.4s

  

**Character split implementation** (no SplitText plugin required):

```tsx

// Wrap each character in a span with overflow-hidden parent

function splitChars(text: string) {

  return text.split('').map((char, i) => (

    <span key={i} style={{ display: 'inline-block', overflow: 'hidden' }}>

      <motion.span

        style={{ display: 'inline-block' }}

        initial={{ y: '100%', opacity: 0 }}

        animate={{ y: '0%', opacity: 1 }}

        transition={{ duration: 0.7, delay: 0.2 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}

      >

        {char === ' ' ? '\u00A0' : char}

      </motion.span>

    </span>

  ))

}

```

  

### Typography

- "CURATED" — Syne 800, `clamp(52px, 9vw, 120px)`, `var(--text)`, line-height 0.88

- "NOTES." — Syne 800, `clamp(52px, 9vw, 120px)`, `var(--gold)`, italic, line-height 0.88

- Subtitle — DM Sans 400, 16px, muted, max-width 480px, line-height 1.65

  - Text: `"A public notebook by Davis Higgins. Data science, AI, building, faith, and the systems behind the work."`

  

### Scroll Indicator

Small animated element at the bottom-left of the hero. A thin vertical line that extends downward with a CSS animation loop. Gold color, opacity 0.5. Or a subtle "scroll" label in tiny uppercase with an arrow.

  

### ScrollTrigger Exit

As user scrolls away from hero: `gsap.to(heroRef.current, { opacity: 0, scale: 0.97, ease: 'none' })` linked to scroll progress from hero bottom. Creates cinematic push-away as the feed slides up.

  

### Hero Decorative Elements

Add these subtle background elements to the hero section:

1. **Gold horizontal rule** — thin `1px` line, `rgba(201,168,76,0.2)`, width 120px, positioned left of the text block, vertically centered on the "CURATED" line. Animates in from width 0 to 120px at t=0.3s.

2. **Floating number** — very large `"01"` in Syne 800, `font-size: clamp(180px, 22vw, 280px)`, `opacity: 0.025`, positioned far right, partially off-screen. Adds depth without competing with the text.

  

---

  

## SECTION 5: MARQUEE

  

Positioned between hero and feed. Full-width strip.

  

```

CURATED NOTES · DAVIS HIGGINS · DATA SCIENCE · AI · CHARLOTTE NC · UNC CHARLOTTE · HIGGINS DIGITAL · PROPIFY · CROWNCODE AI · BUILDING IN PUBLIC · FAITH · GROWTH ·

```

  

Repeated 3x. CSS animation `marquee 35s linear infinite`. Pause on hover.

  

Styling:

- Background: `rgba(201, 168, 76, 0.04)`

- Top and bottom: `1px solid rgba(201, 168, 76, 0.15)`

- Text: DM Sans 600, 11px, uppercase, `letter-spacing: 0.18em`, `var(--gold)`

- Padding: 14px 0

  

---

  

## SECTION 6: CATEGORY FILTER — CONSOLIDATED AND ANIMATED

  

### New 5-Category System

Replace all previous categories with exactly these five. No exceptions. No other category names anywhere in the codebase.

  

| Display Label | Internal value | Covers |

|--------------|---------------|--------|

| All | `all` | Everything |

| Projects | `Projects` | All project build notes |

| Data & AI | `Data & AI` | Data analytics + AI workflow notes |

| Business | `Business` | Higgins Digital + career + branding notes |

| Personal | `Personal` | Faith + health + systems + perspective notes |

  

### Update ALL MDX Frontmatter Tags

Change the `tag` field in every MDX file:

  

| File | New tag |

|------|---------|

| propify-breakdown.mdx | `"Projects"` |

| crowncode-build.mdx | `"Projects"` |

| kewaunee-dashboards.mdx | `"Data & AI"` |

| ai-workflow-system.mdx | `"Data & AI"` |

| claude-code-course.mdx | `"Data & AI"` |

| building-in-public.mdx | `"Personal"` |

| personal-branding-career.mdx | `"Business"` |

| higgins-digital-building.mdx | `"Business"` |

| faith-christ-relationship.mdx | `"Personal"` |

| physical-health-mental-clarity.mdx | `"Personal"` |

| balancing-everything.mdx | `"Personal"` |

  

### Filter UI Design

Horizontal pill row, centered, with generous spacing between pills.

  

**Inactive pill**: transparent background, border `1px solid rgba(255,255,255,0.1)`, DM Sans 500, 13px, muted text. Padding: `8px 20px`. Border-radius: `999px`.

  

**Active pill**:

- Background: `var(--gold)`

- Text: `#06080F` (dark, legible on gold)

- DM Sans 700, 13px

- Gold glow: `box-shadow: 0 0 20px rgba(201,168,76,0.35), 0 0 40px rgba(201,168,76,0.12)`

- Scale: 1.03 (Framer Motion `whileTap`)

  

**Hover (inactive)**: border shifts to `rgba(201,168,76,0.35)`, text slightly brighter

  

**Category count**: show note count next to each label in dim text: `All (11)`, `Projects (2)`, etc.

  

**Filter transition (AnimatePresence)**:

When the active category changes, outgoing cards fade and move out `{ opacity:0, y:-8, scale:0.98 }`, incoming cards fade and move in with stagger. Use `layout` prop on the list container for smooth reflow.

  

---

  

## SECTION 7: FEED — FEATURED NOTE + CARD GRID

  

### Featured Note (first/newest note, full-width treatment)

  

The most recent note gets a "featured" card above the regular grid. This is a different component: `FeaturedNoteCard.tsx`.

  

Layout (desktop): Two-column. Left side (60%): large title, excerpt, meta, read link. Right side (40%): large gold category pill, decorative number (note index "01"), subtle animated border.

  

Styling:

- Background: `rgba(201, 168, 76, 0.05)`

- Border: `1px solid rgba(201, 168, 76, 0.2)`

- Left border accent: `4px solid var(--gold)` (full height)

- Border-radius: `16px`

- Padding: `48px`

- Title: Syne 700, `clamp(28px, 4vw, 48px)`, `var(--text)`

- On hover: gold glow intensifies `box-shadow: 0 0 48px rgba(201,168,76,0.1)`, subtle scale 1.008

  

Animation (Framer Motion, fires once on viewport entry):

- `initial={{ opacity:0, y:32 }}` to `whileInView={{ opacity:1, y:0 }}`, duration 0.7s, ease `[0.22,1,0.36,1]`

  

Label above featured card:

- "FEATURED" — DM Sans 600, 10px, uppercase, letter-spacing 0.2em, gold, with a thin gold horizontal line extending right

  

### Regular Note Cards

  

Single-column feed below featured note. Max-width `700px`, centered. Each card is a `NoteCard.tsx`.

  

Card structure (top to bottom):

```

[category pill]  ·  [read time]              [formatted date: "May 2026"]

[TITLE — Syne 700, 22px]

[excerpt — DM Sans 400, 15px, muted, 2 lines]

[→ Read excerpt — DM Sans 600, 13px, gold]

──────────────────────────────────────────────

```

  

Card styling:

- Background: `var(--bg-card)`

- Border: `1px solid var(--border)`

- Border-radius: `14px`

- Padding: `28px 32px`

- No left border at rest

  

Card hover (Framer Motion `whileHover`):

- `x: 6` (slides right)

- Background: `var(--bg-card-hover)`

- Border: `var(--border-hover)` (gold)

- Left border: `border-left: 3px solid var(--gold)` (use a separate absolutely-positioned div that scales in height from 0 to 100% on hover — Framer Motion `scaleY` from 0 to 1, origin top)

- Gold glow: `box-shadow: 0 0 32px rgba(201,168,76,0.08)`

- Arrow slides right 6px

  

**Magnetic card effect** — on `mousemove` over each card:

```tsx

const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {

  const rect = e.currentTarget.getBoundingClientRect()

  const x = (e.clientX - rect.left - rect.width / 2) / rect.width * 8

  const y = (e.clientY - rect.top - rect.height / 2) / rect.height * 4

  // Apply subtle transform: translate(x, y)

}

```

Reset on `mouseLeave`. Makes cards feel responsive to the cursor's presence.

  

Card entrance animation (Framer Motion `whileInView`):

```tsx

initial={{ opacity: 0, y: 28 }}

whileInView={{ opacity: 1, y: 0 }}

viewport={{ once: true, margin: '-60px' }}

transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}

```

  

Category pill colors (gold spectrum, no blue):

- Projects: `rgba(201,168,76,0.12)` bg, `#C9A84C` text

- Data & AI: `rgba(228,192,110,0.12)` bg, `#E4C06E` text

- Business: `rgba(160,120,48,0.12)` bg, `#A07830` text — adjust so it's readable

- Personal: `rgba(212,184,122,0.12)` bg, `#D4B87A` text

  

---

  

## SECTION 8: INDIVIDUAL NOTE PAGE — PREMIUM ARTICLE EXPERIENCE

  

### Page Entrance Animation (Framer Motion)

On route load:

1. Title slides up `from: { y:30, opacity:0 }` to `{ y:0, opacity:1 }`, duration 0.6s, ease `[0.22,1,0.36,1]`

2. Meta row fades in, delay 0.1s

3. Horizontal rule grows from `scaleX: 0` to `scaleX: 1`, origin left, delay 0.2s

4. Body content fades in, delay 0.3s

  

### Layout

- Max content width: `680px`, centered

- Side padding: generous, especially on mobile

- Back link: top left, "← Curated Notes" — DM Sans 500, 13px, muted. Hover: gold, slides left 4px

  

### Meta Row

`[gold category pill]  [date]  [read time]`

All in DM Sans 500, 12px, muted. Pill: gold background (dim), dark text.

  

### Title

- Syne 800, `clamp(32px, 5vw, 56px)`, `var(--text)`

- Line-height: 1.05

- Max-width: 680px

  

### Horizontal Rule

`border: none; border-top: 1px solid rgba(201,168,76,0.18); margin: 32px 0;`

  

### Body Prose

Use Lora 400 for all body text. Apply `prose prose-invert` with these overrides in Tailwind config:

- `p`: DM Sans body or Lora (Lora preferred for article reading experience), 17px, line-height 1.78, color `var(--text-muted)` slightly brighter at `rgba(242,239,233,0.8)`

- `h2, h3`: Syne 700, color `var(--text)`

- `a`: color `var(--gold)`, no underline at rest, underline on hover

- `code`: DM Sans Mono or monospace, `background: rgba(201,168,76,0.08)`, `color: var(--gold-bright)`, `border-radius: 4px`, `padding: 2px 7px`

- `blockquote`: left border `3px solid var(--gold)`, italic, muted text, padding-left 20px

- `strong`: color `var(--text)`, font-weight 600

- `hr`: `border-top: 1px solid rgba(201,168,76,0.15)`

  

### Related Project Callout (if `relatedProject` in frontmatter)

At bottom of note:

- Card with `background: rgba(201,168,76,0.04)`, `border: 1px solid rgba(201,168,76,0.2)`, `border-radius: 12px`, `padding: 24px 28px`

- Label: "Related Project" in DM Sans 600, 10px, uppercase, gold, letter-spacing

- Link: `View [relatedProjectLabel] →` in Syne 700, 16px, gold

- Hover: card background intensifies, arrow slides right 4px

  

### Reading Progress Bar

Top of page, fixed, `height: 2px`, `background: var(--gold)`, Framer Motion `scaleX`.

  

---

  

## SECTION 9: FOOTER — LOGO PROMINENT AND LARGE

  

The footer logo must feel like a statement, not an afterthought. It anchors the page.

  

### Layout (top to bottom, centered)

```

[DH signature logo — LARGE]

[gold horizontal rule — partial width, centered]

[rotating Bible verse — reference bold + text]

[copyright line]

```

  

### Logo

- Display the DH signature logo (noteslogo.svg or noteslogo.png) centered

- Size: `160px height` on desktop, `120px` on mobile — this is much larger than before

- Apply gold filter: `filter: brightness(0) saturate(100%) invert(74%) sepia(45%) saturate(600%) hue-rotate(5deg) brightness(95%)`

- Margin bottom: `32px`

- On hover: subtle scale 1.02, gold glow `filter: drop-shadow(0 0 20px rgba(201,168,76,0.3))`, transition 0.3s

- Entrance animation: `initial={{ opacity:0, y:20 }}` to `whileInView={{ opacity:1, y:0 }}`, viewport once

  

### Gold Separator

After the logo: `width: 60px, height: 1px, background: rgba(201,168,76,0.3), margin: 0 auto 32px`

  

### Rotating Bible Verses

`AnimatePresence` with opacity fade. 7-second interval.

  

Each verse renders as:

```

REFERENCE — DM Sans 700, 10px, uppercase, letter-spacing 0.2em, gold

verse text — Lora 400 italic, 13px, color rgba(242,239,233,0.5), max-width 420px, centered, margin-top 8px

```

  

All 15 verses must be in the array (same array from previous TASK.md). Reference them exactly.

  

### Copyright

`© 2026 Davis Higgins · notes.davishiggins.com`

DM Sans 400, 11px, `var(--text-dim)`. Margin-top: `32px`.

  

### Footer Container

`padding: 80px 24px 48px`, centered, no other elements. Generous top padding so the footer feels intentional.

  

---

  

## SECTION 10: SIGNATURE DRAW-ON ANIMATION

  

If `noteslogo.svg` is provided with proper `<path>` elements and `stroke` attributes:

  

Create `components/SignatureLogoAnimated.tsx` as a `'use client'` component.

  

```tsx

'use client'

import { useEffect, useRef } from 'react'

import { gsap } from 'gsap'

  

export function SignatureLogoAnimated({ className }: { className?: string }) {

  const svgRef = useRef<SVGSVGElement>(null)

  

  useEffect(() => {

    if (!svgRef.current) return

    const paths = svgRef.current.querySelectorAll('path')

  

    paths.forEach((path) => {

      const length = path.getTotalLength()

      path.style.strokeDasharray = String(length)

      path.style.strokeDashoffset = String(length)

      path.style.fillOpacity = '0'

    })

  

    const tl = gsap.timeline({ delay: 0.3 })

  

    paths.forEach((path, i) => {

      const length = path.getTotalLength()

      tl.to(path, {

        strokeDashoffset: 0,

        duration: 0.9,

        ease: 'power2.inOut',

      }, i * 0.18)

    })

  

    tl.to(paths, {

      fillOpacity: 1,

      duration: 0.5,

      ease: 'power2.out',

      stagger: 0.05,

    }, '-=0.2')

  

    return () => { tl.kill() }

  }, [])

  

  return (

    /* Render the SVG inline here — import the SVG content as a React component */

    <svg ref={svgRef} className={className} /* viewBox and other attrs from the file */>

      {/* paths go here */}

    </svg>

  )

}

```

  

To render the SVG inline in Next.js, either:

1. Import the SVG as a React component using `@svgr/webpack` (add to `next.config.ts`)

2. Or paste the SVG path data directly into the component

  

Use `SignatureLogoAnimated` in the Hero section. The animation fires as part of the hero entrance timeline. Use a static `<img>` or static SVG import in the Header so the draw animation only plays once on the main hero.

  

If only `noteslogo.png` is provided (no SVG): skip this section, use static image everywhere with the gold CSS filter, and leave a comment `// TODO: Replace with SVG for draw-on animation`.

  

---

  

## SECTION 11: PAGE TRANSITIONS

  

Implement with Framer Motion `AnimatePresence` in `app/layout.tsx`.

  

On route change, a thin gold bar (`height: 2px`, `background: var(--gold)`) sweeps from left to right (`scaleX: 0 → 1`, `transformOrigin: left`) in 250ms, then sweeps out (`scaleX: 0`, `transformOrigin: right`) in 200ms. Simultaneously, page content fades `opacity: 1 → 0` on exit, `0 → 1` on enter.

  

---

  

## SECTION 12: CUSTOM CURSOR

  

Update `CustomCursor.tsx` to gold. No blue anywhere.

  

- Dot: 5px, `background: #C9A84C`, position fixed, `z-index: 9997`

- Ring: 34px, `border: 1.5px solid rgba(201, 168, 76, 0.45)`, position fixed, `z-index: 9997`

- Ring on hover over interactive elements: scales to 50px, border `rgba(201, 168, 76, 0.9)`, slightly faster response

- Both elements: `pointer-events: none`

- Dot follows cursor with 0ms lag (direct `mousemove`)

- Ring follows cursor with lerp (~80ms lag)

- Disable on `@media (hover: none)` — hide `CustomCursor` component entirely on touch

  

`body { cursor: none !important; }` — apply globally in globals.css. Also set `cursor: none !important` on `*` to override browser defaults on all elements.

  

---

  

## SECTION 13: LENIS SMOOTH SCROLL

  

Preserve and verify the existing `LenisProvider.tsx`. Settings:

- `duration: 1.2`

- `easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`

  

Wrap `app/layout.tsx` content in `<LenisProvider>`. Verify that GSAP ScrollTrigger is synchronized with Lenis using the Lenis ScrollTrigger integration:

  

```ts

// Inside LenisProvider useEffect, after lenis is created:

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => { lenis.raf(time * 1000) })

gsap.ticker.lagSmoothing(0)

```

  

This ensures GSAP scroll animations stay in sync with Lenis smooth scroll.

  

---

  

## SECTION 14: MICRO-INTERACTIONS AND DETAIL

  

Implement these details throughout. Do not skip any.

  

### Tag Filter — Glowing Active State

Active pill: `box-shadow: 0 0 16px rgba(201,168,76,0.4), 0 0 32px rgba(201,168,76,0.15), inset 0 1px 0 rgba(255,255,255,0.1)`. The pill appears to emit light.

  

### Back Link on Note Pages

Arrow `←` animates independently: `whileHover={{ x: -5 }}` on Framer Motion. The text simultaneously shifts to `var(--gold)`.

  

### Note Card "Read excerpt" Link

On card hover, the `→` arrow smoothly slides right 6px (`whileHover={{ x: 6 }}`). Color is `var(--gold)`.

  

### Header Wordmark

"DAVIS HIGGINS" has a very subtle gold underline `border-bottom: 1px solid rgba(201,168,76,0.2)` that appears on header scroll-past-60px alongside the glass background.

  

### Section Dividers

Between the featured card and the regular feed: a full-width `1px solid rgba(201,168,76,0.1)` line with the label "ALL NOTES" centered on it in DM Sans 600, 10px, uppercase, `letter-spacing: 0.2em`, `var(--text-dim)` — like a section heading embedded in the rule.

  

### Gold Horizontal Lines

Use thin gold lines (`1px solid rgba(201,168,76,0.12)`) as section punctuation throughout the page. Between hero and marquee. Between marquee and feed. Before and after the filter pills.

  

### "Read excerpt" — hover state

Full underline slide-in on hover: use a `::after` pseudo-element or a Framer Motion layout animation that creates an underline that grows from left to right on hover. Color: `var(--gold)`.

  

### Note Number

Add a note number to each card (01, 02, 03... based on sort position) displayed in the top-right corner of the card. Syne 700, `clamp(36px, 4vw, 52px)`, `opacity: 0.06`, `var(--text)`. Creates depth and visual interest.

  

---

  

## SECTION 15: FONT LOADING IN layout.tsx

  

```tsx

import { Syne, DM_Sans, Lora } from 'next/font/google'

  

const syne = Syne({

  subsets: ['latin'],

  weight: ['700', '800'],

  variable: '--font-syne',

})

  

const dmSans = DM_Sans({

  subsets: ['latin'],

  weight: ['400', '500', '600', '700'],

  variable: '--font-dm-sans',

})

  

const lora = Lora({

  subsets: ['latin'],

  weight: ['400'],

  style: ['normal', 'italic'],

  variable: '--font-lora',

})

  

// Apply to html tag:

<html className={`${syne.variable} ${dmSans.variable} ${lora.variable}`}>

```

  

---

  

## SECTION 16: NEXT.CONFIG.TS — ADD SVGR

  

To render SVGs as React components (required for the draw-on animation):

  

```ts

// next.config.ts

import type { NextConfig } from 'next'

  

const nextConfig: NextConfig = {

  webpack(config) {

    config.module.rules.push({

      test: /\.svg$/,

      use: ['@svgr/webpack'],

    })

    return config

  },

}

  

export default nextConfig

```

  

Install: `npm install @svgr/webpack --save-dev`

  

This allows: `import NotesLogo from '@/public/noteslogo.svg'` and rendering it as `<NotesLogo />`.

  

---

  

## SECTION 17: PACKAGE.JSON — VERIFY DEPENDENCIES

  

Confirm all of these are installed. Install any that are missing before starting implementation.

  

```json

{

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

    "postcss": "^8.4.0",

    "@svgr/webpack": "^8.0.0"

  }

}

```

  

---

  

## SECTION 18: FINAL AUDIT CHECKLIST

  

Before calling the implementation complete, verify every item:

  

**Color**

- [ ] Zero instances of #0055FF, #4B9CD3, or any blue in CSS variables

- [ ] Every interactive accent is gold

- [ ] Reading progress bar is gold

- [ ] Custom cursor ring is gold

- [ ] Category pills use gold spectrum

- [ ] Marquee text is gold

  

**Typography**

- [ ] Syne loaded and used for all display text

- [ ] DM Sans loaded and used for all UI text

- [ ] Lora loaded and used for note body prose

- [ ] No Inter, no Roboto, no system fonts

  

**Animations**

- [ ] Hero character split animation fires on load

- [ ] Hero ScrollTrigger exit works (push-away on scroll)

- [ ] Cards stagger-enter on scroll with whileInView

- [ ] Featured note card animates in

- [ ] Filter transition uses AnimatePresence

- [ ] Magnetic card mouse tracking implemented

- [ ] Header transforms on scroll

- [ ] Page transitions implemented

- [ ] Custom cursor follows mouse (gold)

- [ ] Lenis + ScrollTrigger synchronized

  

**Categories**

- [ ] Exactly 5 categories: All, Projects, Data & AI, Business, Personal

- [ ] All 11 MDX files have updated tags matching the 5-category system

- [ ] Filter shows correct note counts per category

- [ ] AnimatePresence fires on filter change

  

**Header**

- [ ] No square/box around logo

- [ ] Logo is larger (52px height), floating

- [ ] Gold filter applied to logo

- [ ] Wordmark shows DAVIS HIGGINS + Curated Notes

- [ ] Scroll behavior: transparent → glass transition

  

**Footer**

- [ ] Logo is 160px height (much larger)

- [ ] Gold filter applied

- [ ] 15 Bible verses rotate with AnimatePresence fade

- [ ] Year shows 2026

- [ ] Gold separator line present

  

**Content**

- [ ] Zero em dashes anywhere in the codebase

- [ ] All 11 notes exist with full content

- [ ] All titles cleaned (no "actually", no em dashes)

- [ ] "Read excerpt" used everywhere (not "Read note")

- [ ] Dates show 2026

- [ ] Favicon is noteslogo file

  

**Build**

- [ ] `npm run build` passes with zero TypeScript errors

- [ ] No console errors in browser

- [ ] Lenis smooth scroll works

- [ ] Mobile: custom cursor hidden, default cursor restored, layout responsive