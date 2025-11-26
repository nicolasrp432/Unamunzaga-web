import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

const FloatingWhatsApp: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const handleWhatsAppClick = () => {
    const message = 'Hola, me gustaría solicitar información sobre sus servicios de reformas y construcción.';
    const whatsappUrl = `https://wa.me/34612345678?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const openChatbot = () => {
    setChatbotOpen(true);
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
                    <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
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
              <MessageCircle className="w-6 h-6" />
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
                  className="max-w-sm w-full mx-auto bg-white rounded-2xl shadow-2xl mt-24 p-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Asistente Virtual</h3>
                    <p className="text-gray-600">Pronto disponible. Configuraremos el chatbot más adelante.</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setChatbotOpen(false)}
                      className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
                    >
                      Cerrar
                    </button>
                    <button
                      onClick={() => setChatbotOpen(false)}
                      className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Comenzar chat
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
