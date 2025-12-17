import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
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
            const chunks = []
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
                temperature: 0.2,
                max_tokens: 256,
                messages,
              }),
            })
            const status = upstream.status
            const text = await upstream.text()
            res.statusCode = status
            res.setHeader('Content-Type', 'application/json')
            res.end(text)
          } catch (e) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'proxy_error' }))
          }
        })
        server.middlewares.use('/api/mistral-ping', async (_req, res) => {
          const apiKey = process.env.MISTRAL_API_KEY
          if (!apiKey) {
            res.statusCode = 500
            res.end(JSON.stringify({ ok: false, error: 'Missing MISTRAL_API_KEY' }))
            return
          }
          try {
            const upstream = await fetch('https://api.mistral.ai/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
              },
              body: JSON.stringify({
                model: 'mistral-small-latest',
                messages: [
                  { role: 'system', content: 'Dev ping' },
                  { role: 'user', content: 'ping' },
                ],
                max_tokens: 16,
              }),
            })
            const status = upstream.status
            const text = await upstream.text()
            res.statusCode = status
            res.setHeader('Content-Type', 'application/json')
            res.end(text)
          } catch {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: false, error: 'proxy_error' }))
          }
        })
      },
    },
  ],
})
