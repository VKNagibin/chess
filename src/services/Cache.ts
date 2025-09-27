import { LanguagesKeysType } from '@/services/lang/i18n';

interface ICache {
  figuresAnimations?: boolean;
  language: LanguagesKeysType;
}

class Cache {
  static get(key: string) {
    const value = localStorage.getItem(key);
    if (!value) return value;
    return JSON.parse(value);
  }

  static set<K extends keyof ICache>(key: K, value: ICache[K]): void {
    // const serialized =
    //   (value as unknown) instanceof Date ? Date.toISOString() : JSON.stringify(value);
    localStorage.setItem(key, JSON.stringify(value));
  }

  static clear() {
    localStorage.clear();
  }

  static removeItem(key: string) {
    localStorage.removeItem(key);
  }

  static get length() {
    return localStorage.length;
  }
}

export default Cache;
