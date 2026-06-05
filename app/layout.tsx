import type { Metadata } from 'next'
import { Syne, DM_Sans, Lora } from 'next/font/google'
import '../styles/globals.css'
import { LenisProvider } from '@/providers/LenisProvider'
import { CustomCursor } from '@/components/CustomCursor'
import { PageTransition } from '@/components/PageTransition'

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Curated Notes | Davis Higgins',
  description:
    'A public notebook by Davis Higgins. Data science, AI, building, faith, and the systems behind the work.',
  metadataBase: new URL('https://notes.davishiggins.com'),
  icons: {
    icon: '/cnoteslogo.png',
    apple: '/cnoteslogo.png',
  },
  openGraph: {
    title: 'Curated Notes | Davis Higgins',
    description:
      'A public notebook by Davis Higgins. Data science, AI, building, faith, and the systems behind the work.',
    url: 'https://notes.davishiggins.com',
    siteName: 'Curated Notes',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${lora.variable}`}
    >
      <body>
        <CustomCursor />
        <LenisProvider>
          <PageTransition>{children}</PageTransition>
        </LenisProvider>
      </body>
    </html>
  )
}
