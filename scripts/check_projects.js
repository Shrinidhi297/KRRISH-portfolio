import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProject() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('title', 'CGT Masterclass');

  if (error) {
    console.error("❌ Error fetching project:", error.message);
  } else {
    console.log("Current Project Data:", JSON.stringify(data, null, 2));
  }
}

checkProject();
