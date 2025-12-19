import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY not found in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyTables() {
  console.log('Verifying Supabase tables...');

  // Check testimonials
  try {
    const { data: tData, error: tError } = await supabase
      .from('testimonials')
      .select('*')
      .limit(1);
      
    if (tError) {
        console.log('❌ Table "testimonials": Error/Missing (' + tError.message + ')');
    } else {
        console.log('✅ Table "testimonials": Exists.');
    }
  } catch (e) { console.log('❌ Table "testimonials": Error', e); }

  // Check featured_projects
  try {
    const { data, error } = await supabase
      .from('featured_projects')
      .select('*')
      .limit(1);

    if (error) {
      console.log('❌ Table "featured_projects": Error/Missing (' + error.message + ')');
      console.log('\nAction required for featured_projects:');
      console.log('Please run the SQL migration script located at: src/scripts/create_featured_projects.sql');
    } else {
      console.log('✅ Table "featured_projects": Exists.');
      
      // Count total
      const { count } = await supabase
        .from('featured_projects')
        .select('*', { count: 'exact', head: true });
        
      console.log(`   - Total projects: ${count}`);
    }

  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

verifyTables();
