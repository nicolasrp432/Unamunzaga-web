export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    console.error('Missing MISTRAL_API_KEY env var');
    res.statusCode = 500;
    return res.json({ error: 'Missing MISTRAL_API_KEY' });
  }

  try {
    const { messages } = req.body || {};
    
    // Basic validation
    if (!messages || !Array.isArray(messages)) {
       res.statusCode = 400;
       return res.json({ error: 'Invalid messages format' });
    }

    console.log('Sending request to Mistral...');
    const upstream = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        temperature: 0.2,
        max_tokens: 1000,
        messages,
      }),
    });

    if (!upstream.ok) {
      const errText = await upstream.text();
      console.error('Mistral API error:', upstream.status, errText);
      res.statusCode = upstream.status;
      return res.json({ error: `Mistral API error: ${upstream.status}`, details: errText });
    }

    const data = await upstream.json();
    res.statusCode = 200;
    return res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.statusCode = 500;
    return res.json({ error: 'Internal Server Error', details: error.message });
  }
}
