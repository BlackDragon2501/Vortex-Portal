// URLs de produccion de las apps de la suite (desplegadas en Vercel).
//
// Cada URL la entrega Vercel al desplegar su repositorio independiente.
// Si una URL es null, su tarjeta en el portal se muestra como
// "Desplegando"/"No disponible" y no es pulsable.
//
// Dominio propio opcional: sustituir la URL de Vercel por el dominio.

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
  editor: 'https://vortex-editor-omega.vercel.app',
  pdf: 'https://vortex-pdf-blush.vercel.app',
  music: 'https://v-music-chi.vercel.app',
  draw: 'https://vortex-draw.vercel.app',
  tasks: 'https://vortex-tasks.vercel.app',
  notes: 'https://vortex-notes-two.vercel.app',
  vault: 'https://vortex-vault.vercel.app',
  clipboard: 'https://vortex-clipboard.vercel.app',
  scan: 'https://vortex-scan.vercel.app',
  voice: 'https://vortex-voice.vercel.app',
  screen: 'https://vortex-screen.vercel.app',
  split: 'https://vortex-split.vercel.app',
  lens: 'https://vortex-lens-kohl.vercel.app',
  convert: 'https://vortex-convert.vercel.app',
  color: 'https://vortex-color.vercel.app',
  qr: 'https://vortex-qr-plum.vercel.app',
  compress: 'https://vortex-compress.vercel.app',
  media: 'https://vortex-media-green.vercel.app',
  tts: 'https://vortex-tts.vercel.app',
  formatter: 'https://vortex-formatter.vercel.app',
  sub: 'https://vortex-sub.vercel.app',
  hashpass: 'https://vortex-hash-pass.vercel.app',
  calc: 'https://vortex-calc.vercel.app',
  watermark: 'https://vortex-watermark.vercel.app',
  splitav: 'https://vortex-splitav.vercel.app',
  clean: 'https://vortex-clean.vercel.app',
  ink: 'https://vortex-ink.vercel.app',
  math: 'https://vortex-math.vercel.app',
  invoice: 'https://vortex-invoice.vercel.app',
  chef: 'https://vortex-chef.vercel.app',
}
