'use client'

// Portal Vórtex Studio: lanzador de la suite de Vortex Company.
// Cada aplicacion se despliega por separado en Vercel y este portal enlaza
// su URL (configurada en src/lib/apps.ts). Mientras una app no tenga URL
// desplegada, su tarjeta se muestra como "Desplegando".

import { APP_URLS } from '@/lib/apps'
import { LegalFooter, SUPPORT_EMAIL, VortexLogo } from '../editor/Branding'
import {
  Image as ImageIcon,
  FileText,
  Music2,
  Lock,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

interface SuiteCard {
  name: string
  tagline: string
  description: string
  icon: React.ReactNode
  accent: string
  /** URL de Vercel de la app desplegada; null si todavia no esta disponible */
  url: string | null
  status: 'listo' | 'proximamente' | 'externo'
}

const CARDS: SuiteCard[] = [
  {
    name: 'Vórtex Editor',
    tagline: 'Tu editor, sin límites',
    description:
      'Editor de imágenes profesional con capas, capas de ajuste, curvas, filtros, herramientas de dibujo, transformacion libre e IA. Todo local en tu navegador.',
    icon: <ImageIcon className="w-6 h-6" aria-hidden />,
    accent: 'text-amber-400',
    url: APP_URLS.editor,
    status: 'listo',
  },
  {
    name: 'Vórtex PDF',
    tagline: 'Tus PDF, sin límites',
    description:
      'Unir varios PDF, dividir por paginas o rangos, convertir (PDF a imagenes y texto, imagenes a PDF), firmar con tu firma dibujada, comprimir sin perder calidad y proteger con contraseña (AES-256).',
    icon: <FileText className="w-6 h-6" aria-hidden />,
    accent: 'text-violet-400',
    url: APP_URLS.pdf,
    status: 'listo',
  },
  {
    name: 'Vórtex Music',
    tagline: 'Tu música, sin límites',
    description:
      'La aplicacion musical de Vortex Company con la que empezo la suite. Disponible como app independiente con el mismo soporte oficial.',
    icon: <Music2 className="w-6 h-6" aria-hidden />,
    accent: 'text-emerald-400',
    url: null,
    status: 'externo',
  },
  {
    name: 'Vórtex Draw',
    tagline: 'Próximamente',
    description:
      'Dibujo vectorial con pluma, curvas bezier y formas. El complemento creativo perfecto para Vórtex Editor.',
    icon: <Sparkles className="w-6 h-6" aria-hidden />,
    accent: 'text-sky-400',
    url: null,
    status: 'proximamente',
  },
]

function SuiteCardView({ card }: { card: SuiteCard }) {
  const disabled = card.url === null
  const pendiente = card.status === 'listo' && disabled
  return (
    <div
      className={
        'rounded-xl border border-border bg-[#181818] p-6 flex flex-col gap-3 transition-colors ' +
        (disabled ? 'opacity-70' : 'hover:border-amber-500/50 cursor-pointer')
      }
      onClick={disabled ? undefined : () => window.open(card.url!, '_blank', 'noopener,noreferrer')}
    >
      <div className="flex items-center justify-between">
        <div className={'flex items-center gap-3 ' + card.accent}>
          {card.icon}
          <h2 className="text-base font-semibold text-foreground">{card.name}</h2>
        </div>
        <span
          className={
            'text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ' +
            (card.status === 'listo' && !disabled
              ? 'border-emerald-500/40 text-emerald-400'
              : card.status === 'externo'
                ? 'border-border text-muted-foreground'
                : 'border-amber-500/40 text-amber-400')
          }
        >
          {card.status === 'listo' && !disabled
            ? 'Disponible'
            : card.status === 'externo'
              ? 'App independiente'
              : pendiente
                ? 'Desplegando'
                : 'Próximamente'}
        </span>
      </div>
      <p className="text-xs text-muted-foreground">{card.tagline}</p>
      <p className="text-[13px] leading-relaxed text-muted-foreground flex-1">{card.description}</p>
      {!disabled ? (
        <button
          type="button"
          className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-500 hover:text-amber-400 self-start"
          onClick={(e) => {
            e.stopPropagation()
            window.open(card.url!, '_blank', 'noopener,noreferrer')
          }}
        >
          Abrir aplicacion <ArrowRight className="w-3.5 h-3.5" aria-hidden />
        </button>
      ) : (
        <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground self-start">
          <Lock className="w-3.5 h-3.5" aria-hidden />{' '}
          {pendiente ? 'URL de Vercel pendiente' : 'No disponible en esta suite'}
        </p>
      )}
    </div>
  )
}

export function StudioHome() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#121212] text-foreground">
      <header className="border-b border-border bg-[#1c1c1c] px-6 h-12 flex items-center gap-2.5 shrink-0">
        <VortexLogo className="w-6 h-6" />
        <span className="text-sm font-semibold tracking-wide">
          <span className="text-violet-400">Vórtex</span> Studio
        </span>
        <span className="text-[11px] text-muted-foreground hidden sm:inline">
          · Suite de creacion de Vortex Company
        </span>
        <span className="ml-auto text-[11px] text-muted-foreground hidden md:inline">
          Gratis · Sin anuncios · 100% local
        </span>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-12 flex flex-col items-center">
        <div className="flex flex-col items-center text-center gap-3 mb-10">
          <VortexLogo className="w-14 h-14" />
          <h1 className="text-2xl font-bold">
            Bienvenido a <span className="text-violet-400">Vórtex</span> Studio
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg">
            Una suite de aplicaciones creativas y productivas de Vortex Company. Cada app se abre
            desde su propio despliegue: elige una para comenzar.
          </p>
        </div>

        <section aria-label="Aplicaciones de la suite" className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {CARDS.map((c) => (
            <SuiteCardView key={c.name} card={c} />
          ))}
        </section>

        <p className="text-[12px] text-muted-foreground mt-8 text-center max-w-lg">
          Soporte oficial de toda la suite:{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-violet-400 hover:text-violet-300 break-all">
            {SUPPORT_EMAIL}
          </a>{' '}
          — el mismo soporte de la misma compania para Vórtex Music, Vórtex Editor y Vórtex PDF.
        </p>
      </main>

      <LegalFooter product="studio" />
    </div>
  )
}
