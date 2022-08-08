class LocalCache {
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  getCache(key: string) {
    const val = window.localStorage.getItem(key);
    return val ? JSON.parse(val) : "";
  }

  deleteCache(key: string) {
    window.localStorage.removeItem(key);
  }

  clearCache() {
    window.localStorage.clear();
  }
}

export default new LocalCache();
