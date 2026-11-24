'use client'

// Portal Vórtex Studio: lanzador de la suite de Vortex Company.
// Interfaz HUD holográfica (anillos, haz, radar, barras y circuitos animados
// en CSS puro). Cada aplicación se despliega por separado en Vercel y este
// portal enlaza su URL (configurada en src/lib/apps.ts). Mientras una app no
// tenga URL desplegada, su tarjeta se muestra como "Desplegando".

import { useEffect, useMemo, useState } from 'react'
import { APP_URLS } from '@/lib/apps'
import { LegalFooter, SUPPORT_EMAIL, VortexLogo } from '../editor/Branding'
import {
  Image as ImageIcon,
  FileText,
  Music2,
  Lock,
  ArrowRight,
  Brush,
  ListTodo,
  NotebookPen,
  ShieldCheck,
  ClipboardList,
  ScanLine,
  Mic,
  MonitorPlay,
  Combine,
  ScanText,
  Repeat,
  Palette,
  QrCode,
  FileArchive,
  Film,
  Volume2,
  Braces,
  Captions,
  KeyRound,
  Calculator,
  Stamp,
  Scissors,
  Eraser,
  PenTool,
  Sigma,
  ReceiptText,
  ChefHat,
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
  // ---------- apps en linea ----------
  {
    name: 'Vórtex Editor',
    tagline: 'Tu editor, sin límites',
    description:
      'Editor de imagenes profesional con capas, capas de ajuste, curvas, filtros, herramientas de dibujo, transformacion libre e IA: ahora elimina texto y marcas de agua con inpainting neuronal LaMa (WebGPU, modelo guardado en tu dispositivo). Todo local en tu navegador.',
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
      'La aplicacion musical de Vortex Company con la que empezo la suite, con el mismo soporte oficial para toda la familia.',
    icon: <Music2 className="w-6 h-6" aria-hidden />,
    accent: 'text-emerald-400',
    url: APP_URLS.music,
    status: 'listo',
  },
  {
    name: 'Vórtex Draw',
    tagline: 'Dibuja, sin límites',
    description:
      'Dibujo libre en tu navegador: pincel, borrador, línea, flecha, formas, bote de relleno, texto y cuentagotas, con deshacer/rehacer, fondo claro/oscuro, exportación PNG/JPG y proyectos .vortex-draw.json. 100% local.',
    icon: <Brush className="w-6 h-6" aria-hidden />,
    accent: 'text-pink-400',
    url: APP_URLS.draw,
    status: 'listo',
  },
  {
    name: 'Vórtex Tasks',
    tagline: 'Organiza tu día, sin límites',
    description:
      'Gestor de tareas estilo pro: proyectos con color, prioridades P1-P4, fechas con vencidas resaltadas, subtareas, filtros de Hoy y Próximos 7 días, búsqueda, añadido rápido inteligente (#proyecto, !p1, fechas) y exportación JSON. 100% local.',
    icon: <ListTodo className="w-6 h-6" aria-hidden />,
    accent: 'text-teal-400',
    url: APP_URLS.tasks,
    status: 'listo',
  },
  {
    name: 'Vórtex Notes',
    tagline: 'Tus ideas, sin límites',
    description:
      'Notas con editor markdown y vista previa, diario con calendario y estados de ánimo, y enlaces rápidos para tus sitios de cada día, con búsqueda, etiquetas de colores y exportación. 100% local.',
    icon: <NotebookPen className="w-6 h-6" aria-hidden />,
    accent: 'text-sky-400',
    url: APP_URLS.notes,
    status: 'listo',
  },
  {
    name: 'Vórtex Vault',
    tagline: 'Tus claves, sin límites',
    description:
      'Gestor de contraseñas cifrado con AES-256 que nunca sale de tu navegador: Web Crypto + IndexedDB, generador de contraseñas, medidor de seguridad, bloqueo automático y copias de respaldo cifradas. Cero nube.',
    icon: <ShieldCheck className="w-6 h-6" aria-hidden />,
    accent: 'text-fuchsia-400',
    url: APP_URLS.vault,
    status: 'listo',
  },
  {
    name: 'Vórtex Clipboard',
    tagline: 'Tu portapapeles, sin límites',
    description:
      'Historial de lo que copias (captura con Ctrl+V) y snippets de los textos que usas a diario, con fijados, búsqueda y copia a un clic. 100% local.',
    icon: <ClipboardList className="w-6 h-6" aria-hidden />,
    accent: 'text-lime-400',
    url: APP_URLS.clipboard,
    status: 'listo',
  },
  {
    name: 'Vórtex Scan',
    tagline: 'Escanea tus documentos, sin límites',
    description:
      'Escaner de documentos con la cámara o importado desde el dispositivo: aplanado de perspectiva, filtro blanco y negro, escala de grises y realce, y exportación a PDF, PNG o JPG. Incluye lector de QR y códigos de barras con la webcam. 100% local.',
    icon: <ScanLine className="w-6 h-6" aria-hidden />,
    accent: 'text-emerald-400',
    url: APP_URLS.scan,
    status: 'listo',
  },
  {
    name: 'Vórtex Voice',
    tagline: 'Tu voz a texto, sin límites',
    description:
      'Dictado por voz con transcripción en tiempo real en PC y Android, con selección de idioma, cronómetro y guardado en .txt o envío directo a Vórtex Notes. 100% local.',
    icon: <Mic className="w-6 h-6" aria-hidden />,
    accent: 'text-violet-400',
    url: APP_URLS.voice,
    status: 'listo',
  },
  {
    name: 'Vórtex Screen',
    tagline: 'Graba tu pantalla, sin límites',
    description:
      'Grabadora de pantalla para tutoriales en PC (pantalla, ventana o pestaña, con audio) y modo cámara en Android, con pausa, calidad ajustable y descarga en WebM o MP4. 100% local.',
    icon: <MonitorPlay className="w-6 h-6" aria-hidden />,
    accent: 'text-rose-400',
    url: APP_URLS.screen,
    status: 'listo',
  },
  {
    name: 'Vórtex Split',
    tagline: 'Une tus imágenes, sin límites',
    description:
      'Combina dos o más imágenes (frente y dorso de documentos) en vertical u horizontal, con separación ajustable, control de compresión y descarga en PNG o JPG. 100% local.',
    icon: <Combine className="w-6 h-6" aria-hidden />,
    accent: 'text-amber-400',
    url: APP_URLS.split,
    status: 'listo',
  },
  {
    name: 'Vórtex Lens',
    tagline: 'Lee el texto de tus imágenes, sin límites',
    description:
      'OCR con Tesseract.js directamente en tu navegador: extrae el texto de fotos y capturas (cámara o archivo) en varios idiomas, edítalo y cópialo o envíalo a Vórtex Notes. 100% local.',
    icon: <ScanText className="w-6 h-6" aria-hidden />,
    accent: 'text-cyan-400',
    url: APP_URLS.lens,
    status: 'listo',
  },
  {
    name: 'Vórtex Convert',
    tagline: 'Convierte tus imágenes, sin límites',
    description:
      'Conversor de formatos de imagen por lotes: PNG, JPG y WebP con calidad configurable, redimensionado opcional, relleno de fondo para transparencias y control de peso final, con descarga de todos los resultados de una vez. 100% local.',
    icon: <Repeat className="w-6 h-6" aria-hidden />,
    accent: 'text-orange-400',
    url: APP_URLS.convert,
    status: 'listo',
  },
  {
    name: 'Vórtex Color',
    tagline: 'Tus colores, sin límites',
    description:
      'Extrae la paleta dominante de cualquier imagen con k-means, usa el cuentagotas en pantalla, convierte HEX/RGB/HSL, genera armonías cromáticas y comprueba el contraste WCAG AA/AAA de tus combinaciones. 100% local.',
    icon: <Palette className="w-6 h-6" aria-hidden />,
    accent: 'text-fuchsia-400',
    url: APP_URLS.color,
    status: 'listo',
  },
  {
    name: 'Vórtex QR',
    tagline: 'Crea tus códigos QR, sin límites',
    description:
      'Generador de códigos QR de URLs, texto, WiFi, contacto vCard, email, teléfono o SMS, con colores, tamaño, margen y nivel de corrección de error configurables, y descarga en PNG o SVG. 100% local.',
    icon: <QrCode className="w-6 h-6" aria-hidden />,
    accent: 'text-sky-400',
    url: APP_URLS.qr,
    status: 'listo',
  },
  // ---------- nuevas apps (desplegando) ----------
  {
    name: 'Vórtex Compress',
    tagline: 'Comprime tus archivos, sin límites',
    description:
      'Crea archivos ZIP con nivel de compresión ajustable (0-9, motor fflate) y extrae ZIPs marcando solo lo que te interesa. Todo se procesa dentro de tu navegador y tus archivos nunca salen de tu equipo. 100% local.',
    icon: <FileArchive className="w-6 h-6" aria-hidden />,
    accent: 'text-teal-300',
    url: null,
    status: 'listo',
  },
  {
    name: 'Vórtex Media',
    tagline: 'Convierte tu video, sin límites',
    description:
      'Convierte MP4 a WebM, extrae el audio a MP3 o AAC y comprime video H.264 con CRF y resolución ajustables, usando FFmpeg WebAssembly que corre dentro de tu navegador (el motor se sirve desde la propia app). 100% local.',
    icon: <Film className="w-6 h-6" aria-hidden />,
    accent: 'text-cyan-300',
    url: null,
    status: 'listo',
  },
  {
    name: 'Vórtex TTS',
    tagline: 'Tu texto a voz, sin límites',
    description:
      'Pega un texto, carga una nota .txt/.md o un PDF y escúchalo en voz alta con las voces de tu propio sistema (Web Speech API), controlando velocidad, tono, voz y el fragmento actual con panel de lectura resaltado. 100% local.',
    icon: <Volume2 className="w-6 h-6" aria-hidden />,
    accent: 'text-emerald-300',
    url: null,
    status: 'listo',
  },
  {
    name: 'Vórtex Formatter',
    tagline: 'Tu caja de herramientas dev, sin límites',
    description:
      'Formatea y valida JSON con estadísticas, minifica, ordena claves, convierte Base64/Base64-URL, decodifica URLs y JWT (solo inspección), y calcula hashes MD5 y SHA-1/256/384/512. Todo en tu navegador. 100% local.',
    icon: <Braces className="w-6 h-6" aria-hidden />,
    accent: 'text-sky-300',
    url: null,
    status: 'listo',
  },
  {
    name: 'Vórtex Sub',
    tagline: 'Sincroniza tus subtítulos, sin límites',
    description:
      'Edita y sincroniza subtítulos SRT y VTT sobre la previsualización del video, con ajuste global de tiempos, renumerado y exportación limpia. 100% local.',
    icon: <Captions className="w-6 h-6" aria-hidden />,
    accent: 'text-teal-200',
    url: null,
    status: 'listo',
  },
  {
    name: 'Vórtex HashPass',
    tagline: 'Tus claves y hashes, sin límites',
    description:
      'Genera contraseñas fuertes y frases de paso, evalúa su fortaleza y calcula hashes MD5, SHA-1, SHA-256 y SHA-512 de textos y archivos con Web Crypto. 100% local.',
    icon: <KeyRound className="w-6 h-6" aria-hidden />,
    accent: 'text-lime-300',
    url: null,
    status: 'listo',
  },
  {
    name: 'Vórtex Calc',
    tagline: 'Calcula y convierte, sin límites',
    description:
      'Calculadora científica con grados/radianes, memoria e historial guardado en tu equipo, más conversor de unidades offline (longitud, masa, temperatura, datos y más). 100% local.',
    icon: <Calculator className="w-6 h-6" aria-hidden />,
    accent: 'text-cyan-200',
    url: null,
    status: 'listo',
  },
  {
    name: 'Vórtex Watermark',
    tagline: 'Marca tus imágenes, sin límites',
    description:
      'Aplica tu logo o texto como marca de agua a lotes de imágenes y PDFs, con posición, opacidad, rotación, mosaico y descarga en ZIP. 100% local.',
    icon: <Stamp className="w-6 h-6" aria-hidden />,
    accent: 'text-emerald-200',
    url: null,
    status: 'listo',
  },
  {
    name: 'Vórtex Split AV',
    tagline: 'Corta y une tu A/V, sin límites',
    description:
      'Corta y une video o audio por rangos de tiempo exactos con FFmpeg WebAssembly corriendo dentro de tu navegador. Tus archivos nunca salen de tu equipo. 100% local.',
    icon: <Scissors className="w-6 h-6" aria-hidden />,
    accent: 'text-teal-400',
    url: null,
    status: 'listo',
  },
  {
    name: 'Vórtex Clean',
    tagline: 'Protege tu privacidad, sin límites',
    description:
      'Elimina EXIF, GPS y XMP de tus fotos JPEG, PNG y WebP por lotes, con reporte de lo detectado y descarga en ZIP. Tu privacidad no sale de tu navegador. 100% local.',
    icon: <Eraser className="w-6 h-6" aria-hidden />,
    accent: 'text-sky-200',
    url: null,
    status: 'listo',
  },
  {
    name: 'Vórtex Ink',
    tagline: 'Tu firma digital, sin límites',
    description:
      'Dibuja tu firma o sello con lápiz sensible a presión, quita el fondo blanco automáticamente, guárdalo en tu galería local y colócalo sobre PDFs en la posición que quieras. 100% local.',
    icon: <PenTool className="w-6 h-6" aria-hidden />,
    accent: 'text-cyan-100',
    url: null,
    status: 'listo',
  },
  {
    name: 'Vórtex Math',
    tagline: 'Tus funciones, sin límites',
    description:
      'Calculadora científica con grados/radianes, teclado en pantalla e historial de sesión, más graficador 2D de hasta 6 funciones f(x) simultáneas con zoom, paneo por arrastre, detección de discontinuidades y rejilla inteligente. 100% local.',
    icon: <Sigma className="w-6 h-6" aria-hidden />,
    accent: 'text-emerald-400',
    url: null,
    status: 'listo',
  },
  {
    name: 'Vórtex Invoice',
    tagline: 'Tus facturas, sin límites',
    description:
      'Crea facturas para freelancers con emisor, cliente, conceptos ilimitados, impuestos porcentuales, 9 monedas y notas; descarga el PDF (jsPDF en el navegador) y lleva un historial vivo en IndexedDB con edición y duplicado. 100% local.',
    icon: <ReceiptText className="w-6 h-6" aria-hidden />,
    accent: 'text-teal-100',
    url: null,
    status: 'listo',
  },
  {
    name: 'Vórtex Chef',
    tagline: 'Tu cocina, sin límites',
    description:
      'Recetario local con ingredientes, pasos, etiquetas y favoritas; escala porciones y genera listas de compras agregadas (une ingredientes repetidos de varias recetas) y agrupadas por pasillo del supermercado. 100% local.',
    icon: <ChefHat className="w-6 h-6" aria-hidden />,
    accent: 'text-lime-200',
    url: null,
    status: 'listo',
  },
]

/* ---------- hook: contador animado ---------- */
function useCountUp(target: number, duration = 1400) {
  const [v, setV] = useState(0)
  useEffect(() => {
    let raf = 0
    const t0 = performance.now()
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / duration)
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return v
}

/* ---------- anillo de progreso HUD ---------- */
function HudRing({ pct, label, value, size = 116 }: { pct: number; label: string; value: string; size?: number }) {
  const [go, setGo] = useState(0)
  useEffect(() => {
    const id = window.setTimeout(() => setGo(pct), 250)
    return () => window.clearTimeout(id)
  }, [pct])
  const r = 46
  const c = 2 * Math.PI * r
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }} aria-label={`${label}: ${value}`}>
      <svg viewBox="0 0 110 110" className="w-full h-full -rotate-90">
        <circle cx="55" cy="55" r={r} fill="none" stroke="rgba(45,242,208,0.14)" strokeWidth="6" />
        <circle
          cx="55"
          cy="55"
          r={r}
          fill="none"
          stroke="#2df2d0"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * go) / 100}
          className="hud-ring-progress"
          style={{ filter: 'drop-shadow(0 0 6px rgba(45,242,208,0.6))' }}
        />
        <circle cx="55" cy="55" r="34" fill="none" stroke="rgba(45,242,208,0.2)" strokeWidth="1" strokeDasharray="3 5" className="hud-spin-c" />
      </svg>
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="text-center">
          <p className="text-lg font-bold text-teal-100 leading-none" style={{ textShadow: '0 0 10px rgba(45,242,208,0.5)' }}>
            {value}
          </p>
          <p className="text-[9px] tracking-widest text-teal-300/80 mt-1 uppercase">{label}</p>
        </div>
      </div>
    </div>
  )
}

/* ---------- portal holografico central (SVG) ---------- */
function HoloPortal() {
  return (
    <svg viewBox="0 0 640 400" className="w-full max-w-2xl hud-orbit-svg" aria-hidden>
      <defs>
        <linearGradient id="beamGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2df2d0" stopOpacity="0.5" />
          <stop offset="55%" stopColor="#2df2d0" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#2df2d0" stopOpacity="0.42" />
        </linearGradient>
        <radialGradient id="coreGrad" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#8effe4" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#2df2d0" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#2df2d0" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* anillos superiores (perspectiva) */}
      <g transform="translate(320 78) scale(1 0.3)">
        <circle r="188" fill="none" stroke="rgba(45,242,208,0.28)" strokeWidth="2.5" strokeDasharray="26 14" className="hud-spin-a" />
        <circle r="150" fill="none" stroke="rgba(45,242,208,0.5)" strokeWidth="3" strokeDasharray="60 22" className="hud-spin-b" />
        <circle r="112" fill="none" stroke="rgba(45,242,208,0.34)" strokeWidth="2" strokeDasharray="10 8" className="hud-spin-c" />
      </g>
      {/* marca inferior del anillo superior */}
      <ellipse cx="320" cy="118" rx="120" ry="16" fill="none" stroke="rgba(45,242,208,0.3)" strokeWidth="2" />

      {/* haz holografico */}
      <path d="M268 96 L372 96 L398 318 L242 318 Z" fill="url(#beamGrad)" className="hud-beam" />

      {/* particulas subiendo por el haz */}
      <circle cx="300" cy="300" r="3" fill="#8effe4" className="hud-dot-up" style={{ animationDelay: '0s' }} />
      <circle cx="336" cy="310" r="2.4" fill="#2df2d0" className="hud-dot-up" style={{ animationDelay: '1.6s' }} />
      <circle cx="318" cy="296" r="2" fill="#a5ffe9" className="hud-dot-up" style={{ animationDelay: '3.1s' }} />

      {/* nucleo inferior */}
      <ellipse cx="320" cy="318" rx="150" ry="34" fill="url(#coreGrad)" className="hud-core" />
      <g transform="translate(320 318) scale(1 0.3)">
        <circle r="170" fill="none" stroke="rgba(45,242,208,0.5)" strokeWidth="3" strokeDasharray="70 18" className="hud-spin-b" />
        <circle r="128" fill="none" stroke="rgba(45,242,208,0.3)" strokeWidth="2" strokeDasharray="18 12" className="hud-spin-a" />
        <circle r="86" fill="none" stroke="rgba(45,242,208,0.55)" strokeWidth="2.5" strokeDasharray="40 16" className="hud-spin-c" />
      </g>
    </svg>
  )
}

/* ---------- radar lateral ---------- */
function HudRadar() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden>
      <circle cx="60" cy="60" r="56" fill="none" stroke="rgba(45,242,208,0.22)" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="38" fill="none" stroke="rgba(45,242,208,0.16)" strokeWidth="1" />
      <circle cx="60" cy="60" r="20" fill="none" stroke="rgba(45,242,208,0.16)" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="60" y1="4" x2="60" y2="116" stroke="rgba(45,242,208,0.14)" strokeWidth="1" />
      <line x1="4" y1="60" x2="116" y2="60" stroke="rgba(45,242,208,0.14)" strokeWidth="1" />
      <path d="M60 60 L60 6 A54 54 0 0 1 98 22 Z" fill="rgba(45,242,208,0.18)" className="hud-radar-sweep" />
      <circle cx="78" cy="42" r="2.5" fill="#2df2d0" className="hud-radar-blip" style={{ animationDelay: '0.4s' }} />
      <circle cx="44" cy="74" r="2" fill="#2df2d0" className="hud-radar-blip" style={{ animationDelay: '2.6s' }} />
    </svg>
  )
}

/* ---------- barras ecualizador ---------- */
function HudBars() {
  const heights = [26, 44, 32, 56, 38, 62, 30, 48, 58, 34, 50, 40, 60, 28]
  return (
    <svg viewBox="0 0 160 70" className="w-full" aria-hidden>
      {heights.map((h, i) => (
        <rect
          key={i}
          x={6 + i * 11}
          y={64 - h}
          width="6"
          height={h}
          rx="1.5"
          fill="rgba(45,242,208,0.6)"
          className="hud-bar"
          style={{ animationDelay: `${(i % 7) * 0.14}s` }}
        />
      ))}
      <line x1="2" y1="65" x2="158" y2="65" stroke="rgba(45,242,208,0.3)" strokeWidth="1" />
    </svg>
  )
}

/* ---------- circuito lateral ---------- */
function HudCircuit() {
  return (
    <svg viewBox="0 0 60 320" className="h-full" aria-hidden>
      <path d="M8 0 V60 L30 82 V150 L14 166 V320" fill="none" stroke="rgba(45,242,208,0.35)" strokeWidth="1.5" className="hud-circuit-dash" />
      <path d="M46 0 V90 L36 100 V210 L50 224 V320" fill="none" stroke="rgba(45,242,208,0.22)" strokeWidth="1.5" className="hud-circuit-dash" style={{ animationDelay: '0.8s' }} />
      <circle cx="30" cy="82" r="3" fill="#2df2d0" className="hud-core" />
      <circle cx="36" cy="100" r="2.5" fill="rgba(45,242,208,0.6)" className="hud-core" style={{ animationDelay: '1s' }} />
      <path d="M50 224 l-5 8 l10 0 Z" fill="rgba(45,242,208,0.6)" />
    </svg>
  )
}

/* ---------- tarjeta de app HUD ---------- */
function SuiteCardView({ card, index }: { card: SuiteCard; index: number }) {
  const disabled = card.url === null
  const pendiente = card.status === 'listo' && disabled
  const online = card.status === 'listo' && !disabled
  return (
    <div
      className={'hud-card hud-reveal p-5 flex flex-col gap-2.5 ' + (disabled ? '' : 'hud-clickable cursor-pointer')}
      style={{ animationDelay: `${Math.min(index, 24) * 55}ms` }}
      onClick={disabled ? undefined : () => window.open(card.url!, '_blank', 'noopener,noreferrer')}
    >
      <span className="hud-corner hud-corner-tl" />
      <span className="hud-corner hud-corner-tr" />
      <span className="hud-corner hud-corner-bl" />
      <span className="hud-corner hud-corner-br" />
      <span className="hud-scanline" />

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <span className="hud-icon-chip shrink-0">
            <span className={card.accent}>{card.icon}</span>
          </span>
          <h2 className="text-[15px] font-semibold text-teal-50 truncate" style={{ textShadow: '0 0 12px rgba(45,242,208,0.25)' }}>
            {card.name}
          </h2>
        </div>
        <span
          className={
            'text-[9px] uppercase tracking-[0.14em] px-2 py-0.5 rounded-full border shrink-0 ' +
            (online ? 'hud-chip-online' : card.status === 'externo' ? 'hud-chip-deploy' : 'hud-chip-deploy')
          }
        >
          {online ? 'Disponible' : card.status === 'externo' ? 'Independiente' : pendiente ? 'Desplegando' : 'Próximamente'}
        </span>
      </div>
      <p className="text-xs text-teal-200/70">{card.tagline}</p>
      <p className="text-[12.5px] leading-relaxed text-teal-100/55 flex-1">{card.description}</p>
      {online ? (
        <button
          type="button"
          className="hud-open mt-1 inline-flex items-center gap-1.5 text-xs font-bold self-start"
          onClick={(e) => {
            e.stopPropagation()
            window.open(card.url!, '_blank', 'noopener,noreferrer')
          }}
        >
          Abrir aplicación <ArrowRight className="w-3.5 h-3.5" aria-hidden />
        </button>
      ) : (
        <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-teal-200/50 self-start">
          <Lock className="w-3.5 h-3.5" aria-hidden />{' '}
          {pendiente ? 'URL de Vercel pendiente' : 'No disponible en esta suite'}
        </p>
      )}
    </div>
  )
}

/* ---------- panel de estado (estilo INFOGRAPHIC) ---------- */
function HudStatusPanel({ total, online, deploy }: { total: number; online: number; deploy: number }) {
  const rows: Array<[string, string]> = [
    ['APPS', String(total)],
    ['EN LÍNEA', String(online)],
    ['DESPLEGANDO', String(deploy)],
    ['ANUNCIOS', '0'],
    ['NUBE', '0'],
  ]
  return (
    <div className="hud-panel rounded-lg p-3 w-44">
      <p className="text-[9px] tracking-[0.28em] text-teal-300/90 border-b border-teal-400/20 pb-2 mb-2">SUITE STATUS</p>
      <div className="flex flex-col gap-1.5">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between text-[10px]">
            <span className="text-teal-200/60">{k}</span>
            <span className="font-bold text-teal-100" style={{ textShadow: '0 0 8px rgba(45,242,208,0.4)' }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- pagina ---------- */
type Filter = 'todas' | 'online' | 'deploy'

export function StudioHome() {
  const [filter, setFilter] = useState<Filter>('todas')
  const total = CARDS.length
  const onlineCount = CARDS.filter((c) => c.url !== null).length
  const deployCount = total - onlineCount

  const apps = useCountUp(total, 1100)
  const onlineN = useCountUp(onlineCount, 1500)

  const filtered = useMemo(() => {
    if (filter === 'online') return CARDS.map((c, i) => ({ c, i })).filter(({ c }) => c.url !== null)
    if (filter === 'deploy') return CARDS.map((c, i) => ({ c, i })).filter(({ c }) => c.url === null)
    return CARDS.map((c, i) => ({ c, i }))
  }, [filter])

  return (
    <div className="min-h-screen w-full flex flex-col relative bg-[#04120f] text-foreground">
      {/* fondo + particulas */}
      <div className="hud-bg" aria-hidden />
      <div className="hud-vignette" aria-hidden />
      {[
        { l: '8%', d: 13, s: 0 },
        { l: '18%', d: 17, s: 4 },
        { l: '31%', d: 14, s: 8 },
        { l: '46%', d: 19, s: 2 },
        { l: '58%', d: 15, s: 10 },
        { l: '69%', d: 18, s: 5 },
        { l: '81%', d: 13, s: 7 },
        { l: '92%', d: 16, s: 1 },
      ].map((p, i) => (
        <span
          key={i}
          className="hud-particle hidden sm:block"
          style={{ left: p.l, animationDuration: `${p.d}s`, animationDelay: `${p.s}s` }}
          aria-hidden
        />
      ))}

      {/* decorado lateral izquierdo (solo pantallas grandes) */}
      <div className="fixed left-6 top-32 z-0 hidden lg:flex flex-col items-center gap-8 opacity-80 pointer-events-none" aria-hidden>
        <div className="w-28 h-28"><HudRadar /></div>
        <HudStatusPanel total={total} online={onlineCount} deploy={deployCount} />
        <div className="w-44"><HudBars /></div>
      </div>

      {/* decorado lateral derecho */}
      <div className="fixed right-6 top-32 z-0 hidden lg:flex flex-col items-center gap-8 opacity-80 pointer-events-none" aria-hidden>
        <HudRing pct={Math.round((onlineCount / total) * 100)} label="En línea" value={`${onlineCount}/${total}`} />
        <HudRing pct={100} label="Local" value="100%" size={96} />
        <div className="h-64"><HudCircuit /></div>
      </div>

      {/* cabecera HUD */}
      <header className="relative z-10 border-b border-teal-400/15 bg-[#061915]/80 backdrop-blur px-6 h-12 flex items-center gap-3 shrink-0">
        <VortexLogo className="w-6 h-6" />
        <span className="text-sm font-bold tracking-[0.22em]">
          <span className="text-teal-300" style={{ textShadow: '0 0 10px rgba(45,242,208,0.5)' }}>VÓRTEX</span>{' '}
          <span className="text-teal-50">STUDIO</span>
        </span>
        <span className="text-[10px] text-teal-200/50 tracking-widest hidden md:inline">SUITE DE CREACIÓN · VORTEX COMPANY</span>
        <span className="ml-auto flex items-center gap-2">
          <span className="hud-live-dot w-2 h-2 rounded-full bg-teal-300" aria-hidden />
          <span className="text-[10px] tracking-widest text-teal-200/80 hidden sm:inline">GRATIS · SIN ANUNCIOS · 100% LOCAL</span>
        </span>
      </header>

      {/* contenido */}
      <main className="relative z-10 flex-1 w-full max-w-6xl mx-auto px-6 pb-14 flex flex-col items-center">
        {/* hero */}
        <div className="w-full flex flex-col items-center -mt-2">
          <HoloPortal />
          <h1
            className="hud-title text-3xl md:text-4xl font-extrabold tracking-[0.12em] -mt-16 md:-mt-20 relative z-10 text-center"
          >
            VÓRTEX <span className="text-teal-300">STUDIO</span>
          </h1>
          <p className="mt-2 text-[11px] tracking-[0.42em] text-teal-200/70 uppercase text-center">
            Tu suite de creación · sin límites
          </p>

          {/* lecturas del sistema */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {[
              { v: apps, l: 'APPS' },
              { v: onlineN, l: 'EN LÍNEA' },
              { v: 0, l: 'ANUNCIOS' },
              { v: 0, l: 'NUBE' },
            ].map((s) => (
              <div key={s.l} className="hud-panel rounded-md px-4 py-2 flex items-baseline gap-2 min-w-[92px] justify-center">
                <span
                  className="text-xl font-extrabold text-teal-100 tabular-nums"
                  style={{ textShadow: '0 0 12px rgba(45,242,208,0.45)' }}
                >
                  {s.v}
                </span>
                <span className="text-[9px] tracking-[0.2em] text-teal-300/80">{s.l}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[13px] text-teal-100/60 max-w-xl text-center">
            Una suite de aplicaciones creativas y productivas de Vortex Company. Cada app se abre desde su propio
            despliegue: elige una para comenzar.
          </p>
        </div>

        {/* filtros HUD */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Filtrar aplicaciones">
          {([
            ['todas', 'TODAS', total],
            ['online', 'EN LÍNEA', onlineCount],
            ['deploy', 'DESPLEGANDO', deployCount],
          ] as Array<[Filter, string, number]>).map(([key, label, n]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={filter === key}
              className={'hud-filter rounded-md px-4 py-1.5 text-[11px] tracking-[0.16em] ' + (filter === key ? 'hud-filter-active' : '')}
              onClick={() => setFilter(key)}
            >
              {label} · {n}
            </button>
          ))}
        </div>

        {/* rejilla de tarjetas */}
        <section aria-label="Aplicaciones de la suite" className="mt-7 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
          {filtered.map(({ c, i }) => (
            <SuiteCardView key={c.name} card={c} index={i} />
          ))}
        </section>

        <p className="text-[12px] text-teal-100/50 mt-10 text-center max-w-2xl">
          Soporte oficial de toda la suite:{' '}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-teal-300 hover:text-teal-200 break-all"
            style={{ textShadow: '0 0 10px rgba(45,242,208,0.35)' }}
          >
            {SUPPORT_EMAIL}
          </a>{' '}
          — el mismo soporte de la misma compania para toda la familia de apps de Vortex Company.
        </p>
      </main>

      <LegalFooter product="studio" />
    </div>
  )
}
