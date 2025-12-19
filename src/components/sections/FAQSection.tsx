import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: '1',
    category: 'General',
    question: '¿Realizan presupuestos sin compromiso?',
    answer: 'Sí, realizamos visitas y presupuestos totalmente gratuitos y sin compromiso. Analizamos tus necesidades in situ para ofrecerte la valoración más ajustada a tu proyecto.'
  },
  {
    id: '2',
    category: 'General',
    question: '¿En qué zonas trabajan?',
    answer: 'Trabajamos principalmente en Bilbao y toda la provincia de Bizkaia. También atendemos proyectos puntuales en zonas limítrofes según la envergadura del proyecto.'
  },
  {
    id: '3',
    category: 'Servicios',
    question: '¿Gestionan las licencias de obra?',
    answer: 'Sí, nos encargamos de toda la gestión administrativa, incluyendo licencias de obra municipales, permisos de ocupación de vía pública y gestión de residuos.'
  },
  {
    id: '4',
    category: 'Garantía',
    question: '¿Ofrecen garantía en sus trabajos?',
    answer: 'Por supuesto. Todas nuestras obras cuentan con la garantía legal establecida. Además, ofrecemos un servicio post-obra para asegurar tu total satisfacción con el resultado final.'
  },
  {
    id: '5',
    category: 'Plazos',
    question: '¿Cuánto tiempo tarda una reforma integral?',
    answer: 'El tiempo varía según la complejidad y metros cuadrados, pero una reforma integral de vivienda suele durar entre 2 y 4 meses. Te daremos un cronograma detallado antes de empezar.'
  },
  {
    id: '6',
    category: 'Servicios',
    question: '¿Tienen seguro de responsabilidad civil?',
    answer: 'Sí, contamos con un seguro de responsabilidad civil completo que cubre cualquier incidencia que pudiera ocurrir durante la ejecución de la obra, para tu total tranquilidad.'
  }
];

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-blue-900 font-semibold tracking-wider uppercase text-sm">Dudas Comunes</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white-900 mt-2 mb-4">Preguntas Frecuentes</h2>
          <p className="text-white-600 max-w-2xl mx-auto">Resolvemos tus dudas sobre nuestros servicios, procesos de trabajo y garantías para que inicies tu proyecto con total confianza.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div 
              key={faq.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                aria-expanded={openId === faq.id}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg transition-colors ${openId === faq.id ? 'bg-blue-900/10 text-blue-900' : ' text-gray-500'}`}>
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-white-900 text-lg pr-4">{faq.question}</span>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-white-400 transition-transform duration-300 flex-shrink-0 ${openId === faq.id ? 'rotate-180' : ''}`}
                />
              </button>
              
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-0 pl-[4.5rem] text-gray-600 leading-relaxed border-t border-transparent">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
