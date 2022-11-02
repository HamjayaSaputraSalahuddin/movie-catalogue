const CacheHelper = {
  async cachingAppShell(requests) {
    const cache = await this.__openCache();
    cache.addAll(requests);
  },

  async deleteOldCache() {

  },

  async revalidateCache(request) {

  },

  async __openCache() {
    return caches.open('MovieCatalogue-V1');
  },

};

export default CacheHelper;
