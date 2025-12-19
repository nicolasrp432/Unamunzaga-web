export type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export function isChatAvailable(): boolean {
  return import.meta.env.DEV;
}

export async function askMistral(messages: ChatMessage[], opts?: { signal?: AbortSignal }): Promise<string> {
  // We allow API calls in production now, assuming the /api endpoint exists (e.g. Vercel functions)
  // if (!isChatAvailable()) {
  //   throw new Error('chat_unavailable_in_prod');
  // }
  
  const res = await fetch('/api/mistral-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
    signal: opts?.signal,
  });

  if (!res.ok) {
    let body = '';
    try {
      body = await res.text();
    } catch {
      body = '';
    }
    console.error('Mistral proxy error', { status: res.status, body });
    throw new Error(`Error proxy ${res.status}: ${body}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  return (typeof content === 'string' ? content : '').trim() || 'No se ha recibido respuesta.';
}
