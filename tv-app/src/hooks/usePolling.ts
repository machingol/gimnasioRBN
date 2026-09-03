import { useEffect, useRef, useState } from 'react'

type PollState<T> = {
  data: T | null
  error: string | null
  loading: boolean
}

export function usePolling<T>(
  fetcher: () => Promise<T>,
  intervalMs = 8000,
): PollState<T> {
  const [state, setState] = useState<PollState<T>>({
    data: null,
    error: null,
    loading: true,
  })
  const fetcherRef = useRef(fetcher)

  useEffect(() => {
    fetcherRef.current = fetcher
  }, [fetcher])

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const data = await fetcherRef.current()
        if (!cancelled) {
          setState({ data, error: null, loading: false })
        }
      } catch (err) {
        if (!cancelled) {
          setState((prev) => ({
            data: prev.data,
            error: err instanceof Error ? err.message : 'Error de conexión',
            loading: false,
          }))
        }
      }
    }

    void load()
    const id = window.setInterval(() => void load(), intervalMs)
    return () => {
      cancelled = true
      window.clearInterval(id)
    }
  }, [intervalMs])

  return state
}
