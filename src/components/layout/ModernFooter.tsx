import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';
import FloatingWhatsApp from '../ui/FloatingWhatsApp';

import { useSiteSettings } from '../../hooks/useSiteSettings';

const ModernFooter: React.FC = () => {
  const { settings } = useSiteSettings();

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Dirección',
      content: settings ? `${settings.address_street}, ${settings.address_city} ${settings.address_zip}` : 'Cargando...',
      subtitle: settings ? `${settings.address_province}, España` : '...'
    },
    {
      icon: Phone,
      title: 'Teléfono',
      content: settings?.phone_primary || 'Cargando...',
      subtitle: settings?.business_hours || 'Lun-Vie: 8:00-18:00'
    },
    {
      icon: Mail,
      title: 'Email',
      content: settings?.email_contact || 'Cargando...',
      subtitle: 'Respuesta en 24h'
    },
    {
      icon: Clock,
      title: 'Horario',
      content: 'Lunes a Viernes',
      subtitle: '8:00 - 18:00'
    }
  ];

  const services = [
    'Reformas Integrales',
    'Obra Nueva',
    'Rehabilitación',
    'Diseño de Interiores',
    'Gestión de Licencias',
    'Proyectos Llave en Mano'
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Contact Blocks Section */}
      <div className="bg-blue-600 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group cursor-pointer"
                >
                  <div className="bg-white bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-white group-hover:bg-opacity-20 transition-all duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-white text-opacity-90 mb-1">{item.content}</p>
                  <p className="text-white text-opacity-70 text-sm">{item.subtitle}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Unamunzaga Obras</h2>
              <p className="text-gray-300 leading-relaxed">
                Más de 20 años de experiencia en reformas y construcción en Bilbao.
                Especialistas en reformas integrales, obra nueva y rehabilitación de espacios.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="bg-gray-700 hover:bg-blue-600 rounded-full p-3 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">Servicios</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li
                  key={service}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <a
                    href="#services"
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    {service}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Google Maps Embed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">Ubicación</h3>
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2903.038043258774!2d-2.925289684523449!3d43.26377907913515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4e4fd0f9a3c6b7%3A0x9e8c4e8e5b2c1d3f!2sCalle%20Licenciado%20Poza%2C%2030%2C%2048011%20Bilbao%2C%20Vizcaya!5e0!3m2!1ses!2ses!4v1234567890123!5m2!1ses!2ses"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Unamunzaga Obras en Bilbao"
                className="w-full"
              />
              <div className="p-4">
                <p className="text-gray-300 text-sm mb-2">
                  <strong>Calle Licenciado Poza, 30</strong>
                </p>
                <p className="text-gray-400 text-sm">
                  48011 Bilbao, Vizcaya<br />
                  País Vasco, España
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-gray-400 text-sm mb-4 md:mb-0"
            >
              © 2024 Unamunzaga Obras. Todos los derechos reservados.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-6 text-sm text-gray-400"
            >
              <a href="#privacy" className="hover:text-white transition-colors duration-300">
                Política de Privacidad
              </a>
              <a href="#cookies" className="hover:text-white transition-colors duration-300">
                Política de Cookies
              </a>
              <a href="#legal" className="hover:text-white transition-colors duration-300">
                Aviso Legal
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <FloatingWhatsApp />
    </footer>
  );
};

export default ModernFooter;
