# Gimnasio RBN — App TV

Pantalla de sala para Smart TV / navegador en televisor. Muestra bienvenida de check-in, socios en sala y próximas clases. Se conecta a un backend simple por HTTP.

## Arranque rápido

```bash
cd tv-app
cp .env.example .env   # si aún no tienes .env
npm install

# Terminal 1 — API mock (puerto 3001)
npm run dev:api

# Terminal 2 — Front (Vite)
npm run dev
```

Abre la URL de Vite en la TV (o en el navegador a pantalla completa / F11).

## Conectar tu backend real

En `.env`:

```
VITE_API_URL=https://tu-api.ejemplo.com
```

Endpoints esperados (JSON):

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/gym` | `{ id, name, tagline, location }` |
| GET | `/users` | lista de socios |
| GET | `/checkins` | accesos (`userId`, `at`, `active`) |
| GET | `/classes` | clases del día |

El front hace polling cada 8 s. Cuando un socio hace check-in en el back, aparece en la TV sin recargar.

## Diseño TV

- Tipografía grande (UI de ~3 m / 10 pies)
- Márgenes seguros contra overscan
- Escala con `clamp` / `vw` para 1080p y 4K
- Alto contraste, sin depender de hover
- Layout adaptable a 16:9 y pantallas más cuadradas

## Estructura

```
tv-app/
  db.json          # datos mock del API
  src/api/         # cliente HTTP + tipos
  src/components/  # bloques de la pantalla
  src/styles/tv.css
```
