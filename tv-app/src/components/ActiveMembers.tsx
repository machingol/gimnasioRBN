import type { CheckInWithUser } from '../api/types'
import { initials, relativeCheckIn } from '../lib/format'
import { useClock } from '../hooks/useClock'

type Props = {
  members: CheckInWithUser[]
}

export function ActiveMembers({ members }: Props) {
  const now = useClock(30_000)

  return (
    <section className="panel" aria-label="En la sala ahora">
      <div className="panel__head">
        <h2 className="panel__title">En la sala</h2>
        <span className="panel__count">{members.length}</span>
      </div>
      {members.length === 0 ? (
        <p className="panel__empty">Nadie en sala por ahora</p>
      ) : (
        <ul className="member-list">
          {members.map((m) => (
            <li key={m.id} className="member-list__item">
              <div className="avatar" aria-hidden="true">
                {m.user.avatar ? (
                  <img src={m.user.avatar} alt="" />
                ) : (
                  <span>{initials(m.user.name)}</span>
                )}
              </div>
              <div className="member-list__text">
                <p className="member-list__name">{m.user.name}</p>
                <p className="member-list__sub">
                  {m.user.plan} · {relativeCheckIn(m.at, now)}
                </p>
              </div>
              <span className="dot" aria-hidden="true" />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
