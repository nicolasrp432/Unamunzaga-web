import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import { traeBadgePlugin } from 'vite-plugin-trae-solo-badge';

// https://vite.dev/config/
export default defineConfig({
  build: {
    sourcemap: 'hidden',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [
          'react-dev-locator',
        ],
      },
    }),
    traeBadgePlugin({
      variant: 'dark',
      position: 'bottom-right',
      prodOnly: true,
      clickable: true,
      clickUrl: 'https://www.trae.ai/solo?showJoin=1',
      autoTheme: true,
      autoThemeTarget: '#root'
    }), 
    tsconfigPaths(),
    // Dev-only proxy to avoid exposing Mistral API key in frontend
    ({
      name: 'mistral-proxy',
      configureServer(server) {
        server.middlewares.use('/api/mistral-chat', async (req, res) => {
          if (req.method !== 'POST') {
            res.statusCode = 405
            res.end('Method Not Allowed')
            return
          }
          const apiKey = process.env.MISTRAL_API_KEY
          if (!apiKey) {
            res.statusCode = 500
            res.end('Missing MISTRAL_API_KEY')
            return
          }
          try {
            const chunks: Buffer[] = []
            for await (const chunk of req) chunks.push(Buffer.from(chunk))
            const bodyText = Buffer.concat(chunks).toString('utf8') || '{}'
            const payload = JSON.parse(bodyText)
            const messages = payload?.messages ?? []
            const upstream = await fetch('https://api.mistral.ai/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
              },
              body: JSON.stringify({
                model: 'mistral-small-latest',
                temperature: 0.3,
                max_tokens: 512,
                messages,
              }),
            })
            const data = await upstream.json()
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(data))
          } catch {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'proxy_error' }))
          }
        })
      },
    } as Plugin)
  ],
})
