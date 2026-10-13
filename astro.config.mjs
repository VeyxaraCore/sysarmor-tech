// astro.config.mjs
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import preact from '@astrojs/preact';
import react from '@astrojs/react';

export default defineConfig({
  // CORRECCIÓN: Apuntar al nuevo dominio oficial
  site: 'https://veyxara.com',
  output: 'server',

  redirects: {},

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ['nodemailer'],
    },
    build: {
      rollupOptions: {
        external: ['nodemailer'],
      },
    },
  },

  adapter: vercel(),
  integrations: [
    sitemap(),
    preact({
      include: ['**/preact/*'],
    }),
    react({
      include: ['**/components/RedirectAnalyzer.jsx', '**/components/react/*'],
    }),
  ],
});