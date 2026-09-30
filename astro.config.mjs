import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  trailingSlash: 'ignore',
  integrations: [
    {
      name: 'vista-diseno-solo-dev',
      hooks: {
        'astro:config:setup': ({ command, injectRoute }) => {
          if (command === 'dev') {
            injectRoute({
              pattern: '/diseno',
              entrypoint: './src/dev/diseno.astro',
            });
          }
        },
      },
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
