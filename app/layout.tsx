import type { Metadata } from 'next'
import { Syne, Inter } from 'next/font/google'
import '../styles/globals.css'
import { LenisProvider } from '@/providers/LenisProvider'
import { CustomCursor } from '@/components/CustomCursor'

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Curated Notes — Davis Higgins',
  description:
    'Thinking out loud on data science, AI, and building. A premium personal writing hub by Davis Higgins.',
  metadataBase: new URL('https://notes.davishiggins.com'),
  openGraph: {
    title: 'Curated Notes — Davis Higgins',
    description: 'Thinking out loud on data science, AI, and building.',
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
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body>
        <CustomCursor />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}
