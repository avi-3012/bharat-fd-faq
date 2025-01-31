import { v2 } from '@google-cloud/translate';
import config from '../config';
import { readFileSync } from 'fs';

export default {
  translateContent: async (content: string): Promise<Record<string, string>> => {
    const credentials = JSON.parse(
        readFileSync(config.googleCloud.credentials, 'utf8')
      );
    const translateClient = new v2.Translate({
        credentials: credentials,
        projectId: "faq-api-449515"
    });
    const translations: Record<string, string> = {
      [config.app.baseLanguage]: content
    };

    await Promise.all(config.app.supportedLanguages.map(async (lang) => {
        console.log(lang);
      if (lang !== config.app.baseLanguage) {
        translations[lang] = (await translateClient.translate(content, lang))[0];
      }
    }));

    return translations;
  }
};