# VolFootball Landing Page

Landing page neo/cyberpunk para **VolFootball** — plataforma SaaS de gestion de ligas de futbol amateur.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (tema neo dark)
- **Framer Motion** (animaciones)
- **Arquitectura MVVM** (models / viewmodels / views)

## Estructura

```
src/
├── app/            # Layout, page, globals.css
├── models/         # Tipos e interfaces (Feature, Role, Stat)
├── viewmodels/     # Hooks de estado y datos (useLanding)
└── views/          # Componentes UI
    ├── Navbar       # Nav sticky glassmorphism
    ├── Hero         # Titulo animado + CTA
    ├── PixelBall    # Balon 8-bit SVG flotante
    ├── Features     # 4 cards con glow hover
    ├── Stats        # Counters animados
    ├── Roles        # 4 roles con slide alternado
    ├── CTA          # Banner final con glow pulse
    └── Footer       # Links + creditos
```

## Desarrollo

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm start
```

## Autor

Desarrollado por **FastCode**
