const PHRASE =
  'CURATED NOTES · DAVIS HIGGINS · DATA SCIENCE · AI · CHARLOTTE NC · UNC CHARLOTTE · HIGGINS DIGITAL · PROPIFY · CROWNCODE AI · BUILDING IN PUBLIC · FAITH · GROWTH · '

export function Marquee() {
  return (
    <div
      className="marquee-strip relative w-full overflow-hidden"
      style={{
        borderTop: '1px solid rgba(201,168,76,0.15)',
        borderBottom: '1px solid rgba(201,168,76,0.15)',
        background: 'rgba(201,168,76,0.04)',
      }}
      aria-hidden
    >
      <div
        className="marquee-track flex whitespace-nowrap"
        style={{ width: 'max-content', padding: '14px 0' }}
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            className="font-ui"
            style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: 'var(--gold)',
            }}
          >
            {PHRASE.repeat(3)}
          </span>
        ))}
      </div>
    </div>
  )
}
