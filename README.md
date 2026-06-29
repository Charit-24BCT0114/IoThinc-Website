# IoTHINC Website — Frontend

Official website frontend for **IoTHINC**, the IoT club at VIT Vellore. Built with Next.js, TypeScript, and Tailwind CSS.

---

## Tech Stack

- **Framework** — Next.js 14 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS
- **Icons** — Lucide React
- **Canvas** — Custom circuit board particle animation

---

## Project Structure

```
frontend/
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── About.tsx           # About section with circuit bg
│   ├── Contact.tsx         # Contact form + info
│   ├── Footer.tsx
│   ├── Header.tsx          # Nav with tab switching
│   ├── Hero.tsx            # Landing hero with typewriter
│   ├── ParticleBackground.tsx  # Global circuit canvas
│   ├── Projects.tsx
│   ├── TabLayout.tsx       # Root layout with tab state
│   └── Team.tsx            # Team members grid
├── public/
├── .env.local
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
cd frontend
npm install
```

### Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

> Change the port if your backend runs on a different port.

### Running the Dev Server

```bash
npm run dev -- --port 3008
```

App will be available at `http://localhost:3008`.

---

## Pages / Tabs

The site uses a single-page tab layout managed by `TabLayout.tsx`:

| Tab | Component | Description |
|-----|-----------|-------------|
| Home | `Hero` + `About` + `Team` | Landing page with scroll sections |
| Projects | `Projects` | Club projects grid |
| Team | `Team` | Committee members |
| Contact | `Contact` | Contact form + info |

---

## API Integration

The frontend communicates with the backend at `NEXT_PUBLIC_API_URL`.

| Endpoint | Used In |
|----------|---------|
| `GET /api/committee-members?year=2025-2026` | `Team.tsx` |
| `GET /api/projects` | `Projects.tsx` |

If the API is unreachable, fallback static data is shown automatically.

---

## Notes

- All section backgrounds use pure black (`#000000`) for consistency
- Circuit particle animation is rendered on a `<canvas>` element per section
- Tab switching uses conditional rendering (`&&`) for sections that need canvas animations to mount fresh