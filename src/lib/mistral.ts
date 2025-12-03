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
    const text = await res.text().catch(() => '');
    throw new Error(`Error proxy ${res.status}: ${text}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  return (typeof content === 'string' ? content : '').trim() || 'No se ha recibido respuesta.';
}
