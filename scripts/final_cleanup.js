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

async function finalCleanup() {
  console.log("🧹 Cleaning up duplicates and refining table...");
  
  // 1. Wipe the table completely
  const { error: wipeError } = await supabase.from('projects').delete().not('title', 'is', null);
  if (wipeError) {
    console.error("❌ Wipe Error:", wipeError.message);
    return;
  }

  // 2. Insert the clean 3 projects
  const { data, error: insertError } = await supabase.from('projects').insert(allProjects);

  if (insertError) {
    console.error("❌ Final Insert Error:", insertError.message);
  } else {
    console.log("✨ Table cleaned! Only 3 unique projects remain.");
  }
}

finalCleanup();
