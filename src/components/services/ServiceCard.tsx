import React from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  MessageCircle, 
  Sparkles, 
  Home, 
  Utensils, 
  Bath, 
  Building, 
  LayoutTemplate as Wall, 
  Zap, 
  Droplets, 
  PaintBucket as Paint,
  Store,
  Wrench,
  Hammer,
  HardHat,
  VolumeX,
  Umbrella,
  Accessibility,
  Sofa,
  ChefHat,
  ShoppingBag,
  Ear,
  Construction,
  Move,
  Ruler,
  Layers,
  Trash2,
  PaintRoller
} from 'lucide-react';
import type { ServiceItem } from '../../data/services';
import type { Service } from '../../hooks/useServices';

type Props = {
  service: ServiceItem | Service;
  onQuote?: (service: ServiceItem | Service) => void;
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

const iconMap: Record<string, any> = {
  home: Home,
  viviendas: Home,
  utensils: Utensils,
  cocinas: Utensils,
  chef: ChefHat,
  bath: Bath,
  banos: Bath,
  building: Building,
  fachada: Wall,
  fachadas: Wall,
  wall: Wall,
  electricidad: Zap,
  zap: Zap,
  fontaneria: Droplets,
  droplets: Droplets,
  paint: Paint,
  acabados: Paint,
  store: Store,
  locales: Store,
  shop: ShoppingBag,
  wrench: Wrench,
  reparaciones: Wrench,
  reformas: PaintRoller,
  hammer: Hammer,
  derribos: Hammer,
  volumex: VolumeX,
  insonorizacion: VolumeX,
  umbrella: Umbrella,
  impermeabilizacion: Umbrella,
  hardhat: HardHat,
  rehabilitaciones: HardHat,
  construction: Construction,
  estructuras: Construction,
  accessibility: Accessibility,
  accesibilidad: Accessibility,
  move: Move,
  sofa: Sofa,
  carpinteria: Ruler,
  ruler: Ruler,
  pladur: Layers,
  layers: Layers,
  trash: Trash2
};

const getIconForService = (service: ServiceItem | Service) => {
  // 1. Try direct icon property if it's a component (from local data)
  if (typeof service.icon !== 'string' && service.icon) {
    return service.icon;
  }

  // 2. Try mapping from string icon property
  if (typeof service.icon === 'string' && service.icon) {
    const key = service.icon.toLowerCase();
    if (iconMap[key]) return iconMap[key];
  }

  // 3. Try to infer from title or id
  const textToSearch = (service.title + ' ' + (service.id || '')).toLowerCase();
  
  if (textToSearch.includes('cocina')) return Utensils;
  if (textToSearch.includes('baño')) return Bath;
  if (textToSearch.includes('local')) return Store;
  if (textToSearch.includes('fachada')) return Building;
  if (textToSearch.includes('insonori')) return VolumeX;
  if (textToSearch.includes('impermeab')) return Umbrella;
  if (textToSearch.includes('rehabilitacion')) return HardHat;
  if (textToSearch.includes('accesibil')) return Accessibility;
  if (textToSearch.includes('vivienda')) return Home;
  if (textToSearch.includes('reforma')) return PaintRoller;
  if (textToSearch.includes('reparacion')) return Wrench;
  if (textToSearch.includes('estructur')) return Construction;
  if (textToSearch.includes('pladur')) return Layers;
  if (textToSearch.includes('carpinter')) return Ruler;
  if (textToSearch.includes('derribo')) return Trash2;
  if (textToSearch.includes('electric')) return Zap;
  if (textToSearch.includes('fontaner')) return Droplets;
  if (textToSearch.includes('pintura')) return Paint;
  if (textToSearch.includes('decoracion')) return Sparkles;

  // 4. Fallback
  return Home;
};

export const ServiceCard: React.FC<Props> = ({ service, onQuote, showCTAs = false, compact = false }) => {
  const Icon = getIconForService(service);

  const features = compact ? (service.features || []).slice(0, 3) : (service.features || []);
  const imageUrl = (service as any).image_url || service.image || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800';

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
        <img src={imageUrl} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {service.badges?.map((b) => (
            <span key={b} className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-900 text-white">
              {b}
            </span>
          ))}
        </div>
        <div className="service-icon-badge">
          <Icon className="w-10 h-10 text-blue-900" />
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
        </div>
      </div>
    </motion.section>
  );
};

export default ServiceCard;
