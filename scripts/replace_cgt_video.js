import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function replaceCGT(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found: ${filePath}`);
      return;
    }

    const fileName = 'cgt_final.mp4'; // Standardized name for storage
    const fileBuffer = fs.readFileSync(filePath);

    console.log(`🚀 Uploading new CGT video to Supabase Storage (${fileName})...`);
    
    // 1. Upload to "videos" bucket
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('videos')
      .upload(fileName, fileBuffer, {
        contentType: 'video/mp4',
        upsert: true
      });

    if (uploadError) throw uploadError;

    // 2. Get Public URL
    const { data: { publicUrl } } = supabase.storage
      .from('videos')
      .getPublicUrl(fileName);

    console.log(`✅ Uploaded successfully! Public URL: ${publicUrl}`);

    // 3. Update the existing project in the "projects" table
    console.log(`💾 Updating "CGT Masterclass" project with new URL...`);
    const { data: dbData, error: dbError } = await supabase
      .from('projects')
      .update({ video_url: publicUrl })
      .eq('title', 'CGT Masterclass');

    if (dbError) throw dbError;

    console.log(`✨ Success! The CGT video has been replaced and integrated to Supabase.`);
  } catch (err) {
    console.error("❌ Error replacing CGT video:", err.message);
  }
}

const newVideoPath = "C:\\Users\\sngan\\Downloads\\CGT (1).mp4";
replaceCGT(newVideoPath);
