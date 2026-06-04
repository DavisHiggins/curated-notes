import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllNotes, getNoteBySlug } from '@/lib/notes'
import { tagColor, formatDate } from '@/lib/tags'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ReadingProgress } from '@/components/ReadingProgress'
import { NoteReveal } from '@/components/NoteReveal'
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
  if (!note) return { title: 'Note not found — Curated Notes' }
  return {
    title: `${note.title} — Curated Notes`,
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

  const color = tagColor(note.tag)

  return (
    <>
      <ReadingProgress />
      <Header />

      <main className="px-6 sm:px-10 pt-32 pb-8">
        <article className="max-w-[720px] mx-auto">
          <NoteReveal>
            <div className="mb-10">
              <BackLink />
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className="font-display"
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color,
                  background: `${color}1A`,
                  padding: '4px 10px',
                  borderRadius: 999,
                }}
              >
                {note.tag}
              </span>
              <span
                className="font-body"
                style={{ fontSize: 13, color: 'var(--text-muted)' }}
              >
                {formatDate(note.date)}
              </span>
              <span style={{ color: 'var(--text-dim)' }}>·</span>
              <span
                className="font-body"
                style={{ fontSize: 13, color: 'var(--text-muted)' }}
              >
                {note.readTime}
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 800,
                color: '#fff',
                lineHeight: 1.05,
                maxWidth: 720,
                margin: 0,
              }}
            >
              {note.title}
            </h1>

            <hr
              style={{
                border: 'none',
                borderTop: '1px solid rgba(201,168,76,0.15)',
                margin: '32px 0',
              }}
            />

            {/* Body */}
            <div className="prose prose-invert prose-lg max-w-none">
              <MDXRemote source={note.content} />
            </div>

            {/* Related project callout */}
            {note.relatedProject && (
              <div
                className="mt-14"
                style={{
                  background: 'rgba(201,168,76,0.06)',
                  border: '1px solid rgba(201,168,76,0.3)',
                  borderRadius: 16,
                  padding: '28px 32px',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                <p
                  className="font-body"
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    margin: 0,
                  }}
                >
                  Related Project
                </p>
                <a
                  href={note.relatedProject}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 mt-3 font-display"
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: 'var(--gold)',
                  }}
                  data-cursor="pointer"
                >
                  <span>{note.relatedProjectLabel ?? 'View Project'}</span>
                  <span
                    aria-hidden
                    className="transition-transform duration-200 group-hover:translate-x-1.5"
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
