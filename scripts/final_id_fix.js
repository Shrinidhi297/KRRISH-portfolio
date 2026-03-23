import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function finalFix() {
  const projectId = '68d271b8-fb3b-4718-9af0-0664ea0340f5';
  const newUrl = 'https://kizwqxdcdghelwksfbto.supabase.co/storage/v1/object/public/videos/cgt_final.mp4';

  console.log(`Fixing project ID: ${projectId}`);
  const { data, error } = await supabase
    .from('projects')
    .update({ video_url: newUrl })
    .eq('id', projectId);

  if (error) {
    console.error("❌ Final fix error:", error.message);
  } else {
    console.log("✅ Final fix: URL updated by ID.");
  }
}

finalFix();
