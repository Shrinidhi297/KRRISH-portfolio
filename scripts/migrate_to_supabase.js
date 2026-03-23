import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase variables in .env!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const localVideos = [
  {
    path: 'public/assets/videos/cinematic_1.mov',
    title: 'Cinematic Atmosphere',
    year: '2025',
    duration: '2:15 min',
    desc: 'An exploration of moody lighting and deep textures in a cinematic environment.',
    tags: ['Color Grade', 'Cinematography', 'Sound Design'],
    symbol: '◈'
  },
  {
    path: 'public/assets/videos/cgt.mov',
    title: 'CGT Masterclass',
    year: '2025',
    duration: '1:45 min',
    desc: 'High-end motion graphics and visual effects showcasing technical precision.',
    tags: ['VFX', 'Motion Graphics', 'Editing'],
    symbol: '◉',
    overrideVideoUrl: 'https://kizwqxdcdghelwksfbto.supabase.co/storage/v1/object/public/videos/cgt_final.mp4'
  },
  {
    path: 'public/assets/videos/techstore.mov',
    title: 'Techstore Showcase',
    year: '2025',
    duration: '55 sec',
    desc: 'A dynamic commercial for a modern tech retailer with kinetic editing patterns.',
    tags: ['Commercial', 'Fast Cuts', 'Branding'],
    symbol: '◇'
  }
];

async function migrate() {
  console.log("🏁 Starting migration to Supabase Storage...");

  for (const video of localVideos) {
    try {
      let publicUrl = video.overrideVideoUrl;

      if (!publicUrl) {
        if (!fs.existsSync(video.path)) {
          console.warn(`⚠️ Skipping ${video.path} - File not found locally.`);
          continue;
        }

        const fileName = path.basename(video.path);
        const fileBuffer = fs.readFileSync(video.path);

        console.log(`📤 Uploading ${fileName}...`);
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('videos')
          .upload(fileName, fileBuffer, {
            contentType: 'video/quicktime',
            upsert: true
          });

        if (uploadError) throw uploadError;

        const { data: { publicUrl: storageUrl } } = supabase.storage
          .from('videos')
          .getPublicUrl(fileName);
        publicUrl = storageUrl;
      }

      console.log(`📥 Inserting ${video.title} metadata into database...`);
      const { error: dbError } = await supabase
        .from('projects')
        .insert([{
          title: video.title,
          description: video.desc,
          year: video.year,
          duration: video.duration,
          video_url: publicUrl,
          tags: video.tags,
          symbol: video.symbol
        }]);

      if (dbError) throw dbError;
      console.log(`✅ ${video.title} migrated successfully!`);

    } catch (err) {
      console.error(`❌ Failed to migrate ${video.title}:`, err.message);
    }
  }

  console.log("✨ Migration complete! You can now safely delete the public/assets/videos folder.");
}

migrate();
