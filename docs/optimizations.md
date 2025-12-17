# Optimización de Home y Chatbot

## Cambios clave
- Autoplay móvil del vídeo de héroe con detección de dispositivo y fallback con botón de reproducción manual. Archivo: `src/components/sections/HeroSection.tsx`.
- Botones CTA con tamaños consistentes en móvil (`w-full`, `h-12`) y ancho fijo en desktop (`sm:w-[280px]`). Archivo: `src/components/sections/HeroSection.tsx`.
- Hovers del menú con colores más claros y mejor contraste manteniendo la paleta azul. Archivo: `src/components/layout/ModernNavbar.tsx`.
- Paleta y contrastes del FloatingWhatsApp reforzados (fondos más intensos y texto blanco). Archivo: `src/components/ui/FloatingWhatsApp.tsx`.
- Validación de entorno para el chatbot:
  - En producción, el chatbot se desactiva si no existe backend seguro.
  - En desarrollo, se verifica `/api/mistral-ping` y se muestran errores descriptivos si falta `MISTRAL_API_KEY`.
  Archivos: `src/components/ui/FloatingWhatsApp.tsx`, `src/lib/mistral.ts`.
- Optimización de rendimiento en Home con `React.lazy` + `Suspense` para secciones pesadas. Archivo: `src/pages/Home.tsx`.

## Variables de entorno
- `MISTRAL_API_KEY`: requerido en desarrollo para el proxy local.
- Producción: requiere un endpoint backend propio (no incluido) para evitar exponer claves.

## Pruebas sugeridas
- Dispositivos móviles reales: iOS Safari (iPhone), Android Chrome. Verificar autoplay con `muted` y `playsInline`; comprobar botón de fallback.
- Navegadores de escritorio: Chrome, Safari, Firefox. Verificar hovers, tamaños de botones y carga diferida (placeholders de `Suspense`).
- Accesibilidad básica: contraste suficiente en hovers y textos del menú y WhatsApp.

## Rendimiento
- Vídeos con `preload="metadata"` para reducir coste inicial.
- Carga diferida de secciones no críticas para mejorar TTI.

## Cómo ejecutar
- Desarrollo: `MISTRAL_API_KEY` en entorno de Vite (`vite` inicia el proxy dev).
- Producción: deshabilitado el chatbot si no hay backend. Implementar un endpoint seguro antes de activar.

