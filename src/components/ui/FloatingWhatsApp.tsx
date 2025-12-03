import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { askMistral } from '../../lib/mistral';

const FloatingWhatsApp: React.FC = () => {
  const [isVisible] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'system' | 'user' | 'assistant'; content: string }>>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);

  const systemPrompt =
    'Eres el asistente virtual de Unamunzaga Obras, empresa de reformas y construcción en Bilbao (Bizkaia). Ofreces: reforma integral, cocina, baño, locales comerciales, obra nueva y otros. Respondes en menos de 24 horas, con asesoría gratuita y presupuestos transparentes. Si el usuario pide contacto, ofrece: Teléfono +34 944 000 000, Email info@unamunzagaobras.com, Dirección Calle Principal 123, 48001 Bilbao. Contesta siempre en español, de forma clara, breve y profesional, y pregunta lo necesario para preparar un presupuesto.';

  const handleWhatsAppClick = () => {
    const message = 'Hola, me gustaría solicitar información sobre sus servicios de reformas y construcción.';
    const whatsappUrl = `https://wa.me/34612345678?text=${encodeURIComponent(message)}`;
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

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setSending(true);
    const userMsg = { role: 'user' as const, content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    try {
      const history = messages.filter((m) => m.role !== 'system').slice(-8);
      const reply = await askMistral([{ role: 'system', content: systemPrompt }, ...history, userMsg]);
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

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50"
          onMouseEnter={() => setShowMenu(true)}
          onMouseLeave={() => setShowMenu(false)}
        >
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-20 right-0 bg-white rounded-lg shadow-2xl p-3 w-64"
              >
                <div className="space-y-2">
                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 flex items-center justify-center"
                  >
                    <IconBrandWhatsapp className="mr-2" size={16} /> WhatsApp
                  </button>
                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    Solicitar presupuesto
                  </button>
                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    Consultar disponibilidad
                  </button>
                  <button
                    onClick={openChatbot}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200"
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
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 flex items-center justify-center"
            aria-label="Abrir chat de WhatsApp"
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
              className="absolute inset-0 bg-green-500 rounded-full"
              style={{ zIndex: -1 }}
            />
          )}
          <AnimatePresence>
            {chatbotOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/50 backdrop-blur"
                onClick={() => setChatbotOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: -20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: -20 }}
                  className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-2xl mt-24 p-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Asistente Virtual</h3>
                    <p className="text-gray-600">Chatea con nosotros para obtener asesoría y presupuesto.</p>
                  </div>
                  <div className="flex flex-col h-96 border border-gray-200 rounded-xl overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                      {messages.map((m, idx) => (
                        <div
                          key={idx}
                          className={
                            m.role === 'assistant'
                              ? 'max-w-[85%] rounded-2xl px-4 py-3 bg-white shadow text-gray-900'
                              : 'max-w-[85%] rounded-2xl px-4 py-3 bg-blue-600 text-white ml-auto'
                          }
                        >
                          {m.content}
                        </div>
                      ))}
                      {sending && (
                        <div className="max-w-[60%] rounded-2xl px-4 py-3 bg-white shadow text-gray-900">
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
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => setChatbotOpen(false)}
                      className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
                    >
                      Cerrar
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingWhatsApp;
