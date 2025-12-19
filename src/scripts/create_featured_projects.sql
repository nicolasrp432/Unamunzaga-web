-- Enable RLS
CREATE TABLE IF NOT EXISTS featured_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  link TEXT NOT NULL DEFAULT '/portfolio',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE featured_projects ENABLE ROW LEVEL SECURITY;

-- Create policies
-- 1. Allow public read access
CREATE POLICY "Public read access" 
ON featured_projects FOR SELECT 
TO anon, authenticated 
USING (true);

-- 2. Allow authenticated users (admin) to insert/update/delete
-- Note: In a real app, you might want to restrict this to specific users or roles.
-- For this project, we assume authenticated users are admins.
CREATE POLICY "Authenticated admin full access" 
ON featured_projects FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Insert initial data (same as fallback)
INSERT INTO featured_projects (title, description, image_url, link, display_order)
VALUES 
(
  'UNA VIVIENDA DE REVISTA EN EL CORAZÓN DE BILBAO', 
  'Hemos reformado ésta vivienda en pleno corazón de Bilbao y su resultado ha sido de interés para una de las revistas más importantes del país.', 
  '/Proyectos – Unamunzaga Obras _ Empresa de Reformas en Bilbao/imgi_12_centro-de-Bilbao-EL-CANO-1.jpg',
  '/portfolio',
  1
),
(
  'REMODELACIÓN DE VIVIENDA EN EL CENTRO DE BILBAO',
  'Una reforma sutil y conservadora, manteniendo la esencia de la vivienda a petición de sus dueños con toques modernos y minimalistas.',
  '/Proyectos – Unamunzaga Obras _ Empresa de Reformas en Bilbao/imgi_17_centro-de-Bilbao-EL-CANO-3.jpg',
  '/portfolio',
  2
),
(
  'VIVIENDA EN CASCO VIEJO DE BILBAO',
  'Reforma de una vivienda en el Casco Viejo de Bilbao, usando tonos suaves logrados a partir de la combinación de materiales y elementos que en conjunto forman una maravillosa armonía.',
  '/Proyectos – Unamunzaga Obras _ Empresa de Reformas en Bilbao/imgi_10_casco-viejo-ITURRIBIDE-7.jpg',
  '/portfolio',
  3
),
(
  'DISEÑO CONTEMPORÁNEO EN INDAUTXU',
  'Transformación integral priorizando la luz natural y los espacios abiertos, creando un hogar funcional y estéticamente impecable.',
  '/Proyectos – Unamunzaga Obras _ Empresa de Reformas en Bilbao/imgi_146_viviendas-7.jpg',
  '/portfolio',
  4
);
