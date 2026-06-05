import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllNotes, getNoteBySlug } from '@/lib/notes'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ReadingProgress } from '@/components/ReadingProgress'
import { NoteReveal } from '@/components/NoteReveal'
import { NoteIntro } from '@/components/NoteIntro'
import { BackLink } from '@/components/BackLink'

export function generateStaticParams() {
  return getAllNotes().map((note) => ({ slug: note.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const note = getNoteBySlug(slug)
  if (!note) return { title: 'Note not found | Curated Notes' }
  return {
    title: `${note.title} | Curated Notes`,
    description: note.excerpt,
    openGraph: {
      title: note.title,
      description: note.excerpt,
      type: 'article',
    },
  }
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const note = getNoteBySlug(slug)

  if (!note) {
    notFound()
  }

  return (
    <>
      <ReadingProgress />
      <Header />

      <main className="px-6 sm:px-10 pt-32 pb-8">
        <article className="max-w-[680px] mx-auto">
          <div className="mb-10">
            <BackLink />
          </div>

          <NoteIntro
            title={note.title}
            tag={note.tag}
            date={note.date}
            readTime={note.readTime}
          />

          <NoteReveal>
            <div className="prose prose-invert max-w-none">
              <MDXRemote source={note.content} />
            </div>

            {note.relatedProject && (
              <div
                className="group mt-14 transition-colors duration-300"
                style={{
                  background: 'rgba(201,168,76,0.04)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: 12,
                  padding: '24px 28px',
                }}
              >
                <p
                  className="font-ui"
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    fontWeight: 600,
                    margin: 0,
                  }}
                >
                  Related Project
                </p>
                <a
                  href={note.relatedProject}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-2 mt-3 font-display"
                  style={{ fontSize: 16, fontWeight: 700, color: 'var(--gold)' }}
                  data-cursor="pointer"
                >
                  <span>{note.relatedProjectLabel ?? 'View Project'}</span>
                  <span
                    aria-hidden
                    className="transition-transform duration-200 group-hover/link:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </div>
            )}
          </NoteReveal>
        </article>
      </main>

      <Footer />
    </>
  )
}
