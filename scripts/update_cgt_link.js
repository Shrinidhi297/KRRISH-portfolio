import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function updateVideo() {
  const gDriveId = '1n6RKH0Co3k__jbX821kJ6rCO5e-XoA00';
  const directLink = `https://drive.google.com/uc?export=download&id=${gDriveId}`;

  // Update the CGT project entry in Supabase
  const { data, error } = await supabase
    .from('projects')
    .update({ video_url: directLink })
    .match({ title: 'CGT Masterclass' });

  if (error) {
    console.error("❌ Error updating project:", error.message);
  } else {
    console.log("✅ CGT video link updated successfully!");
  }
}

updateVideo();
