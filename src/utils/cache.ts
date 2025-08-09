/**
 * 缓存工具适配器
 * 兼容 vue3-ts-cms13 的 localCache 接口
 */

class LocalCache {
  setCache(key: string, value: any) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('设置缓存失败:', error)
    }
  }

  getCache(key: string) {
    try {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : null
    } catch (error) {
      console.error('获取缓存失败:', error)
      return null
    }
  }

  deleteCache(key: string) {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('删除缓存失败:', error)
    }
  }

  clearCache() {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('清空缓存失败:', error)
    }
  }
}

const localCache = new LocalCache()

export default localCache
