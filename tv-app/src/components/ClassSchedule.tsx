import type { GymClass } from '../api/types'

type Props = {
  classes: GymClass[]
}

export function ClassSchedule({ classes }: Props) {
  return (
    <section className="panel" aria-label="Próximas clases">
      <div className="panel__head">
        <h2 className="panel__title">Próximas clases</h2>
      </div>
      {classes.length === 0 ? (
        <p className="panel__empty">Sin clases programadas</p>
      ) : (
        <ul className="class-list">
          {classes.map((c) => (
            <li key={c.id} className="class-list__item">
              <time className="class-list__time">
                {c.startsAt}
                <span aria-hidden="true">–</span>
                {c.endsAt}
              </time>
              <div className="class-list__body">
                <p className="class-list__name">{c.name}</p>
                <p className="class-list__meta">
                  {c.coach} · {c.room}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
