# hostinger-env-next

Aplicacion minima en Next.js para hosting estatico (Business). Usa variables `NEXT_PUBLIC_` inyectadas en el build.

## Requisitos

- Node.js 18+.

## Configuracion

1. Instala dependencias:

   ```bash
   npm install
   ```

2. En Hostinger, define la variable `NEXT_PUBLIC_ENVARUNO` en el panel de variables de entorno (build).

   Para desarrollo local o despliegue por archivo, copia `.env.example` a `.env.local` (dev) o `.env.production` (build) y ajusta el valor:

   ```bash
   cp .env.example .env.production
   ```

## Ejecucion

- Desarrollo:

  ```bash
  npm run dev
  ```

- Produccion (export estatico):

  ```bash
  npm run build
  ```

  El build genera la carpeta `out/`. Configura Hostinger con:
  - Comando de compilacion: `npm run build`
  - Directorio de salida: `out`

## Uso

- `GET /` muestra el valor de `NEXT_PUBLIC_ENVARUNO` embebido en el build.
