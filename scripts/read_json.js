import fs from 'fs';
const data = JSON.parse(fs.readFileSync('projects_list.json', 'utf8'));
data.forEach(p => {
  console.log(`[ID] ${p.id} [TITLE] ${p.title} [URL] ${p.video_url}`);
});
