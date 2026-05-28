const fs = require('fs');
const path = require('path');

const files = [
  "layanan.html", "appointment.html", "caridokter.html", "berita.html", 
  "kamarinap.html", "pencarian.html", "sop.html", "standar pelayanan.html", 
  "tentangkami.html", "klinik-detail.html",
  "layanan/igd.html", "layanan/laboratorium.html", "layanan/poliklinik.html", 
  "layanan/rawat-inap.html", "caridokter/profil.html"
];

for (const file of files) {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace hero section height
  content = content.replace(/<section class="relative (h-\[\d+px\] md:h-\[\d+px\]|h-\[.*?\]) w-full overflow-hidden flex items-end">/g, '<section class="relative h-[280px] md:h-[360px] w-full overflow-hidden flex items-end">');
  
  // Replace gradient
  content = content.replace(/bg-gradient-to-t from-jakarta-blue\/[0-9]+ via-jakarta-blue\/[0-9]+ to-jakarta-blue\/[0-9]+/g, 'bg-gradient-to-t from-jakarta-blue/90 via-jakarta-blue/50 to-jakarta-blue/20');
  
  // Replace breadcrumb text color to white/70
  content = content.replace(/text-white\/60/g, 'text-white/70');
  
  // Ensure img src is correct based on depth
  const depth = (file.match(/\//g) || []).length;
  const prefix = depth === 1 ? '../' : '';
  content = content.replace(/src="(?:..\/)*assets\/images\/hero\/RS%20Tugu%20Koja.jpg"/g, `src="${prefix}assets/images/hero/RS%20Tugu%20Koja.jpg"`);
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Standardized hero in ${file}`);
}
