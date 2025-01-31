import { Document, Schema, model, Types } from 'mongoose';
import config from '../config';

interface IFAQTranslation {
  [key: string]: string;
}

interface IFAQ extends Document {
  question: IFAQTranslation;
  answer: IFAQTranslation;
  createdAt: Date;
  updatedAt: Date;
}

const FAQSchema = new Schema<IFAQ>({
  question: {
    type: Map,
    of: String,
    required: true,
    validate: {
      validator: (v: Map<string, string>) => v.has(config.app.baseLanguage),
      message: `Base language (${config.app.baseLanguage}) is required`
    }
  },
  answer: {
    type: Map,
    of: String,
    required: true,
    validate: {
      validator: (v: Map<string, string>) => v.has(config.app.baseLanguage),
      message: `Base language (${config.app.baseLanguage}) is required`
    }
  }
}, { timestamps: true });

FAQSchema.methods.getLocalizedContent = function(field: 'question' | 'answer', lang: string): string {
  return this[field].get(lang) || this[field].get(config.app.baseLanguage);
};

export default model<IFAQ>('FAQ', FAQSchema);