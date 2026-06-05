import { getAllNotes } from '@/lib/notes'
import type { Note } from '@/lib/notes'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Marquee } from '@/components/Marquee'
import { FeaturedNoteCard } from '@/components/FeaturedNoteCard'
import { TagFilter } from '@/components/TagFilter'
import { Footer } from '@/components/Footer'
import { HashScroll } from '@/components/HashScroll'

const FEATURED_SLUGS = [
  'propify-breakdown',
  'balancing-everything',
  'faith-christ-relationship',
]

export default function HomePage() {
  const notes = getAllNotes()
  const bySlug = (slug: string) => notes.find((n) => n.slug === slug)
  const featured = FEATURED_SLUGS.map(bySlug).filter(Boolean) as Note[]

  return (
    <>
      <HashScroll />
      <Header />
      <main>
        <Hero />
        <Marquee />

        <section className="px-6 sm:px-10 py-24">
          <div className="max-w-[1100px] mx-auto">
            {/* Featured row: three notes, squeezed left to right */}
            <div id="featured" className="scroll-mt-28" />
            <div className="flex items-center gap-4 mb-7">
              <span
                className="font-ui"
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                }}
              >
                Featured
              </span>
              <span
                aria-hidden
                className="rule-shimmer"
                style={{ flex: 1, height: 1.5, borderRadius: 2 }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
              {featured.map((note, i) => (
                <FeaturedNoteCard key={note.slug} note={note} index={i} />
              ))}
            </div>

            {/* Section divider with embedded label, anchor target for back link */}
            <div id="all-notes" className="relative my-16 scroll-mt-28" aria-hidden>
              <div
                style={{
                  height: 1,
                  background:
                    'linear-gradient(90deg, transparent, rgba(201,168,76,0.18) 30%, rgba(0,85,255,0.18) 70%, transparent)',
                  width: '100%',
                }}
              />
              <span
                className="font-ui absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4"
                style={{
                  background: 'var(--bg)',
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--text-dim)',
                }}
              >
                All Notes
              </span>
            </div>

            <TagFilter notes={notes} />
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
