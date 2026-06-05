'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { SocialLinks } from './SocialLinks'

const GOLD_FILTER =
  'brightness(0) saturate(100%) invert(74%) sepia(45%) saturate(600%) hue-rotate(5deg) brightness(95%)'

const VERSES = [
  { ref: 'Philippians 4:13', text: 'I can do all things through Christ who strengthens me.' },
  {
    ref: 'Philippians 4:6-7',
    text: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.',
  },
  {
    ref: 'John 3:16',
    text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
  },
  {
    ref: 'Philippians 3:13',
    text: 'Brothers and sisters, I do not consider myself yet to have taken hold of it. But one thing I do: Forgetting what is behind and straining toward what is ahead.',
  },
  {
    ref: 'Colossians 3:12',
    text: "Therefore, as God's chosen people, holy and dearly loved, clothe yourselves with compassion, kindness, humility, gentleness and patience.",
  },
  { ref: '1 Peter 5:7', text: 'Cast all your anxiety on him because he cares for you.' },
  {
    ref: 'James 1:2-4',
    text: 'Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance. Let perseverance finish its work so that you may be mature and complete, not lacking anything.',
  },
  {
    ref: 'Romans 12:2',
    text: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God's will is, his good, pleasing and perfect will.",
  },
  {
    ref: 'Proverbs 3:5-6',
    text: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
  },
  {
    ref: 'Joshua 1:9',
    text: 'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.',
  },
  {
    ref: 'Isaiah 40:31',
    text: 'But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.',
  },
  { ref: 'Psalm 23:1', text: 'The Lord is my shepherd, I lack nothing.' },
  {
    ref: 'Romans 8:28',
    text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
  },
  {
    ref: 'Matthew 6:33',
    text: 'But seek first his kingdom and his righteousness, and all these things will be given to you as well.',
  },
  {
    ref: '2 Timothy 1:7',
    text: 'For God has not given us a spirit of fear, but of power and of love and of a sound mind.',
  },
]

export function Footer() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % VERSES.length), 7000)
    return () => clearInterval(id)
  }, [])

  const verse = VERSES[index]

  return (
    <footer
      className="flex flex-col items-center text-center"
      style={{ padding: '80px 24px 48px' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="group"
        data-cursor="pointer"
      >
        <Image
          src="/cnoteslogo.png"
          alt="Davis Higgins logo"
          width={160}
          height={160}
          className="transition-all duration-300 group-hover:scale-[1.02]"
          style={{
            height: 'clamp(120px, 16vw, 160px)',
            width: 'auto',
            filter: GOLD_FILTER,
            marginBottom: 32,
          }}
        />
      </motion.div>

      <div style={{ marginBottom: 36 }}>
        <SocialLinks />
      </div>

      <span
        aria-hidden
        style={{ width: 60, height: 1, background: 'rgba(201,168,76,0.3)', marginBottom: 32 }}
      />

      <div
        className="flex flex-col items-center"
        style={{ minHeight: 96, maxWidth: 420, justifyContent: 'center' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={verse.ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="flex flex-col items-center"
          >
            <p
              className="font-ui"
              style={{
                fontSize: 10,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                fontWeight: 700,
                margin: 0,
              }}
            >
              {verse.ref}
            </p>
            <p
              className="font-body"
              style={{
                fontSize: 13,
                fontStyle: 'italic',
                color: 'rgba(242,239,233,0.5)',
                lineHeight: 1.65,
                marginTop: 8,
              }}
            >
              {verse.text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <p
        className="font-ui"
        style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 32 }}
      >
        © 2026 Davis Higgins · notes.davishiggins.com
      </p>
    </footer>
  )
}
