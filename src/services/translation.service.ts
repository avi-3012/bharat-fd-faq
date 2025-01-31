import { v2 } from '@google-cloud/translate';
import config from '../config';
import { readFileSync } from 'fs';

export default {
//   translateText: async (text: string, targetLang: string): Promise<string> => {
//     const translateClient = new v2.Translate({
//         projectId: config.googleCloud.projectId,
//         apiKey: config.googleTranslate.key
//     });
//     if (targetLang === config.app.baseLanguage) return text;
    
//     try {
//       const [translation] = await translateClient.translate(text, targetLang);
//       return translation;
//     } catch (error) {
//       console.error(`Translation failed for ${targetLang}:`, error);
//       return text;
//     }
//   },

  translateContent: async (content: string): Promise<Record<string, string>> => {
    console.log(config.googleTranslate.key);
    const credentials = JSON.parse(
        process.env.CREDENTIALS || 
        readFileSync(config.googleCloud.credentials, 'utf8')
      );
    const translateClient = new v2.Translate({
        // apiKey: "AIzaSyCwE3k7edqTRJPv97F0WaxMrG63s1boVB8",
        credentials: credentials,
        projectId: "faq-api-449515"
    });
    console.log("Working");
    const translations: Record<string, string> = {
      [config.app.baseLanguage]: content
    };

    await Promise.all(config.app.supportedLanguages.map(async (lang) => {
        console.log(lang);
      if (lang !== config.app.baseLanguage) {
        console.log("Translating: ", (await translateClient.translate(content, lang))[0]);
        translations[lang] = (await translateClient.translate(content, lang))[0];
      }
    }));

    return translations;
  }
};