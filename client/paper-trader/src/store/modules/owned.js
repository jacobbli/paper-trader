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
      Vue.set(state.owned, payload.symbol, [parseInt(payload.quantity), payload.price])
    },

    removeStock(state, payload) {
      Vue.delete(state.owned, payload.symbol)
    },

    incrementQuantity(state, payload) {
      var newQuantity = state.owned[payload.symbol][0] += parseInt(payload.quantity)
      Vue.set(state.owned, payload.symbol, [newQuantity, payload.price])
    },

    decrementQuantity(state, payload) {
      Vue.set(state.owned, payload.symbol, [payload.new_quantity, payload.price])
    }
  },
  
  actions: {
    getOwnedStocks(context, stockList){
      context.commit('getOwnedStocks', stockList)
    },

    buy(context, payload) {
      context.dispatch('stockAlreadyOwned', payload.symbol).then( result => {
        if(result===false) {
          context.commit('addStock', payload)
        } else {
          context.commit('incrementQuantity', payload)
        }
      })
    },

    sell(context, payload) {
      var originalQuantity = context.state.owned[payload.symbol][0]
      var newQuantity = originalQuantity - payload.sell_quantity

      if(newQuantity == 0) {
        context.commit('removeStock', payload)
      } else {
        payload = {
          'symbol': payload.symbol,
          'new_quantity': newQuantity,
          'price': payload.price
        }
        context.commit('decrementQuantity', payload)
      }
    },

    stockAlreadyOwned(context, symbol) {
      var security_exists = false
      if(Object.keys(context.state.owned).includes(symbol)) {
        security_exists = true
      }
      return security_exists
    }
  }
};