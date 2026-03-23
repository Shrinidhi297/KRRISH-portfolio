import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import 'dotenv/config';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function listAll() {
  const { data, error } = await supabase
    .from('projects')
    .select('id, title, video_url');

  if (error) {
    console.error("❌ Error fetching projects:", error.message);
  } else {
    fs.writeFileSync('projects_list_utf8.json', JSON.stringify(data, null, 2), 'utf8');
    console.log("Projects saved to projects_list_utf8.json");
  }
}

listAll();
