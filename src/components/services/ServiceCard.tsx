import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import type { ServiceItem } from '../../data/services';

type Props = {
  service: ServiceItem;
  onQuote?: (service: ServiceItem) => void;
  showCTAs?: boolean;
  compact?: boolean;
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 }
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 }
};

export const ServiceCard: React.FC<Props> = ({ service, onQuote, showCTAs = false, compact = false }) => {
  const Icon = service.icon;
  const features = compact ? service.features.slice(0, 3) : service.features;

  return (
    <motion.section
      whileHover={{ y: -6, scale: 1.02 }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants}
      className="service-card bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group"
    >
      <div className="relative h-52 service-image">
        <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {service.badges?.map((b) => (
            <span key={b} className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-900 text-white">
              {b}
            </span>
          ))}
        </div>
        <div className="service-icon-badge">
          {Icon ? <Icon className="w-10 h-10" /> : null}
        </div>
      </div>

      <div className="p-6 space-y-4 pt-20">
        <h2 className="text-xl font-bold text-gray-900 text-center">{service.title}</h2>
        <p className="text-gray-600 leading-relaxed">{service.description}</p>

        {service.microStat && (
          <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
            <Sparkles className="w-4 h-4" />
            <span>{service.microStat}</span>
          </div>
        )}

        <motion.ul className="space-y-2" variants={listVariants}>
          {features.map((feature, i) => (
            <motion.li key={i} className="flex items-start gap-2 text-gray-700" variants={itemVariants}>
              <Check className="w-4 h-4 text-amber-500 mt-0.5" /> {feature}
            </motion.li>
          ))}
        </motion.ul>

        <div className="flex flex-wrap gap-3 pt-2">
          {showCTAs && onQuote && (
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onQuote(service)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-white font-semibold hover:bg-amber-600 shadow-lg"
            >
              <MessageCircle className="w-4 h-4" /> Solicita tu presupuesto fácil
            </motion.button>
          )}

          <Link
            to={`/servicios#${service.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-200 text-blue-900 hover:bg-blue-50"
          >
            Ver servicio <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default ServiceCard;
