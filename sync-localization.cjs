const fs = require('fs');
const path = require('path');
const translate = require('translate-google');

const localesDir = path.join(__dirname, 'src', 'i18n', 'locales');
const enData = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'));

// Keys to sync
const metinData = enData.metinduzdag;
const p7Data = {
  title: enData.projects.p7Title,
  desc: enData.projects.p7Desc,
  cat: enData.projects.p7Category
};

const targetLocales = ['ar', 'de', 'es', 'fr', 'zh'];
const googleLangs = {
  ar: 'ar',
  de: 'de',
  es: 'es',
  fr: 'fr',
  zh: 'zh-cn'
};

async function translateObj(obj, to) {
  const result = {};
  const entries = Object.entries(obj);
  
  for (const [key, value] of entries) {
    if (typeof value === 'string') {
      try {
        result[key] = await translate(value, { from: 'en', to: to });
      } catch (e) {
        result[key] = value; // Fallback to EN
      }
    } else if (Array.isArray(value)) {
      result[key] = await Promise.all(value.map(v => translate(v, { from: 'en', to: to })));
    } else if (typeof value === 'object' && value !== null) {
      result[key] = await translateObj(value, to);
    } else {
      result[key] = value;
    }
  }
  return result;
}

async function run() {
  console.log('Starting full localization sync...');
  
  for (const loc of targetLocales) {
    console.log(`Processing ${loc}...`);
    const localePath = path.join(localesDir, `${loc}.json`);
    let localeData = JSON.parse(fs.readFileSync(localePath, 'utf8'));
    
    // 1. Sync Metin Düzdağ section
    localeData.metinduzdag = await translateObj(metinData, googleLangs[loc]);
    
    // 2. Sync Project 7 keys
    if (!localeData.projects) localeData.projects = {};
    localeData.projects.p7Title = await translate(p7Data.title, { from: 'en', to: googleLangs[loc] });
    localeData.projects.p7Desc = await translate(p7Data.desc, { from: 'en', to: googleLangs[loc] });
    localeData.projects.p7Category = await translate(p7Data.cat, { from: 'en', to: googleLangs[loc] });
    
    // 3. Sync Contact Phone Placeholder
    if (localeData.contact) {
      localeData.contact.phonePlaceholder = enData.contact.phonePlaceholder;
    }

    // 4. Ensure other basic keys are present (merged from EN)
    // Simple deep merge (one level)
    for (const section in enData) {
      if (!localeData[section]) {
        localeData[section] = enData[section];
      }
    }
    
    fs.writeFileSync(localePath, JSON.stringify(localeData, null, 2) + '\n');
    console.log(`✅ ${loc}.json updated.`);
  }
}

run().catch(console.error);
