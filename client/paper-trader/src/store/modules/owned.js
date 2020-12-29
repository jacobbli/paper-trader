import Vue from 'vue'

export default {
  state: {
    owned: [],
  },
  
  getters: {
      getOwnedSecurities(state) {
          return state.owned
      }
  },
  
  mutations: {
    SET_OWNED_SECURITIES(state, stockList){
      state.owned = stockList
    },

    ADD_OWNED_SECURITY(state, payload) {
      state.owned.push({
        'symbol': payload.symbol,
        'avg_price': payload.price,
        'quantity': parseInt(payload.quantity),
        'exchange': payload.exchange
      })
    },

    REMOVE_OWNED_SECURITY(state, payload) {
      Vue.delete(state.owned, payload)
    },

    INCREMENT_QUANTITY(state, payload) {
      Vue.set(state.owned[payload.index], 'quantity', payload.quantity)
    },

    UPDATE_PRICE(state, payload) {
      Vue.set(state.owned[payload.index], 'avg_price', payload.price)
    },

    DECREMENT_QUANTITY(state, payload) {
      Vue.set(state.owned[payload.index], 'quantity', payload.quantity)
    }
  },
  
  actions: {
    getOwnedStocks(context, stockList){
      context.commit('SET_OWNED_SECURITIES', stockList)
    },

    buySecurity(context, payload) {
      context.dispatch('getOwnedSecurityIndex', payload.symbol).then( securityIndex => {
        if(securityIndex===null) {
          context.commit('ADD_OWNED_SECURITY', payload)
        } else {
          const newQuantity = context.state.owned[securityIndex]['quantity'] + parseInt(payload.quantity)
          const totalValue = context.state.owned[securityIndex]['avg_price']*context.state.owned[securityIndex]['quantity'] + payload.price*parseInt(payload.quantity)
          const avgPrice = totalValue / newQuantity

          payload = {
            'index': securityIndex,
            'quantity': newQuantity,
            'price': avgPrice
          }
          context.commit('INCREMENT_QUANTITY', payload)
          context.commit('UPDATE_PRICE', payload)
        }
      })
    },

    sellSecurity(context, payload) {
      context.dispatch('getOwnedSecurityIndex', payload.symbol).then( securityIndex => {
        var originalQuantity = context.state.owned[securityIndex]['quantity']
        var newQuantity = originalQuantity - payload.sellQuantity
        if(newQuantity == 0) {
          context.commit('REMOVE_OWNED_SECURITY', securityIndex)
        } else {
          payload = {
            'index': securityIndex,
            'quantity': newQuantity,
          }
          context.commit('DECREMENT_QUANTITY', payload)
        }
      })
    },

    getOwnedSecurityIndex(context, symbol) {
      var securityIndex = null
      context.state.owned.forEach( (item, index) => {
        if(Object.values(item).includes(symbol)) {
          securityIndex = index
        }
      })
      return securityIndex
    }
  }
};