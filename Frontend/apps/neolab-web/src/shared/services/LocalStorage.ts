export class LocalStorageService<T> {
  constructor(private readonly key: string) {}

  get(): T | null {
    const value = localStorage.getItem(this.key);

    if (value === null || value === 'undefined') {
      return null;
    }

    try {
      return JSON.parse(value) as T;
    } catch (e) {
      console.error('Ошибка при парсинге JSON из LocalStorage:', e);
      return null;
    }
  }

  save(value: T) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  destroy() {
    localStorage.removeItem(this.key);
  }

  hasValue() {
    return Boolean(this.get());
  }
}
