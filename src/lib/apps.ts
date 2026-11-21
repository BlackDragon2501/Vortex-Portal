// URLs de produccion de las apps de la suite (desplegadas en Vercel).
//
// Cuando cada app se despliegue, pega aqui la URL que Vercel entrega
// (por ejemplo 'https://vortex-editor.vercel.app'). Mientras una URL
// este vacia (null), su tarjeta en el portal se muestra como
// "Desplegando" y no es pulsable.
//
// Dominio propio opcional: sustituir la URL de Vercel por el dominio.

export const APP_URLS: { editor: string | null; pdf: string | null } = {
  editor: null,
  pdf: null,
}
