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
} = {
  editor: 'https://vortex-editor-omega.vercel.app',
  pdf: 'https://vortex-pdf-blush.vercel.app',
  music: 'https://v-music-chi.vercel.app',
  draw: 'https://vortex-draw.vercel.app',
  tasks: 'https://vortex-tasks.vercel.app',
}
