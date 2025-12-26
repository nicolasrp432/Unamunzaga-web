import React from 'react';
import { 
  Sparkles, 
  Utensils, 
  Home, 
  Building2, 
  Store, 
  ArrowUp, 
  VolumeX, 
  LayoutGrid,
  ClipboardList
} from 'lucide-react';

export const PORTFOLIO_CATEGORIES = [
  'all',
  'trabajos-recientes',
  'bares-restaurantes',
  'viviendas',
  'fachadas',
  'locales-comerciales',
  'tejados',
  'insonorizacion'
] as const;

export type PortfolioCategory = typeof PORTFOLIO_CATEGORIES[number];

export const CATEGORY_NAMES: Record<string, string> = {
  'all': 'Todos',
  'trabajos-recientes': 'TRABAJOS RECIENTES',
  'bares-restaurantes': 'BARES Y RESTAURANTES',
  'viviendas': 'VIVIENDAS',
  'fachadas': 'FACHADAS',
  'locales-comerciales': 'LOCALES COMERCIALES',
  'tejados': 'TEJADOS',
  'insonorizacion': 'INSONORIZACIÓN'
};

export const getCategoryIcon = (category: string): React.ReactNode => {
  const props = { size: 18 };
  switch (category) {
    case 'trabajos-recientes': return React.createElement(Sparkles, props);
    case 'bares-restaurantes': return React.createElement(Utensils, props);
    case 'viviendas': return React.createElement(Home, props);
    case 'fachadas': return React.createElement(Building2, props);
    case 'locales-comerciales': return React.createElement(Store, props);
    case 'tejados': return React.createElement(ArrowUp, props);
    case 'insonorizacion': return React.createElement(VolumeX, props);
    case 'all': return React.createElement(LayoutGrid, props);
    default: return React.createElement(ClipboardList, props);
  }
};

export const getCategoryName = (category: string): string => {
  return CATEGORY_NAMES[category] || category;
};
