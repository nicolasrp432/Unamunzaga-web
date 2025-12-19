-- SQL Fix Script for Unamunzaga Web
-- Run this script in your Supabase SQL Editor to fix "column does not exist" errors

-- 1. Fix Team Members Table
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

-- 2. Fix Services Table
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'display_order') THEN
        ALTER TABLE services ADD COLUMN display_order INTEGER DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'services' AND column_name = 'short_description') THEN
        ALTER TABLE services ADD COLUMN short_description TEXT;
    END IF;
END $$;

-- 3. Fix Projects Table
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'display_order') THEN
        ALTER TABLE projects ADD COLUMN display_order INTEGER DEFAULT 0;
    END IF;
END $$;

-- 4. Ensure Contact Messages Table Exists (if not created yet)
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
