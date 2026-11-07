// astro.config.mjs
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import preact from '@astrojs/preact';
import react from '@astrojs/react';
// Importamos tus wallpapers de forma segura
import { wallpapers } from './src/data/wallpapers.ts';

export default defineConfig({
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
    sitemap({
      async serialize(item) {
        // 1. Inyección masiva y automatizada para la sección de Wallpapers[cite: 1]
        if (item.url === 'https://veyxara.com/wallpapers/') {
          item.img = wallpapers.map((w) => {
            const fullUrl = w.image.startsWith('http') 
              ? w.image 
              : `https://veyxara.com${w.image.startsWith('/') ? '' : '/'}${w.image}`;

            return {
              url: fullUrl,
              title: `${w.title} — Veyxara Core`,
              caption: `Wallpaper oficial (${w.category} - ${w.resolution}) con identidad visual Veyxara Core.`,
            };
          });
        }

        // 2. Imagen principal para la página de inicio
        if (item.url === 'https://veyxara.com/') {
          item.img = [
            {
              url: 'https://veyxara.com/images/og-image.png',
              title: 'Veyxara Core - El núcleo de tu infraestructura',
              caption: 'Plataforma central de ingeniería de sistemas y automatización.',
            },
          ];
        }

        return item;
      },
    }),
    preact({
      include: ['**/preact/*'],
    }),
    react({
      include: ['**/components/RedirectAnalyzer.jsx', '**/components/react/*'],
    }),
  ],
});