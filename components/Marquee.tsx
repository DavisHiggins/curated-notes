const PHRASE =
  'CURATED NOTES · DATA SCIENCE · AI · CHARLOTTE, NC · UNC CHARLOTTE · BUILDING IN PUBLIC · PROPIFY · CROWNCODE AI · HIGGINS DIGITAL · '

export function Marquee() {
  return (
    <div
      className="marquee-strip relative w-full overflow-hidden"
      style={{
        borderTop: '1px solid rgba(201,168,76,0.2)',
        borderBottom: '1px solid rgba(201,168,76,0.2)',
        background: 'rgba(255,255,255,0.02)',
      }}
      aria-hidden
    >
      <div className="marquee-track flex whitespace-nowrap py-3" style={{ width: 'max-content' }}>
        {[0, 1].map((i) => (
          <span
            key={i}
            className="font-display"
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--gold)',
              paddingRight: 0,
            }}
          >
            {PHRASE.repeat(2)}
          </span>
        ))}
      </div>
    </div>
  )
}
