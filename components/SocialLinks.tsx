'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

type LinkItem = {
  label: string
  href: string
  icon: React.ReactNode
}

const LinkedInIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
)

const InstagramIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.2" stroke="currentColor" strokeWidth="1.9" />
    <circle cx="12" cy="12" r="4.4" stroke="currentColor" strokeWidth="1.9" />
    <circle cx="17.6" cy="6.4" r="1.3" fill="currentColor" />
  </svg>
)

const GitHubIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
  </svg>
)

const imgIcon = (src: string) => (
  <Image
    src={src}
    alt=""
    width={24}
    height={24}
    style={{ width: 24, height: 24, objectFit: 'contain' }}
  />
)

const LINKS: LinkItem[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/davishiggins/', icon: LinkedInIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/higgins.digital', icon: InstagramIcon },
  { label: 'Davis Higgins', href: 'https://davishiggins.com', icon: imgIcon('/dh-logo.png') },
  { label: 'CrownCode AI', href: 'https://crowncode.higginsd.com', icon: imgIcon('/crowncode-icon.png') },
  { label: 'Higgins Digital', href: 'https://higginsd.com', icon: imgIcon('/hdlogo.png') },
  { label: 'GitHub', href: 'https://github.com/DavisHiggins', icon: GitHubIcon },
]

// Display the destination without the protocol or a trailing slash.
function cleanUrl(href: string): string {
  return href.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

export function SocialLinks() {
  return (
    <motion.nav
      aria-label="Social and project links"
      className="flex flex-wrap items-center justify-center gap-3.5"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {LINKS.map((item, i) => (
        <motion.div
          key={item.label}
          className="group relative flex"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.06, ease: 'easeOut' }}
        >
          {/* Hover tooltip showing the destination link */}
          <span
            className="pointer-events-none absolute left-1/2 bottom-full mb-3 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 font-ui"
            style={{
              background: 'rgba(6,8,15,0.96)',
              border: '1px solid var(--gold-border)',
              color: 'var(--text)',
              fontSize: 11,
              padding: '5px 10px',
              boxShadow: '0 6px 20px rgba(0,0,0,0.45)',
            }}
          >
            {cleanUrl(item.href)}
          </span>

          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${item.label} (${cleanUrl(item.href)})`}
            data-cursor="pointer"
            className="social-icon"
          >
            {item.icon}
          </a>
        </motion.div>
      ))}
    </motion.nav>
  )
}
