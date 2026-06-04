import { getAllNotes } from '@/lib/notes'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Marquee } from '@/components/Marquee'
import { TagFilter } from '@/components/TagFilter'
import { Footer } from '@/components/Footer'
import { PageTransition } from '@/components/PageTransition'

export default function HomePage() {
  const notes = getAllNotes()

  return (
    <>
      <Header />
      <PageTransition>
        <main>
          <Hero />
          <Marquee />

          <section className="px-6 sm:px-10 py-24">
            <div className="max-w-[1200px] mx-auto">
              <header className="text-center mb-12">
                <p
                  className="font-body"
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: 12,
                  }}
                >
                  The Feed
                </p>
                <h2
                  className="font-display"
                  style={{
                    fontSize: 'clamp(28px, 4vw, 44px)',
                    fontWeight: 800,
                    color: '#fff',
                    margin: 0,
                  }}
                >
                  Notes &amp; Breakdowns
                </h2>
              </header>

              <TagFilter notes={notes} />
            </div>
          </section>

          <Footer />
        </main>
      </PageTransition>
    </>
  )
}
