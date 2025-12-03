export type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export async function askMistral(messages: ChatMessage[]): Promise<string> {
  const res = await fetch('/api/mistral-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
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
