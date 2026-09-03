import { useCallback } from 'react'
import { fetchTvBoard } from './api/client'
import { ActiveMembers } from './components/ActiveMembers'
import { BrandHero } from './components/BrandHero'
import { ClassSchedule } from './components/ClassSchedule'
import { StatusBar } from './components/StatusBar'
import { WelcomePanel } from './components/WelcomePanel'
import { usePolling } from './hooks/usePolling'
import './styles/tv.css'

export default function App() {
  const load = useCallback(() => fetchTvBoard(), [])
  const { data, error, loading } = usePolling(load, 8000)

  if (loading && !data) {
    return (
      <div className="tv-shell tv-shell--boot">
        <p className="boot-text">Cargando RBN…</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="tv-shell tv-shell--boot">
        <p className="boot-text">No se pudo conectar con el servidor</p>
        <p className="boot-sub">{error}</p>
      </div>
    )
  }

  const latest = data.checkIns[0] ?? null

  return (
    <div className="tv-shell">
      <div className="tv-atmosphere" aria-hidden="true" />
      <div className="tv-safe">
        <BrandHero brand={data.gym.name} tagline={data.gym.tagline} />

        <main className="tv-main">
          <WelcomePanel latest={latest} />
          <div className="tv-side">
            <ActiveMembers members={data.activeMembers} />
            <ClassSchedule classes={data.classes} />
          </div>
        </main>

        <StatusBar
          connected={!error}
          error={error}
          location={data.gym.location}
        />
      </div>
    </div>
  )
}
