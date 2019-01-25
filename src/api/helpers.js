import axios from 'axios'
const ERR_OK = 0
export function get (url) {
  return function (params = {}) {
   return axios.get(url, { params }).then(res => {
     const { errno, data } = res.data
     if (errno === ERR_OK) {
       // then可以链式调用，上一次返回的数据做为下一次then的传入参数 即  getSeller().then（data）中的data就是return data
       return data
     }
   }).catch(e => {
   })
  }
}
