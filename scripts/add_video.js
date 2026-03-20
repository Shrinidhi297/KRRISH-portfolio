import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import 'dotenv/config'; // Load variables from .env

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase variables in .env!");
  console.log("Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function addVideo(filePath, title, description, year, duration, tags) {
  try {
    const fileName = path.basename(filePath);
    const fileBuffer = fs.readFileSync(filePath);

    console.log(`🚀 Uploading ${fileName} to Supabase Storage...`);
    
    // 1. Upload to "videos" bucket
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('videos')
      .upload(fileName, fileBuffer, {
        contentType: 'video/mp4', // Adjust if needed
        upsert: true
      });

    if (uploadError) throw uploadError;

    // 2. Get Public URL
    const { data: { publicUrl } } = supabase.storage
      .from('videos')
      .getPublicUrl(fileName);

    console.log(`✅ Uploaded successfully! Public URL: ${publicUrl}`);

    // 3. Insert into "projects" table
    console.log(`💾 Inserting ${title} into projects table...`);
    const { data: dbData, error: dbError } = await supabase
      .from('projects')
      .insert([
        { 
          title, 
          description, 
          year, 
          duration, 
          video_url: publicUrl,
          tags: tags || []
        }
      ]);

    if (dbError) throw dbError;

    console.log(`✨ Success! ${title} is now live on your website.`);
  } catch (err) {
    console.error("❌ Error adding video:", err.message);
  }
}

// Command line usage: node scripts/add_video.js [path] [title] [desc] [year] [duration] [tags_comma_separated]
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log("Usage: node scripts/add_video.js [path] [title] [optional: desc] [optional: year] [optional: duration] [optional: tags]");
  process.exit(0);
}

const [fPath, vTitle, vDesc = '', vYear = '2025', vDuration = '', vTagsStr = ''] = args;
const vTags = vTagsStr ? vTagsStr.split(',').map(t => t.trim()) : [];

addVideo(fPath, vTitle, vDesc, vYear, vDuration, vTags);
