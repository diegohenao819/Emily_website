# Emily's Learning Garden

Un jardín de flores de papel para que Emily aprenda jugando. Cada juego que termina pega una flor nueva en **My Garden** (se guarda solo en el dispositivo, sin cuentas ni datos personales).

## Secciones

| Ruta | Qué hay |
|---|---|
| `/` | Portada: título, flores-puerta a cada sección y el jardín de Emily |
| `/tables` | Tablas del 1 al 10: **Learn** (filas de flores + respuesta hablada) y **Quiz** de 10 preguntas, también en modo "Mix" |
| `/english` | **Listen and find** (oye la palabra y toca el dibujo), **Word cards** (toca y escucha) y **My trip to Cartagena** (completa las frases del viaje en pasado) |

Las palabras de inglés se pronuncian con la voz del navegador (Web Speech API); no hace falta internet extra ni claves.

## Correrlo en tu computador

```bash
npm install
npm run dev
```

Abre http://localhost:3000.

## Agregar contenido

- **Palabras nuevas o temas de inglés:** `src/app/english/words.ts`. Cada palabra lleva `word` y una imagen en `public/pictures/` (o un `color`).
- **Frases del viaje:** el arreglo `TRIP` en el mismo archivo.
- **Una sección nueva:** crea `src/app/<nombre>/page.tsx` envuelta en `<ActivityShell title="...">` y agrega una flor en el arreglo `DOORS` de `src/app/page.tsx` (el botón "Coming soon" sigue disponible para lo próximo).
- Al terminar un juego llama `earnFlower("<id-del-juego>", FLOWER_KINDS.length)` para que Emily gane su flor.

## Publicar en Vercel

1. Sube esta carpeta a un repositorio de GitHub.
2. En https://vercel.com/new importa el repositorio. Vercel detecta Next.js solo; no hay variables de entorno que configurar.
3. Deploy. Cada `git push` vuelve a publicar.

También puedes usar la CLI: `npx vercel` y luego `npx vercel --prod`.

El sitio pide a los buscadores no indexarlo (`robots: noindex`), porque es un espacio personal.

## Créditos

- Dibujos de vocabulario: [Microsoft Fluent Emoji](https://github.com/microsoft/fluentui-emoji) (licencia MIT), reducidos a 256 px.
- Fuentes: Lilita One y Andika (Google Fonts, licencia OFL), servidas por `next/font`.
- Flores, pasto, nubes, sol y mariposas: SVG hechos a mano para este sitio.
