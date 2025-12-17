Voy a corregir el error crítico que está dejando la pantalla en blanco (White Screen of Death) restaurando la importación faltante de `ModernFooter`.

### Plan de Corrección
1.  **Restaurar Importación en `Home.tsx`**:
    *   Añadir `import ModernFooter from '../components/layout/ModernFooter';` que fue eliminado accidentalmente durante la optimización.
    *   Esto resolverá el error `Uncaught ReferenceError: ModernFooter is not defined`.

2.  **Verificación Rápida**:
    *   Confirmar que no falten otros componentes en la lista de importaciones comparada con el JSX.

### Archivos Afectados
*   `src/pages/Home.tsx`
