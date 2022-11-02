import CONFIG from '../globals/config';

const CacheHelper = {
  async cachingAppShell(requests) {
    const cache = await this.__openCache();
    cache.addAll(requests);
  },

  async deleteOldCache() {
    const cacheNames = await caches.keys();
    cacheNames
      .filter((name) => name !== CONFIG.CACHE_NAME)
      .map((filteredName) => caches.delete(filteredName));
  },

  async revalidateCache(request) {
    const response = await caches.match(request);

    if (response) {
      this.__fetchRequest(request);
      return response;
    }
    return this.__fetchRequest(request);
  },

  async __openCache() {
    return caches.open(CONFIG.CACHE_NAME);
  },

  async __fetchRequest(request) {
    const response = await fetch(request);

    if (!response || response.status !== 200) {
      return response;
    }

    await this.__addCache(request);
    return response;
  },

  async __addCache(request) {
    const cache = await this.__openCache();
    cache.add(request);
  },

};

export default CacheHelper;
