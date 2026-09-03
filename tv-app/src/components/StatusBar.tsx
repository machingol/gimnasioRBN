type Props = {
  connected: boolean
  error: string | null
  location: string
}

export function StatusBar({ connected, error, location }: Props) {
  return (
    <footer className="status-bar">
      <p className="status-bar__loc">{location}</p>
      <p
        className={
          connected ? 'status-bar__link status-bar__link--ok' : 'status-bar__link status-bar__link--err'
        }
      >
        <span className="status-bar__dot" aria-hidden="true" />
        {error ? `Sin conexión · ${error}` : 'Conectado al servidor'}
      </p>
    </footer>
  )
}
