const fs = require('fs');
const translate = require('translate-google');

const LANS = ['en', 'es', 'fr', 'ar', 'zh-cn', 'de'];

async function run() {
  console.log('Reading blogPosts.js...');
  const blogContent = fs.readFileSync('src/data/blogPosts.js', 'utf8');
  
  const arrayString = blogContent.match(/const blogPosts = (\[[\s\S]+?\]);\s*export default blogPosts;/);
  if (!arrayString) {
    console.error('Could not parse blogPosts.js');
    return;
  }
  
  const blogPosts = eval(arrayString[1]);
  const translations = {};
  
  console.log(`Found ${blogPosts.length} posts. Starting fast translation...`);
  
  for (let i = 0; i < blogPosts.length; i++) {
    const post = blogPosts[i];
    console.log(`Translating Post ${i+1}/${blogPosts.length}: ${post.id}`);
    translations[post.id] = { tr: post.contentSections };
    
    // Collect all unique strings for this post
    const stringsToTranslate = [];
    post.contentSections.forEach(section => {
      stringsToTranslate.push(section.heading || " ");
      section.paragraphs.forEach(para => stringsToTranslate.push(para || " "));
    });
    
    for (const lang of LANS) {
      console.log(`  -> Translating to ${lang}...`);
      try {
        const translatedStrings = await translate(stringsToTranslate, { from: 'tr', to: lang });
        
        let pointer = 0;
        const langSections = [];
        
        for (const section of post.contentSections) {
          const tHeading = translatedStrings[pointer++];
          const tParas = [];
          for (const para of section.paragraphs) {
            tParas.push(translatedStrings[pointer++]);
          }
          langSections.push({
            heading: tHeading.trim() === "" ? "" : tHeading,
            paragraphs: tParas
          });
        }
        
        translations[post.id][lang] = langSections;
      } catch (err) {
        console.error(`Error translating to ${lang}:`, err.message);
        translations[post.id][lang] = post.contentSections; // fallback
      }
    }
    
    // Save progress
    fs.writeFileSync('src/data/blogTranslations.json', JSON.stringify(translations, null, 2));
  }
  
  console.log('Fast translation complete! Saved to src/data/blogTranslations.json');
}

run();
