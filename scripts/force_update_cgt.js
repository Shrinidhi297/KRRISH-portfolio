import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function forceUpdate() {
  const oldUrl = 'https://drive.google.com/uc?export=download&id=1n6RKH0Co3k__jbX821kJ6rCO5e-XoA00';
  const newUrl = 'https://kizwqxdcdghelwksfbto.supabase.co/storage/v1/object/public/videos/cgt_final.mp4';

  console.log(`Searching for and updating project with URL: ${oldUrl}`);
  
  const { data, error } = await supabase
    .from('projects')
    .update({ video_url: newUrl })
    .or(`video_url.eq.${oldUrl},title.ilike.%CGT%`);

  if (error) {
    console.error("❌ Error during force update:", error.message);
  } else {
    console.log(`✅ Force update result: Updated entries.`);
  }

  // Double check
  const { data: checkData } = await supabase.from('projects').select('id, title, video_url');
  console.log("Projects after final update:", JSON.stringify(checkData, null, 2));
}

forceUpdate();
