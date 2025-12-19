import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IconBrandWhatsapp, IconX, IconMessageChatbot, IconMail, IconSend } from '@tabler/icons-react';
import ReactMarkdown from 'react-markdown';
import { askMistral } from '../../lib/mistral';
import { useProjects } from '../../hooks/useProjects';
import { useServices } from '../../hooks/useServices';

type ServiceItem = { title: string };

const FloatingWhatsApp: React.FC = () => {
  const [isVisible] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'system' | 'user' | 'assistant'; content: string }>>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const { projects } = useProjects();
  const { services } = useServices();

  const systemPrompt =
    'Eres el asistente virtual de Unamunzaga Obras, empresa de reformas y construcción en Bilbao (Bizkaia). Ofreces: reforma integral, cocina, baño, locales comerciales, obra nueva y otros. Respondes en menos de 24 horas, con asesoría gratuita y presupuestos transparentes. Si el usuario pide contacto, ofrece: Teléfono +34 944 07 84 27, +34 674 27 44 66, +34 629 11 65 15, Email contacto@unamunzagaobras.com, Dirección Calle Licenciado Poza 30, 48011 Bilbao. Contesta siempre en español, de forma clara, breve y profesional, y pregunta lo necesario para preparar un presupuesto. Puedes usar formato Markdown para estructurar tu respuesta (listas, negritas, encabezados).';

  const buildSiteContext = () => {
    try {
      const servicesNames = services.map((s) => s.title).filter(Boolean);
      const featured = projects.filter((p) => p.is_featured);
      const featuredSummary = featured
        .slice(0, 3)
        .map((p) => `${p.title} (${p.location})`)
        .join('; ');
      const servicesSummary = servicesNames.slice(0, 6).join(', ');
      return `Información de la web: Servicios: ${servicesSummary}. Proyectos destacados: ${featuredSummary}.`;
    } catch {
      return '';
    }
  };
  const siteContext = useMemo(buildSiteContext, [projects, services]);

  const handleWhatsAppClick = () => {
    const message = 'Hola, me gustaría solicitar información sobre sus servicios de reformas y construcción.';
    const whatsappUrl = `https://wa.me/34674274466?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const openChatbot = () => {
    setChatbotOpen(true);
    setShowMenu(false);
    if (messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content:
            'Hola, soy el asistente virtual de Unamunzaga Obras. **¿En qué podemos ayudarte con tu reforma o construcción?**',
        },
      ]);
    }
  };

  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, sending]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setSending(true);
    const userMsg = { role: 'user' as const, content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    try {
      // Production check removed to allow API calls if endpoint exists
      const ping = await fetch('/api/mistral-ping').catch(() => null);
      // We still check if the ping works, but we don't block just based on environment
      if (!ping || !ping.ok) {
         // Fallback logic or error if API is truly missing
         // However, for now we will proceed to try the chat call, 
         // but if ping failed, chat likely will too.
         // Let's log it but try anyway or show error if we are sure.
         console.warn("API Ping failed, backend might be unavailable");
      }
      
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();
      const history = messages.filter((m) => m.role !== 'system').slice(-6);
      const reply = await askMistral(
        [{ role: 'system', content: `${systemPrompt}\n${siteContext}` }, ...history, userMsg],
        { signal: controllerRef.current.signal }
      );
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Ha ocurrido un error al responder. Por favor, contáctanos por WhatsApp o email.' },
      ]);
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50 font-sans"
        >
          <AnimatePresence>
            {showMenu && !chatbotOpen && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-20 right-0 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl shadow-2xl p-4 w-72 border border-slate-200 dark:border-slate-800"
              >
                <div className="space-y-3">
                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg px-4 py-3 text-sm font-bold transition-all duration-200 flex items-center justify-center shadow-sm"
                  >
                    <IconBrandWhatsapp className="mr-2" size={20} /> Contactar por WhatsApp
                  </button>
                  <button
                    onClick={() => navigate('/contacto')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3 text-sm font-bold transition-all duration-200 flex items-center justify-center shadow-sm"
                  >
                    <IconMail className="mr-2" size={20} /> Solicitar presupuesto
                  </button>
                  {/* 'Consultar disponibilidad' button removed */}
                  <button
                    onClick={openChatbot}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-lg px-4 py-3 text-sm font-bold transition-all duration-200 flex items-center justify-center shadow-sm"
                  >
                    <IconMessageChatbot className="mr-2" size={20} /> Asistente IA
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Button */}
          {!chatbotOpen && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full p-4 shadow-xl transition-all duration-300 flex items-center justify-center"
              aria-label="Abrir opciones de contacto"
              onClick={() => setShowMenu((v) => !v)}
            >
              <div className="relative">
                <IconBrandWhatsapp size={32} stroke={1.5} />
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full"
                />
              </div>
            </motion.button>
          )}

          <AnimatePresence>
            {chatbotOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-0 right-0 w-[380px] max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col h-[500px] max-h-[80vh]"
              >
                {/* Header */}
                <div className="bg-slate-50 dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <IconMessageChatbot className="text-blue-600 dark:text-blue-400" size={24} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">Asistente Virtual</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">En línea ahora</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setChatbotOpen(false)}
                    className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
                  >
                    <IconX size={20} />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-slate-950 scroll-smooth" ref={messagesRef}>
                  {messages.map((m, idx) => (
                    <div
                      key={idx}
                      className={`flex ${m.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                          m.role === 'assistant'
                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none'
                            : 'bg-blue-600 text-white rounded-tr-none'
                        }`}
                      >
                        <ReactMarkdown
                          components={{
                            p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-2" {...props} />,
                            li: ({node, ...props}) => <li className="mb-1" {...props} />,
                            h1: ({node, ...props}) => <h3 className="font-bold text-lg mb-2" {...props} />,
                            h2: ({node, ...props}) => <h4 className="font-bold text-base mb-2" {...props} />,
                            h3: ({node, ...props}) => <h5 className="font-bold text-sm mb-2" {...props} />,
                            a: ({node, ...props}) => <a className="underline hover:text-blue-200" target="_blank" {...props} />,
                            code: ({node, ...props}) => <code className="bg-black/10 dark:bg-white/10 rounded px-1" {...props} />,
                          }}
                        >
                          {m.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  ))}
                  {sending && (
                    <div className="flex justify-start">
                      <div className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-2xl rounded-tl-none px-4 py-3 text-sm animate-pulse">
                        Escribiendo...
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex gap-2">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      placeholder="Escribe tu mensaje..."
                      className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-slate-900 dark:text-white placeholder-slate-400 text-sm"
                    />
                    <button
                      disabled={sending || input.trim() === ''}
                      onClick={handleSend}
                      className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      aria-label="Enviar mensaje"
                    >
                      <IconSend size={20} />
                    </button>
                  </div>
                  
                  {/* Quick replies */}
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {[
                      'Presupuesto cocina',
                      'Reforma integral',
                      'Baño',
                      'Locales',
                    ].map((q) => (
                      <button
                        key={q}
                        onClick={() => setInput(q)}
                        className="whitespace-nowrap text-xs px-3 py-1.5 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingWhatsApp;
