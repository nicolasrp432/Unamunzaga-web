-- Actualizar María García
UPDATE testimonials 
SET 
  testimonial_text = 'Cada día estamos más contentos y satisfechos de habernos encontrado esta empresa. Si buscas un servicio profesional, te aseguro que no te van a defraudar. Si tienes una obra, os aseguramos que necesitaréis tener un equipo de confianza y que te den soluciones al momento. Muchas gracias por el gran soporte que ofrecéis.

La atención al detalle en cada fase del proyecto ha sido excepcional. Desde la planificación inicial hasta la ejecución final, el equipo demostró un compromiso inquebrantable con la calidad y la excelencia. Nos impresionó especialmente su capacidad para adaptarse a nuestros cambios de última hora sin comprometer los plazos de entrega, algo que en nuestra experiencia es muy difícil de encontrar en el sector.

Definitivamente seguiremos contando con ellos para futuras expansiones de nuestro negocio. La tranquilidad de saber que estamos en manos de verdaderos expertos no tiene precio. Recomiendo encarecidamente sus servicios a cualquier empresa que valore la seriedad, la transparencia y, sobre todo, los resultados impecables.',
  image_url = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150'
WHERE id = '1525b29d-34af-427f-9a72-40a4efa703a8';

-- Actualizar Martín Loynaz
UPDATE testimonials 
SET 
  testimonial_text = 'Muy funcional. La solución que nos han proporcionado no solo cumple con nuestros requisitos básicos, sino que ha optimizado significativamente nuestros procesos internos. La integración de los nuevos sistemas fue mucho más fluida de lo que esperábamos, gracias a la meticulosa planificación del equipo técnico.

Lo que más valoramos es la proactividad que mostraron al sugerir mejoras que ni siquiera habíamos considerado. Su visión estratégica nos ha permitido ahorrar costes a largo plazo y mejorar la eficiencia operativa de nuestra planta. Es raro encontrar proveedores que se involucren tanto en el éxito del cliente como si fuera su propio negocio.

El soporte post-venta también merece una mención especial. Ante cualquier duda o pequeña incidencia, la respuesta ha sido inmediata y efectiva. Contar con un socio tecnológico de este calibre nos da la confianza necesaria para afrontar proyectos más ambiciosos en el futuro.',
  image_url = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150'
WHERE id = '68c35f44-52a9-4610-b882-1daab651b8ce';

-- Actualizar John Sebastian
UPDATE testimonials 
SET 
  client_name = 'John Sebastian',
  testimonial_text = 'Quedó impecable. El acabado final superó todas nuestras expectativas estéticas y funcionales. Se nota la experiencia y el cariño puesto en cada metro cuadrado de la obra. La elección de materiales y la ejecución técnica han sido de primer nivel, transformando completamente la imagen de nuestras oficinas centrales.

Durante todo el proceso, la comunicación fue fluida y constante. Nos mantuvieron informados de cada avance y gestionaron los imprevistos con una profesionalidad admirable. Cumplir con el presupuesto y el cronograma en un proyecto de esta envergadura parecía imposible, pero ellos lo lograron con una naturalidad pasmosa.

Nuestros clientes y empleados no dejan de elogiar las nuevas instalaciones. Este proyecto ha marcado un antes y un después en nuestra identidad corporativa. Sin duda, ha sido una de las mejores inversiones que hemos realizado en los últimos años.',
  image_url = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150'
WHERE id = '232e7e84-16dc-40a1-af5f-7969c817ccf0';

-- Insertar Ana Rodríguez
INSERT INTO testimonials (client_name, role, company, testimonial_text, rating, image_url)
VALUES (
  'Ana Rodríguez',
  'Arquitecta Directora',
  'Estudio ARQ',
  'Como arquitecta, soy extremadamente exigente con la ejecución de mis diseños, y trabajar con este equipo ha sido una experiencia refrescante. Han sabido interpretar a la perfección la visión del proyecto, respetando cada línea y cada especificación técnica con un rigor absoluto. La coordinación en obra fue ejemplar.

Me sorprendió gratamente su capacidad técnica para resolver detalles constructivos complejos in situ. Donde otros veían problemas, ellos proponían soluciones ingeniosas que no solo salvaban el obstáculo, sino que a menudo mejoraban el diseño original. Es un placer colaborar con profesionales que hablan tu mismo idioma y comparten la pasión por la arquitectura bien hecha.

La gestión de los tiempos y la limpieza en la obra fueron otros puntos fuertes a destacar. Entregaron el proyecto llave en mano cumpliendo estrictamente con los plazos acordados, lo cual facilitó enormemente mi trabajo frente a la propiedad. Sin duda, contaré con ellos para mis próximos proyectos residenciales de alto standing.',
  5,
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150'
);
