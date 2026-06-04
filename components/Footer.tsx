import Image from 'next/image'

export function Footer() {
  return (
    <footer
      className="flex flex-col items-center text-center gap-4"
      style={{ padding: '48px 24px 32px' }}
    >
      <Image
        src="/dh-logo.png"
        alt="Davis Higgins logo"
        width={28}
        height={28}
        style={{ objectFit: 'contain', opacity: 0.7 }}
      />
      <p
        className="font-body"
        style={{
          fontSize: 12,
          fontStyle: 'italic',
          color: 'var(--text-muted)',
          maxWidth: 420,
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        &ldquo;I can do all things through Christ who strengthens me.&rdquo; &mdash;
        Philippians 4:13
      </p>
      <p
        className="font-body"
        style={{ fontSize: 11, color: 'var(--text-dim)', margin: 0 }}
      >
        © 2025 Davis Higgins · notes.davishiggins.com
      </p>
    </footer>
  )
}
