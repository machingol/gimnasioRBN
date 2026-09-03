import type { CheckInWithUser } from '../api/types'
import { initials, relativeCheckIn } from '../lib/format'
import { useClock } from '../hooks/useClock'

type Props = {
  latest: CheckInWithUser | null
}

export function WelcomePanel({ latest }: Props) {
  const now = useClock(30_000)

  if (!latest) {
    return (
      <section className="welcome welcome--empty" aria-label="Último acceso">
        <p className="welcome__label">Último acceso</p>
        <h2 className="welcome__name">Esperando check-in…</h2>
        <p className="welcome__meta">Los socios aparecerán aquí al entrar</p>
      </section>
    )
  }

  return (
    <section className="welcome" aria-label="Último acceso" key={latest.id}>
      <p className="welcome__label">Bienvenido / a</p>
      <div className="welcome__row">
        <div className="avatar avatar--xl" aria-hidden="true">
          {latest.user.avatar ? (
            <img src={latest.user.avatar} alt="" />
          ) : (
            <span>{initials(latest.user.name)}</span>
          )}
        </div>
        <div>
          <h2 className="welcome__name">{latest.user.name}</h2>
          <p className="welcome__meta">
            Plan {latest.user.plan} · {relativeCheckIn(latest.at, now)}
          </p>
        </div>
      </div>
    </section>
  )
}
