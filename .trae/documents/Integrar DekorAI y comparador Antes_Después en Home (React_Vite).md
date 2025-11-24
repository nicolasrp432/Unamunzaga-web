## Alcance
- Integrar el bloque funcional de DekorAI (Style Swapper) como iframe/widget embebido en la web.
- Crear un componente visual de “Antes/Después” en Home, con control deslizante y botón de pantalla completa.
- Garantizar responsive, accesibilidad básica, feedback de carga/errores y documentación de uso.

## Investigación e integración DekorAI
1. Verificar el tipo de integración disponible (iframe/widget/API) en la URL indicada y confirmar permisos requeridos (cámara/micrófono si aplica, fullscreen).
2. Crear un wrapper reutilizable `DekorAIEmbed` que embeba el bloque:
   - Props: `src`, `title`, `height`, `allow`, y `className`.
   - Render: `<iframe src="https://dekorai.com/prueba-dekorai-gratis-en-tu-e-commerce-por-un-mes/#style-swapper" title="DekorAI IA Editor" width="100%" height="800" frameBorder="0" allow="camera; microphone; fullscreen" style={{ borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }} />`.
   - Loading spinner hasta `onLoad` y mensaje de error si falla.
3. Ubicación de uso:
   - Opción A: Sección dedicada en `Servicios` (alineada con el flujo de negocio).
   - Opción B: Modal desde Home (“Probar rediseño con IA”) que abre el editor a pantalla completa.
4. Copys y contexto: agregar texto “Edita tu espacio con IA en segundos usando DekorAI, ¡prueba el rediseño interactivo!” y CTA claro.

## Componente Antes/Después (Home)
1. Librería recomendada: `react-compare-image`.
   - Instalación: `npm i react-compare-image`.
2. Crear `BeforeAfter.jsx`:
   - Props: `leftImage`, `rightImage`, `captionLeft`, `captionRight`.
   - Usa `<ReactCompareImage leftImage={...} rightImage={...} sliderLineColor="#f7941d" hover sliderPositionPercentage={0.5} />`.
   - Añadir botón “Pantalla completa” usando Fullscreen API sobre el contenedor.
   - Bordes redondeados, sombra suave, y títulos/captions.
3. Integrar en `Home.jsx` sección destacada (full width):
   - Imágenes reales de reformas de Unamunzaga Obras o ejemplos de DekorAI (WebP/JPEG optimizados).
   - Copys: “Antes” y “Después” con textos accesibles.

## Responsive y estilos
- Contenedores fluidos (`width: 100%`) y alturas adaptativas; en móvil, altura fija razonable (p.ej. 360–480px) con el slider táctil.
- Mantener la identidad visual: radios, sombras, color de línea del slider `var(--color-accent)`.

## Accesibilidad y UX
- `alt` descriptivo en imágenes y `title` en iframe.
- Focus manejable en el botón de pantalla completa; teclado para salir de fullscreen.
- Spinner accesible con `aria-busy` y `aria-live="polite"`.
- Mensajes de error claros si el upload/formato es inválido (cuando corresponda en DekorAI).

## Optimización
- Usar formatos ligeros (WebP/JPEG comprimido) y `loading="lazy"` donde aplique.
- Evitar re-renders innecesarios con memoización del comparador si las props no cambian.

## Cambios de código propuestos
- `src/components/integrations/DekorAIEmbed.jsx`: wrapper del iframe con spinner y estilos.
- `src/components/ui/BeforeAfter.jsx`: comparador con botón fullscreen.
- `src/pages/Home.jsx`: nueva sección “Antes/Después” a pantalla completa; CTA a DekorAI (opción modal o sección de servicios).
- (Opcional) `src/components/ui/FullscreenButton.jsx` o hook `useFullscreen()` para reutilizar.

## Ejemplos (referencia rápida)
- DekorAI embed:
  ```jsx
  <DekorAIEmbed
    src="https://dekorai.com/prueba-dekorai-gratis-en-tu-e-commerce-por-un-mes/#style-swapper"
    title="DekorAI IA Editor"
    height={800}
    allow="camera; microphone; fullscreen"
  />
  ```
- Antes/Después:
  ```jsx
  <BeforeAfter
    leftImage="/assets/before.webp"
    rightImage="/assets/after.webp"
    captionLeft="Antes"
    captionRight="Después"
  />
  ```

## Verificación
- Pruebas manuales: carga del iframe (sin errores), interacción del editor (subir foto, rediseño, recomendaciones).
- Comparador: mover el slider en desktop/móvil, activar fullscreen y salir correctamente.
- Validar responsive en breakpoints (móvil, tablet, desktop).

## Documentación para marketing/cliente
- Cómo reemplazar imágenes del comparador: cambiar props o actualizar un JSON de configuración.
- Cómo mover/reubicar el bloque DekorAI: usar el wrapper `DekorAIEmbed` en cualquier página o modal.
- Requisitos técnicos: permisos `allow`, altura recomendada, y límites de tokens/uso (si aplica en el plan de DekorAI).

¿Confirmas que proceda con la opción de modal desde Home para DekorAI y la nueva sección de comparador a pantalla completa en Home? También puedo ubicar DekorAI directamente en `Servicios` si lo prefieres.