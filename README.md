# Vórtex Studio (Portal)

Hub central de la suite de **Vortex Company**: desde aquí se abren las aplicaciones de la
suite a través de sus despliegues en Vercel. **Gratis, sin anuncios.**

## Aplicaciones enlazadas

| App | Tarjeta |
| --- | --- |
| Vórtex Editor | Editor de imágenes profesional |
| Vórtex PDF | Unir · Dividir · Convertir · Firmar · Comprimir · Proteger |
| Vórtex Music | App independiente |
| Vórtex Draw | Próximamente |

## Configurar las URLs de Vercel

Edita `src/lib/apps.ts` y pega la URL que Vercel entregue por cada app:

```ts
export const APP_URLS: { editor: string | null; pdf: string | null } = {
  editor: 'https://vortex-editor.vercel.app',
  pdf: 'https://vortex-pdf.vercel.app',
}
```

Mientras una URL esté en `null`, su tarjeta se muestra como **"Desplegando"** y no es
pulsable. También puedes usar dominios propios.

## Desarrollo

```bash
bun install
bun run dev        # http://localhost:3000
bun run lint
```

## Despliegue en Vercel

1. Sube este repositorio a GitHub (ya está preparado como repo independiente).
2. Importa el repo en Vercel (framework: Next.js detectado automáticamente).
3. Opcional: dominio propio desde el panel de Vercel.

## Suite Vórtex

Apps: **Vórtex Editor**, **Vórtex PDF**, Vórtex Music (independiente).

---

Derechos Reservados © 2026 Vortex Company. Todos los derechos reservados. Vórtex Studio
Soporte: vortexmusic.soporte.app@gmail.com
