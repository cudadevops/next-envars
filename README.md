# hostinger-env-next

Aplicacion minima en Next.js para exponer la variable de entorno `ENVARUNO` en una app de JavaScript dentro de Hostinger.

## Requisitos

- Node.js 18+.

## Configuracion

1. Instala dependencias:

   ```bash
   npm install
   ```

2. En Hostinger, define la variable `ENVARUNO` en el panel de variables de entorno.

   Para desarrollo local, copia `.env.example` a `.env.local` y ajusta el valor:

   ```bash
   cp .env.example .env.local
   ```

## Ejecucion

- Desarrollo:

  ```bash
  npm run dev
  ```

- Produccion:

  ```bash
  npm run build
  npm start
  ```

## Endpoints

- `GET /api/env?name=ENVARUNO` devuelve variantes y valores para depurar.
- `GET /api/envaruno` devuelve `{ "ENVARUNO": "..." }`.
- `GET /api/health` devuelve `ok`.
- `GET /` permite escribir la variable a mostrar y lista variantes comunes.
