import { LanguagesKeysType, resources } from '@/services/lang/i18n';

export const languagesOptions = Object.keys(resources).map((languageName) => ({
  value: languageName,
  label: resources[languageName as LanguagesKeysType].translation.language.current,
}));

export default languagesOptions;
