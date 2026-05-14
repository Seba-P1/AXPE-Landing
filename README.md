# AXPE Landing

Landing page de AXPE / Sebastian Pena Soluciones Digitales, creada con React, Vite, Supabase y EmailJS.

## Requisitos

- Node.js 18 o superior
- npm
- Un proyecto de Supabase con una tabla `leads`
- Credenciales de EmailJS si se usa el envio por email

## Desarrollo local

1. Instalar dependencias:

```bash
npm install
```

2. Crear `.env.local` tomando como base `.env.example`.

3. Iniciar el servidor:

```bash
npm run dev
```

La app usa Vite en el puerto `3000`.

## Variables de entorno

Las variables publicas usadas por el frontend deben empezar con `VITE_`.

```env
GEMINI_API_KEY=
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

No guardar ni subir `SUPABASE_SERVICE_ROLE_KEY` en este proyecto. Esa clave es solo para backend/servidor y no debe exponerse en una landing page.

## Supabase

El formulario guarda consultas en la tabla `leads`. Si no tenes acceso a la organizacion anterior de Supabase, crea un proyecto nuevo y ejecuta el SQL de `supabase/leads.sql`; despues reemplaza `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` en `.env.local` y en el proveedor de deploy.

## GitHub

Repositorio remoto esperado:

```bash
git remote add origin https://github.com/Seba-P1/AXPE-Landing.git
```
