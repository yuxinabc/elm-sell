import storage from 'good-storage'
export function setToLocal (key, val) {
  storage.set(key, val)
}
export function getFromToLocal (key, val) {
  // get函数 需要 return
  return storage.get(key, val)
}
