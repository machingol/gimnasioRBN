import { formatDate, formatTime } from '../lib/format'
import { useClock } from '../hooks/useClock'

type Props = {
  brand: string
  tagline: string
}

export function BrandHero({ brand, tagline }: Props) {
  const now = useClock()

  return (
    <header className="brand-hero">
      <div className="brand-hero__mark" aria-hidden="true">
        <span className="brand-hero__pulse" />
      </div>
      <div className="brand-hero__text">
        <p className="brand-hero__eyebrow">Pantalla de sala</p>
        <h1 className="brand-hero__name">{brand}</h1>
        <p className="brand-hero__tagline">{tagline}</p>
      </div>
      <div className="brand-hero__clock">
        <time dateTime={now.toISOString()} className="brand-hero__time">
          {formatTime(now)}
        </time>
        <p className="brand-hero__date">{formatDate(now)}</p>
      </div>
    </header>
  )
}
