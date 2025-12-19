export default async function handler(req, res) {
  const apiKey = process.env.MISTRAL_API_KEY;
  
  if (!apiKey) {
    console.error('Ping failed: Missing MISTRAL_API_KEY');
    res.statusCode = 500;
    return res.json({ ok: false, error: 'Missing MISTRAL_API_KEY' });
  }

  try {
    // Lightweight check: list models to verify key is valid
    const upstream = await fetch('https://api.mistral.ai/v1/models', {
        method: 'GET',
        headers: { Authorization: `Bearer ${apiKey}` }
    });
    
    if (upstream.ok) {
        res.statusCode = 200;
        return res.json({ ok: true, message: 'Mistral API accessible' });
    } else {
        console.error('Mistral ping failed:', upstream.status);
        res.statusCode = 502;
        return res.json({ ok: false, error: 'Mistral unreachable or key invalid' });
    }
  } catch (e) {
      console.error('Ping exception:', e);
      res.statusCode = 500;
      return res.json({ ok: false, error: 'Ping exception' });
  }
}
