const fs = require('fs');
const translate = require('translate-google');

const LANS = ['en', 'es', 'fr', 'ar', 'zh-cn', 'de'];
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function run() {
  console.log('Reading blogPosts.js...');
  const blogContent = fs.readFileSync('src/data/blogPosts.js', 'utf8');
  
  // Extract the array using simple eval (safe since it's our own file)
  const arrayString = blogContent.match(/const blogPosts = (\[[\s\S]+?\]);\s*export default blogPosts;/);
  if (!arrayString) {
    console.error('Could not parse blogPosts.js');
    return;
  }
  
  const blogPosts = eval(arrayString[1]);
  const translations = {};
  
  console.log(`Found ${blogPosts.length} posts. Starting translation...`);
  
  for (let i = 0; i < blogPosts.length; i++) {
    const post = blogPosts[i];
    console.log(`Translating Post ${i+1}/${blogPosts.length}: ${post.id}`);
    translations[post.id] = { tr: post.contentSections };
    
    for (const lang of LANS) {
      console.log(`  -> Translating to ${lang}...`);
      const langSections = [];
      
      try {
        for (const section of post.contentSections) {
          let translatedHeading = "";
          if (section.heading) {
            translatedHeading = await translate(section.heading, { from: 'tr', to: lang });
            await sleep(500); // polite delay
          }
          
          const translatedParagraphs = [];
          for (const para of section.paragraphs) {
            const tPara = await translate(para, { from: 'tr', to: lang });
            translatedParagraphs.push(tPara);
            await sleep(500);
          }
          
          langSections.push({
            heading: translatedHeading,
            paragraphs: translatedParagraphs
          });
        }
        translations[post.id][lang] = langSections;
      } catch (err) {
        console.error(`Error translating to ${lang}:`, err.message);
        // Fallback to original text on error to avoid breaking
        translations[post.id][lang] = post.contentSections;
      }
    }
    
    // Save partial progress
    fs.writeFileSync('src/data/blogTranslations.json', JSON.stringify(translations, null, 2));
  }
  
  console.log('Translation complete! Saved to src/data/blogTranslations.json');
}

run();
