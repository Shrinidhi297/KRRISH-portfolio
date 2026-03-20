import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const allProjects = [
  {
    title: 'Cinematic Atmosphere',
    description: 'An exploration of moody lighting and deep textures in a cinematic environment.',
    year: '2025',
    duration: '2:15 min',
    video_url: 'https://kizwqxdcdghelwksfbto.supabase.co/storage/v1/object/public/videos/cinematic_1.mov',
    tags: ['Color Grade', 'Cinematography', 'Sound Design'],
    symbol: '◈'
  },
  {
    title: 'CGT Masterclass',
    description: 'High-end motion graphics and visual effects showcasing technical precision.',
    year: '2025',
    duration: '1:45 min',
    video_url: 'https://drive.google.com/uc?export=download&id=1n6RKH0Co3k__jbX821kJ6rCO5e-XoA00',
    tags: ['VFX', 'Motion Graphics', 'Editing'],
    symbol: '◉'
  },
  {
    title: 'Techstore Showcase',
    description: 'A dynamic commercial for a modern tech retailer with kinetic editing patterns.',
    year: '2025',
    duration: '55 sec',
    video_url: 'https://kizwqxdcdghelwksfbto.supabase.co/storage/v1/object/public/videos/techstore.mov',
    tags: ['Commercial', 'Fast Cuts', 'Branding'],
    symbol: '◇'
  }
];

async function finalSync() {
  console.log("🏁 Forcing final sync of all projects...");
  
  // 1. Truncate table to start fresh
  const { error: clearError } = await supabase.from('projects').delete().neq('title', 'placeholder_force_all_delete');
  if (clearError) console.error("⚠️ Error clearing table:", clearError.message);

  // 2. Insert all 3 correctly
  const { data, error } = await supabase
    .from('projects')
    .insert(allProjects);

  if (error) {
    console.error("❌ Final Sync Error:", error.message);
  } else {
    console.log("✨ SUCCESS! All 3 projects are now live in the database.");
  }
}

finalSync();
