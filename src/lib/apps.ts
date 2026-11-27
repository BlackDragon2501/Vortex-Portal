// URLs de produccion de las apps de la suite.
//
// 28 apps estan desplegadas en Cloudflare Pages (*.pages.dev).
// editor y music se quedan en Vercel: tienen backend (API routes),
// y Cloudflare Pages solo sirve sitios estaticos.
//
// Si una URL es null, su tarjeta en el portal se muestra como
// "Desplegando"/"No disponible" y no es pulsable.

export const APP_URLS: {
  editor: string | null
  pdf: string | null
  music: string | null
  draw: string | null
  tasks: string | null
  notes: string | null
  vault: string | null
  clipboard: string | null
  scan: string | null
  voice: string | null
  screen: string | null
  split: string | null
  lens: string | null
  convert: string | null
  color: string | null
  qr: string | null
  compress: string | null
  media: string | null
  tts: string | null
  formatter: string | null
  sub: string | null
  hashpass: string | null
  calc: string | null
  watermark: string | null
  splitav: string | null
  clean: string | null
  ink: string | null
  math: string | null
  invoice: string | null
  chef: string | null
} = {
  editor: 'https://vortex-editor-omega.vercel.app', // backend: se queda en Vercel
  pdf: 'https://vortex-pdf.pages.dev',
  music: 'https://v-music-chi.vercel.app', // backend: se queda en Vercel
  draw: 'https://vortex-draw.pages.dev',
  tasks: 'https://vortex-tasks.pages.dev',
  notes: 'https://v-rtex-notes.pages.dev',
  vault: 'https://vortex-vault-d5j.pages.dev',
  clipboard: 'https://vortex-clipboard.pages.dev',
  scan: 'https://vortex-scan-bhc.pages.dev',
  voice: 'https://vortex-voice.pages.dev',
  screen: 'https://vortex-screen.pages.dev',
  split: 'https://vortex-split.pages.dev',
  lens: 'https://vortex-lens.pages.dev',
  convert: 'https://vortex-convert.pages.dev',
  color: 'https://vortex-color.pages.dev',
  qr: 'https://vortex-qr.pages.dev',
  compress: 'https://vortex-compress.pages.dev',
  media: 'https://vortex-media-akq.pages.dev',
  tts: 'https://vortex-tts.pages.dev',
  formatter: 'https://vortex-formatter.pages.dev',
  sub: 'https://vortex-sub.pages.dev',
  hashpass: 'https://vortex-hashpass.pages.dev',
  calc: 'https://vortex-calc.pages.dev',
  watermark: 'https://vortex-watermark.pages.dev',
  splitav: 'https://vortex-splitav.pages.dev',
  clean: 'https://vortex-clean.pages.dev',
  ink: 'https://vortex-ink.pages.dev',
  math: 'https://vortex-math.pages.dev',
  invoice: 'https://vortex-invoice.pages.dev',
  chef: 'https://vortex-chef.pages.dev',
}
