import Vue from 'vue'

export default {
  state: {
    owned: {},
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
      Vue.set(state.owned, payload.symbol, [payload.price, parseInt(payload.quantity), payload.exchange_name])
    },

    removeStock(state, payload) {
      Vue.delete(state.owned, payload.symbol)
    },

    incrementQuantity(state, payload) {
      var newQuantity = state.owned[payload.symbol][1] + parseInt(payload.quantity)
      var totalValue = state.owned[payload.symbol][0]*state.owned[payload.symbol][1] + payload.price*parseInt(payload.quantity)
      var unitValue = totalValue / newQuantity
      Vue.set(state.owned, payload.symbol, [unitValue, newQuantity, payload.exchange_name])
    },

    decrementQuantity(state, payload) {
      Vue.set(state.owned, payload.symbol, [payload.price, payload.new_quantity, payload.exchange_name])
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
      var originalQuantity = context.state.owned[payload.symbol][1]
      var newQuantity = originalQuantity - payload.sell_quantity
      if(newQuantity == 0) {
        context.commit('removeStock', payload)
      } else {
        payload = {
          'symbol': payload.symbol,
          'new_quantity': newQuantity,
          'price': payload.price,
          'exchange_name': payload.exchange_name
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