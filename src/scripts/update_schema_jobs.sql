-- Script to create tables for Job Positions and Applications
-- Run this in Supabase SQL Editor

-- 1. Job Positions Table (for listing offers)
CREATE TABLE IF NOT EXISTS job_positions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT[] DEFAULT '{}',
    type TEXT NOT NULL, -- 'Tiempo Completo', 'Medio Tiempo', etc.
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Job Applications Table (for receiving CVs)
CREATE TABLE IF NOT EXISTS job_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    position TEXT NOT NULL,
    experience TEXT,
    education TEXT,
    skills TEXT,
    message TEXT,
    cv_url TEXT,
    status TEXT DEFAULT 'new', -- 'new', 'reviewed', 'contacted', 'rejected', 'hired'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable RLS
ALTER TABLE job_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- 4. Policies

-- Job Positions: Public read, Admin manage
DROP POLICY IF EXISTS "Public read job_positions" ON job_positions;
CREATE POLICY "Public read job_positions" ON job_positions
    FOR SELECT TO anon, authenticated USING (is_active = true);

DROP POLICY IF EXISTS "Admin manage job_positions" ON job_positions;
CREATE POLICY "Admin manage job_positions" ON job_positions
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Job Applications: Public insert, Admin manage
DROP POLICY IF EXISTS "Public insert job_applications" ON job_applications;
CREATE POLICY "Public insert job_applications" ON job_applications
    FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Admin manage job_applications" ON job_applications;
CREATE POLICY "Admin manage job_applications" ON job_applications
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 5. Insert Mock Data (Only if empty)
INSERT INTO job_positions (title, description, requirements, type, is_active)
SELECT 
    'Oficial de Primera - Albañilería',
    'Buscamos oficial de primera con experiencia demostrable en reformas integrales.',
    ARRAY['Experiencia mínima de 5 años', 'Carnet de conducir B', 'Curso de PRL 20h'],
    'Tiempo Completo',
    true
WHERE NOT EXISTS (SELECT 1 FROM job_positions);

INSERT INTO job_positions (title, description, requirements, type, is_active)
SELECT 
    'Ayudante de Construcción',
    'Se precisa ayudante con ganas de aprender y trabajar en equipo.',
    ARRAY['Ganas de trabajar', 'Documentación en regla'],
    'Tiempo Completo',
    true
WHERE NOT EXISTS (SELECT 1 FROM job_positions);
