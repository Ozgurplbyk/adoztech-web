const fs = require('fs');
const path = require('path');
const translate = require('translate-google');

const localesDir = path.join(__dirname, 'src', 'i18n', 'locales');
const enData = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'));

const blogpostsEn = enData.blogposts;
const targetLocales = ['es', 'fr', 'zh', 'ar', 'de'];

const googleLangs = {
  es: 'es',
  fr: 'fr',
  zh: 'zh-cn',
  ar: 'ar',
  de: 'de'
};

async function run() {
  console.log('Starting translations for locales...');
  
  for (const loc of targetLocales) {
    const localePath = path.join(localesDir, `${loc}.json`);
    let localeData = JSON.parse(fs.readFileSync(localePath, 'utf8'));
    
    const translatedObj = {};
    const glang = googleLangs[loc];
    console.log(`Translating for ${loc}...`);
    
    // Process all values at once using array
    const keys = Object.keys(blogpostsEn);
    const values = Object.values(blogpostsEn);
    
    try {
      const translatedValues = await translate(values, { from: 'en', to: glang });
      for (let i = 0; i < keys.length; i++) {
        translatedObj[keys[i]] = translatedValues[i];
      }
    } catch (err) {
      console.error(`Error translating for ${loc}:`, err);
      // Fallback
      for (let i = 0; i < keys.length; i++) {
        translatedObj[keys[i]] = values[i];
      }
    }
    
    localeData.blogposts = translatedObj;
    fs.writeFileSync(localePath, JSON.stringify(localeData, null, 2) + '\n');
    console.log(`✅ Fixed translations for ${loc}.json`);
  }
}

run().catch(console.error);
