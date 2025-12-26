import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  Calculator, 
  Clock, 
  Shield, 
  Send, 
  CheckCircle,
  Phone,
  Mail 
} from 'lucide-react';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { cn } from '../../lib/utils';
import { supabase } from '../../lib/supabase';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export const CTASection: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Send WhatsApp message
      const whatsappMessage = `Hola, soy ${data.name}. Me gustaría solicitar un presupuesto para ${data.service}. Mi email es ${data.email} y mi teléfono es ${data.phone}. ${data.message}`;
      const whatsappUrl = `https://wa.me/34674274466?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
      
      setSubmitStatus('success');
      reset();
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
      
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const message = 'Hola, me gustaría solicitar información sobre sus servicios de reformas.';
    const whatsappUrl = `https://wa.me/34674274466?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const callPhone = () => {
    window.open('tel:+34944078427');
  };

  const sendEmail = () => {
    window.open('mailto:contacto@unamunzagaobras.com');
  };

  return (
    <section id="contact" className="py-24 bg-dark-bg border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                ¿Tienes un proyecto
                <br />
                <span className="text-white/60">en mente?</span>
              </h2>
              <p className="text-lg text-white/40 leading-relaxed max-w-lg">
                Transformamos tu espacio con la garantía de más de 20 años de experiencia. 
                Contacta con nosotros y recibe un presupuesto personalizado.
              </p>
            </div>

            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-6"
            >
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={openWhatsApp}
                className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors"
              >
                <div className="p-3 rounded-full bg-white/5">
                  <IconBrandWhatsapp size={20} />
                </div>
                <span className="font-medium">WhatsApp</span>
              </motion.button>

              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={sendEmail}
                className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors"
              >
                <div className="p-3 rounded-full bg-white/5">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-medium">Email</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 md:p-10"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Solicita tu presupuesto</h3>
                <p className="text-white/40">Completa el formulario y te responderemos pronto.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-white/60">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'El nombre es obligatorio' })}
                    className={cn(
                      'w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-white outline-none transition-colors text-white placeholder:text-white/10',
                      errors.name && 'border-red-500/50'
                    )}
                    placeholder="Tu nombre"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/60">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', { 
                      required: 'El email es obligatorio',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email inválido'
                      }
                    })}
                    className={cn(
                      'w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-white outline-none transition-colors text-white placeholder:text-white/10',
                      errors.email && 'border-red-500/50'
                    )}
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              {/* Service Type */}
              <div className="space-y-2">
                <label htmlFor="service" className="text-sm font-medium text-white/60">
                  Tipo de servicio
                </label>
                <select
                  id="service"
                  {...register('service')}
                  className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-white outline-none transition-colors text-white appearance-none cursor-pointer"
                >
                  <option value="" className="bg-dark-bg">Selecciona un servicio</option>
                  <option value="reforma-integral" className="bg-dark-bg">Reforma integral</option>
                  <option value="cocina" className="bg-dark-bg">Reforma de cocina</option>
                  <option value="bano" className="bg-dark-bg">Reforma de baño</option>
                  <option value="local-comercial" className="bg-dark-bg">Local comercial</option>
                  <option value="obra-nueva" className="bg-dark-bg">Obra nueva</option>
                  <option value="otros" className="bg-dark-bg">Otros</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-white/60">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={3}
                  {...register('message', { required: 'El mensaje es obligatorio' })}
                  className={cn(
                    'w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-white outline-none transition-colors text-white placeholder:text-white/10 resize-none',
                    errors.message && 'border-red-500/50'
                  )}
                  placeholder="Cuéntanos sobre tu proyecto..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={cn(
                  'w-full py-4 rounded-lg font-semibold text-dark-bg transition-all duration-300',
                  isSubmitting
                    ? 'bg-white/20 cursor-not-allowed'
                    : 'bg-white hover:bg-white/90'
                )}
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div
                      key="submitting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center space-x-2"
                    >
                      <div className="w-5 h-5 border-2 border-dark-bg border-t-transparent rounded-full animate-spin" />
                      <span>Enviando...</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="submit"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center space-x-2"
                    >
                      <Send className="w-5 h-5" />
                      <span>Solicitar presupuesto</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Status Messages */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center space-x-2 p-4 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-green-800 font-medium">
                      ¡Mensaje enviado! Te hemos redirigido a WhatsApp para completar el proceso.
                    </p>
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">!</span>
                    </div>
                    <p className="text-red-800 font-medium">
                      Ha ocurrido un error. Por favor, inténtalo de nuevo.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
