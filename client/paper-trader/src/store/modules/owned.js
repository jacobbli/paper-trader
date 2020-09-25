import Vue from 'vue'

export default {
  state: {
    owned: [],
  },
  
  getters: {
      displayOwnedStocks(state) {
          return state.owned
      }
  },
  
  mutations: {
    getOwnedStocks(state, stockList){
      state.owned = stockList
    },

    addStock(state, payload) {
      var newStock = {};
      Vue.set(newStock, 'symbol', payload.stock.symbol)
      Vue.set(newStock, 'price', payload.stock.price)
      Vue.set(newStock, 'quantity', parseInt(payload.quantity))
      state.owned.push(newStock)
    },

    removeStock(state, stock) {
      var newList = state.owned.filter( item => item.symbol !== stock.symbol)
      state.owned = newList
    },

    incrementQuantity(state, payload) {
      payload.stock.quantity += parseInt(payload.quantity)
    },

    decrementQuantity(state, stock) {
      stock.quantity--
    }
  },
  
  actions: {
    getOwnedStocks(context, stockList){
      context.commit('getOwnedStocks', stockList)
    },

    buy(context, payload) {
      context.dispatch('stockAlreadyOwned', payload.stock.symbol).then( result => {
        if(result===false) {
          context.commit('addStock', payload)
        } else {
          context.dispatch('findOwnedStock', payload.stock.symbol).then( result => {
            context.commit('incrementQuantity', {stock: result, quantity: payload.quantity})
          })
        }
      })
    },

    stockAlreadyOwned(context, symbol) {
      return context.state.owned.filter( function (item) { return item.symbol == symbol }).length > 0
    },

    findOwnedStock(context, symbol){
      return context.state.owned.find( 
        function (item) { return item.symbol == symbol })
    },

    sell(context, stock) {
      if(stock.quantity <= 1) {
        context.commit('removeStock', stock)
      } else {
        context.commit('decrementQuantity', stock)
      }
      

    }
  }
};