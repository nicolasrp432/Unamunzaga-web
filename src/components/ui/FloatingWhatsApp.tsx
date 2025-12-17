import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IconBrandWhatsapp } from '@tabler/icons-react';
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
    'Eres el asistente virtual de Unamunzaga Obras, empresa de reformas y construcción en Bilbao (Bizkaia). Ofreces: reforma integral, cocina, baño, locales comerciales, obra nueva y otros. Respondes en menos de 24 horas, con asesoría gratuita y presupuestos transparentes. Si el usuario pide contacto, ofrece: Teléfono +34 944 07 84 27, +34 674 27 44 66, +34 629 11 65 15, Email contacto@unamunzagaobras.com, Dirección Calle Licenciado Poza 30, 48011 Bilbao. Contesta siempre en español, de forma clara, breve y profesional, y pregunta lo necesario para preparar un presupuesto.';

  const buildSiteContext = () => {
    try {
      const servicesNames = services.map((s) => s.title).filter(Boolean);
      const featured = projects.filter((p) => p.featured);
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
    if (messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content:
            'Hola, soy el asistente virtual de Unamunzaga Obras. ¿En qué podemos ayudarte con tu reforma o construcción?',
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
      if (import.meta.env.PROD) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              'El chatbot no está disponible en producción sin backend configurado. Configura MISTRAL_API_KEY y un endpoint seguro.',
          },
        ]);
        return;
      }
      const ping = await fetch('/api/mistral-ping').catch(() => null);
      if (!ping || !ping.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              'Error de configuración: falta MISTRAL_API_KEY o el proxy no está operativo. Revisa las variables de entorno.',
          },
        ]);
        return;
      }
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();
      const history = messages.filter((m) => m.role !== 'system').slice(-6);
      const reply = await askMistral(
        [{ role: 'system', content: `${systemPrompt}\n${siteContext}` }, ...history, userMsg],
        { signal: controllerRef.current.signal }
      );
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Ha ocurrido un error al responder. Inténtalo de nuevo más tarde.' },
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
          className="fixed bottom-6 right-6 z-50"
        >
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-20 right-0 bg-slate-900 text-white rounded-lg shadow-2xl p-3 w-64"
              >
                <div className="space-y-2">
                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 flex items-center justify-center"
                  >
                    <IconBrandWhatsapp className="mr-2" size={16} /> WhatsApp
                  </button>
                  <button
                    onClick={() => navigate('/contacto')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    Solicitar presupuesto
                  </button>
                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full bg-slate-600 hover:bg-slate-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    Consultar disponibilidad
                  </button>
                  <button
                    onClick={openChatbot}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    Hablar con chatbot
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 flex items-center justify-center"
            aria-label="Abrir chat de WhatsApp"
            onClick={() => setShowMenu((v) => !v)}
          >
            <div className="relative">
              <IconBrandWhatsapp size={24} />
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
              />
            </div>
          </motion.button>

          {!showMenu && (
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-green-600 rounded-full"
              style={{ zIndex: -1 }}
            />
          )}
          <AnimatePresence>
            {chatbotOpen && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-24 right-0 w-[360px] max-w-[90vw] bg-white rounded-2xl shadow-2xl p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Asistente Virtual</h3>
                    <p className="text-sm text-gray-600">Asesoría inmediata y presupuestos transparentes.</p>
                  </div>
                  <button
                    onClick={() => setChatbotOpen(false)}
                    className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    Cerrar
                  </button>
                </div>
                <div className="flex flex-col h-96 border border-gray-200 rounded-xl overflow-hidden">
                  <div ref={messagesRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                    {messages.map((m, idx) => (
                      <div
                        key={idx}
                        className={
                          m.role === 'assistant'
                            ? 'max-w-[85%] rounded-2xl px-4 py-3 bg-slate-800 shadow text-white'
                            : 'max-w-[85%] rounded-2xl px-4 py-3 bg-blue-600 text-white ml-auto'
                        }
                      >
                        {m.content}
                      </div>
                    ))}
                    {sending && (
                      <div className="max-w-[60%] rounded-2xl px-4 py-3 bg-slate-800 shadow text-white">
                        Escribiendo...
                      </div>
                    )}
                  </div>
                  <div className="border-t border-gray-200 p-3 bg-white">
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
                        placeholder="Escribe tu consulta..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        disabled={sending || input.trim() === ''}
                        onClick={handleSend}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300"
                      >
                        Enviar
                      </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {[
                        'Quiero reformar una cocina',
                        'Presupuesto para baño',
                        'Disponibilidad para locales',
                        'Asesoría en fachadas',
                      ].map((q) => (
                        <button
                          key={q}
                          onClick={() => setInput(q)}
                          className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
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
