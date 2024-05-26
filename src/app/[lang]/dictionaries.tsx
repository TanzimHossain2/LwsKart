import 'server-only'
import type { Locale } from '@/i18n.config'
import type { Dictionary } from '@/interfaces/lang';

const dictionaries: { [key: string]: () => Promise<Dictionary> } = {
        en: () => import('./dictionaries/en.json').then((module) => module.default as unknown as Dictionary),
        bn: () => import('./dictionaries/bn.json').then((module) => module.default as unknown as Dictionary),
    };

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
        return dictionaries[locale]();
};
