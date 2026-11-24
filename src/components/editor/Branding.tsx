'use client'

// Identidad y legal branding de la suite Vórtex (Vortex Company).
// Unica fuente de verdad para logo, textos legales y pie de pagina.

export const SUPPORT_EMAIL = 'vortexmusic.soporte.app@gmail.com'

export const VORTEX_ABOUT_TEXT =
  'Vórtex Editor es una aplicación de edición de imágenes desarrollada íntegramente con código propio por Vortex Company. ' +
  'Todo el procesamiento se realiza de forma local en tu navegador: tus archivos no se suben a ningún servidor sin tu consentimiento explícito. ' +
  'La aplicación es gratuita, no contiene publicidad y no incorpora marcas ni activos de terceros.'

export const LEGAL_LINE =
  'Derechos Reservados © 2026 Vortex Company. Todos los derechos reservados.'

export const LEGAL_LOCAL_TEXT =
  'Todo el procesamiento de imágenes se realiza de forma local en tu navegador: tus archivos no se suben a ningún servidor sin tu consentimiento explícito. ' +
  'Aplicación desarrollada con código 100% propio por Vortex Company, gratuita, sin publicidad y sin marcas ni activos de terceros.'

export const SUPPORT_NOTE =
  `Soporte oficial: ${SUPPORT_EMAIL} — el mismo soporte de la misma compañía que atiende Vórtex Music, Vórtex Editor y Vórtex PDF.`

// ---------- Variantes por producto de la suite ----------

export type VortexProduct = 'editor' | 'pdf' | 'studio'

const PRODUCT_NAMES: Record<VortexProduct, { first: string; second: string }> = {
  editor: { first: 'Vórtex', second: 'Editor' },
  pdf: { first: 'Vórtex', second: 'PDF' },
  studio: { first: 'Vórtex', second: 'Studio' },
}

const PRODUCT_TAGLINES: Record<VortexProduct, string> = {
  editor: 'Tu editor, sin límites.',
  pdf: 'Tus PDF, sin límites.',
  studio: 'Tu suite de creación, sin límites.',
}

const PRODUCT_LOCAL_TEXT: Record<VortexProduct, string> = {
  editor:
    'Todo el procesamiento de imágenes se realiza de forma local en tu navegador: tus archivos no se suben a ningún servidor sin tu consentimiento explícito. ' +
    'Aplicación desarrollada con código 100% propio por Vortex Company, gratuita, sin publicidad y sin marcas ni activos de terceros.',
  pdf:
    'Todo el procesamiento de PDF se realiza de forma local en tu navegador: tus documentos no se suben a ningún servidor y ningún dato sale de tu dispositivo. ' +
    'Aplicación desarrollada con código 100% propio por Vortex Company, gratuita, sin publicidad y sin marcas ni activos de terceros.',
  studio:
    'Todas las aplicaciones de la suite procesan tus archivos de forma local en tu navegador: tus datos no se suben a ningún servidor sin tu consentimiento explícito. ' +
    'Suite desarrollada con código 100% propio por Vortex Company, gratuita, sin publicidad y sin marcas ni activos de terceros.',
}

export function VortexLogo({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient id="vortex-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="21" fill="none" stroke="url(#vortex-grad)" strokeWidth="3.5" />
      <path
        d="M24 8 a16 16 0 1 1 -11.3 4.7"
        fill="none"
        stroke="url(#vortex-grad)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M24 15 a9 9 0 1 0 9 9"
        fill="none"
        stroke="url(#vortex-grad)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="24" cy="24" r="3.2" fill="url(#vortex-grad)" />
    </svg>
  )
}

/** Pie de pagina legal completo, con la identidad de cada producto de la suite */
export function LegalFooter({ product = 'editor' }: { product?: VortexProduct }) {
  const name = PRODUCT_NAMES[product]
  return (
    <footer
      aria-label={`Información legal de ${name.first} ${name.second}`}
      className="mt-auto border-t border-teal-400/15 bg-[#04120f] text-muted-foreground relative z-10"
    >
      <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col items-center text-center gap-1.5">
        <div className="flex items-center gap-2.5 mb-1">
          <VortexLogo className="w-8 h-8" />
          <div className="text-left">
            <p className="text-lg font-bold leading-tight">
              <span className="text-violet-400">{name.first}</span>{' '}
              <span className="text-foreground">{name.second}</span>
            </p>
            <p className="text-[11px] text-muted-foreground">Gratis · Sin anuncios</p>
          </div>
        </div>

        <p className="text-sm mt-2">
          <span className="font-semibold text-foreground/90">{PRODUCT_TAGLINES[product]}</span>{' '}
          <span className="text-muted-foreground">Gratis y sin anuncios.</span>
        </p>

        <nav
          aria-label="Enlaces legales"
          className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-[13px] mt-3"
        >
          <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-foreground transition-colors">
            Contacto
          </a>
        </nav>

        <p className="text-[12.5px] leading-relaxed max-w-xl mt-3">{PRODUCT_LOCAL_TEXT[product]}</p>
        <p className="text-[12.5px] leading-relaxed max-w-xl">{SUPPORT_NOTE}</p>

        <div className="mt-5 pt-4 border-t border-border/70 w-full flex flex-col items-center gap-0.5">
          <p className="text-[12.5px]">{LEGAL_LINE}</p>
          <p className="text-[12.5px] text-muted-foreground/80">Vórtex Studio</p>
        </div>
      </div>
    </footer>
  )
}
