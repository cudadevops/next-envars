# hostinger-env-next

Aplicacion minima en Next.js para validar variables de entorno server-only en Hostinger.

## Requisitos

- Node.js 18+.

## Configuracion

1. Instala dependencias:

   ```bash
   npm install
   ```

2. En Hostinger, define la variable `ENVARUNO` en el panel de variables de entorno.

   Para desarrollo local o despliegue por archivo, copia `.env.example` a `.env` (o `.env.production`) y ajusta el valor:

   ```bash
   cp .env.example .env
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

- `GET /api/envaruno` devuelve `{ "configured": true, "length": 4 }`.
- `GET /api/envaruno?show=1` devuelve el valor (solo para debug).
- `GET /api/health` devuelve `ok`.
- `GET /` muestra si `ENVARUNO` esta configurada.
