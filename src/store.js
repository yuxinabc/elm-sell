import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  // 存储数据对象
  state: {
    foods: [], // 存所有商品对象
    allPrice: 0, // 存所有商品价格
    allCount: 0, // 存所有商品数量
    countList: [], // 存侧边栏每一类的商品数量
    itemCountList: [] // 存右边栏每一行商品的数量
  },
  // 操作数据接口，可以定义多个方法
  mutations: {
    addFoods (state, food) {
      let item = state.foods.find(item => {
        return (item.name === food.name && item.foodTypeName === food.foodTypeName)
      })
      if (item) {
        item.count++
      } else {
        food.count = 1
        state.foods.push(food)
      }
    },
    deleteFood (state, food) {
      let item = state.foods.find(item => {
        return (item.name === food.name && item.foodTypeName === food.foodTypeName)
      })
      if (item.count > 0) {
        item.count--
      } else {
        state.foods.splice(state.foods.findIndex(item => {
          return (item.name === food.name && item.foodTypeName === food.foodTypeName)
        }))
      }
    },
    changePriceAndCount (state) {
      state.allPrice = 0
      state.allCount = 0
      state.foods.forEach(item => {
        state.allPrice += Number(item.price) * item.count
        state.allCount += item.count
      })
    },
    // 对左侧边栏分类的数量操作
    addItemCount (state, food) {
      let key = food.foodTypeName
      let item = state.countList.find(item => {
        return item[key]
      })
      if (item) {
        item[key]++
      } else {
        let item = {}
        item[key] = parseInt(food.count)
        state.countList.push(item)
      }
    },
    delItemCount (state, food) {
      let key = food.foodTypeName
      let item = state.countList.find(item => {
        return item[key]
      })
      if (item) {
        item[key]--
      }
    },
    // 对右侧边栏分类的数量操作
    addFoodItemCount(state, food) {
      let key = food.foodTypeName + food.name
      let item = state.itemCountList.find(item => {
        return item[key]
      })
      if (item) {
        item[key]++
      } else {
        let item = {}
        item[key] = parseInt(food.count)
        state.itemCountList.push(item)
      }
    },
    delFoodItemCount (state, food) {
      let key = food.foodTypeName + food.name
      let item = state.itemCountList.find(item => {
        return item[key]
      })
      if (item) {
        item[key]--
      }
    }
  },
  // 计算属性
  getters: {
    getCount (state) {
      return state.allCount
    },
    getItemCount: (state) => (key) => {
      let item = state.countList.find(item => {
        return item[key]
      })
      if (item) {
        return item[key]
      } else {
        return 0
      }
    },
    getFoodItemCount: (state) => (key) => {
      let item = state.itemCountList.find(item => {
        return item[key]
      })
      if (item) {
        return item[key]
      } else {
        return 0
      }
    },
    getAllPrice (state) {
      return state.allPrice
    },
    getAllFoods (state) {
      return state.foods
    }
  }

})
