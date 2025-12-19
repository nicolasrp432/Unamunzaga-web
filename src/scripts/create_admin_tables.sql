-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Team Members Table
CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    role TEXT NOT NULL,
    bio TEXT,
    image_url TEXT,
    email TEXT,
    phone TEXT,
    linkedin_url TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure columns exist (idempotent)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'team_members' AND column_name = 'display_order') THEN
        ALTER TABLE team_members ADD COLUMN display_order INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'team_members' AND column_name = 'image_url') THEN
        ALTER TABLE team_members ADD COLUMN image_url TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'team_members' AND column_name = 'experience') THEN
        ALTER TABLE team_members ADD COLUMN experience TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'team_members' AND column_name = 'specialties') THEN
        ALTER TABLE team_members ADD COLUMN specialties JSONB DEFAULT '[]'::jsonb;
    END IF;
END $$;


-- 2. Services Table
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    short_description TEXT,
    icon TEXT,
    image_url TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    price_range TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure columns exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'display_order') THEN
        ALTER TABLE services ADD COLUMN display_order INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'short_description') THEN
        ALTER TABLE services ADD COLUMN short_description TEXT;
    END IF;
END $$;


-- 3. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    year TEXT,
    location TEXT,
    category TEXT,
    duration TEXT,
    images JSONB DEFAULT '[]'::jsonb,
    is_featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure columns exist for projects
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'display_order') THEN
        ALTER TABLE projects ADD COLUMN display_order INTEGER DEFAULT 0;
    END IF;
END $$;


-- 4. Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread', -- unread, read, replied
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- 5. Activity Logs Table
CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    details JSONB,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Enable RLS
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- 7. Policies (Drop first to avoid conflicts if they exist)
DROP POLICY IF EXISTS "Public read team" ON team_members;
DROP POLICY IF EXISTS "Public read services" ON services;
DROP POLICY IF EXISTS "Public read projects" ON projects;
DROP POLICY IF EXISTS "Admin manage team" ON team_members;
DROP POLICY IF EXISTS "Admin manage services" ON services;
DROP POLICY IF EXISTS "Admin manage projects" ON projects;
DROP POLICY IF EXISTS "Admin manage messages" ON contact_messages;
DROP POLICY IF EXISTS "Insert messages" ON contact_messages;
DROP POLICY IF EXISTS "Admin log activity" ON activity_logs;

-- Re-create Policies
CREATE POLICY "Public read team" ON team_members FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read projects" ON projects FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admin manage team" ON team_members FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin manage services" ON services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin manage projects" ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin manage messages" ON contact_messages FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Insert messages" ON contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Admin log activity" ON activity_logs FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 6. Insert Mock Data if tables are empty
INSERT INTO team_members (full_name, role, display_order)
SELECT 'Juan Pérez', 'Arquitecto Jefe', 1
WHERE NOT EXISTS (SELECT 1 FROM team_members);

INSERT INTO services (title, description, price_range, display_order)
SELECT 'Reformas Integrales', 'Servicio completo de reforma.', 'Desde 500€/m2', 1
WHERE NOT EXISTS (SELECT 1 FROM services);
