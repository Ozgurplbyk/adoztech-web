const fs = require('fs');
const path = require('path');
const translate = require('translate-google');

const localesDir = path.join(__dirname, 'src', 'i18n', 'locales');
const enData = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'));

const exceptions = ['Adoztech', 'GlukoMate'];
const targetLocales = ['es', 'fr', 'zh', 'ar', 'de'];
const googleLangs = {
  es: 'es',
  fr: 'fr',
  zh: 'zh-cn',
  ar: 'ar',
  de: 'de'
};

async function deepTranslate(obj, glang) {
  if (typeof obj === 'string') {
    if (exceptions.includes(obj) || obj.includes('{{')) return obj; 
    try {
      return await translate(obj, { from: 'en', to: glang });
    } catch {
      return obj; // fallback
    }
  } else if (Array.isArray(obj)) {
    const res = [];
    for (const item of obj) {
      res.push(await deepTranslate(item, glang));
    }
    return res;
  } else if (typeof obj === 'object' && obj !== null) {
    const res = {};
    const keys = Object.keys(obj);
    
    const stringKeys = [];
    const stringValues = [];
    
    for (const k of keys) {
      const val = obj[k];
      if (typeof val === 'string' && !exceptions.includes(val) && !val.includes('{{') && !val.includes('<')) {
        stringKeys.push(k);
        stringValues.push(val);
      } else {
        res[k] = await deepTranslate(val, glang);
      }
    }
    
    if (stringValues.length > 0) {
      try {
         const transVals = await translate(stringValues, { from: 'en', to: glang });
         // Handle if translate-google returns single string when array length is 1
         const tArray = Array.isArray(transVals) ? transVals : [transVals];
         for (let i = 0; i < stringKeys.length; i++) {
           res[stringKeys[i]] = tArray[i];
         }
      } catch (err) {
         console.warn("Translation partial failure, falling back to English.");
         for (let i = 0; i < stringKeys.length; i++) {
           res[stringKeys[i]] = stringValues[i];
         }
      }
    }
    
    // add exceptions and html tags back
    for (const k of keys) {
      const val = obj[k];
      if (typeof val === 'string' && (exceptions.includes(val) || val.includes('{{') || val.includes('<'))) {
        res[k] = val;
      }
    }
    
    return res;
  }
  return obj;
}

async function run() {
  console.log('Initiating deep translation for all UI strings...');
  for (const loc of targetLocales) {
    console.log(`Deep translating: ${loc}...`);
    const translated = await deepTranslate(enData, googleLangs[loc]);
    const localePath = path.join(localesDir, `${loc}.json`);
    fs.writeFileSync(localePath, JSON.stringify(translated, null, 2) + '\n');
    console.log(`✅ Fully translated ${loc}.json`);
  }
}

run().catch(console.error);
