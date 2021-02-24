import Vue from 'vue'

export default {
  state: {
    ownedSecurities: [],
  },

  getters: {
      getOwnedSecurities(state) {
          return state.ownedSecurities
      }
  },

  mutations: {
    SET_OWNED_SECURITIES(state, stockList){
      state.ownedSecurities = stockList
    },

    ADD_OWNED_SECURITY(state, payload) {
      state.ownedSecurities.push({
        'symbol': payload.symbol,
        'price': payload.price,
        'quantity': payload.quantity,
        'exchange': payload.exchange
      })
    },

    REMOVE_OWNED_SECURITY(state, payload) {
      Vue.delete(state.ownedSecurities, payload)
    },

    SET_QUANTITY(state, payload) {
      Vue.set(state.ownedSecurities[payload.index], 'quantity', payload.quantity)
    },

    UPDATE_PRICE(state, payload) {
      Vue.set(state.ownedSecurities[payload.index], 'price', payload.price)
    },

    DECREMENT_QUANTITY(state, payload) {
      Vue.set(state.ownedSecurities[payload.index], 'quantity', payload.quantity)
    }
  },

  actions: {
    getOwnedStocks(context, stockList){
      context.commit('SET_OWNED_SECURITIES', stockList)
    },

    addOwnedSecurity(context, orderForm) {
      context.dispatch('getOwnedSecurityIndex', orderForm.get('symbol')).then( securityIndex => {
        if(securityIndex===null) {
          const payload = {
            'symbol': orderForm.get('symbol'),
            'price': parseFloat(orderForm.get('price')),
            'quantity': parseInt(orderForm.get('quantity')),
            'exchange': orderForm.get('exchange')
          }
          context.commit('ADD_OWNED_SECURITY', payload)
        } else {
          const newQuantity = context.state.ownedSecurities[securityIndex]['quantity'] + parseInt(orderForm.get('quantity'))
          context.dispatch('updateFunds', orderForm.get('quantity') * orderForm.get('price'))

          const payload = {
            'index': securityIndex,
            'quantity': newQuantity,
          }
          context.commit('SET_QUANTITY', payload)
        }
      })
    },

    removeOwnedSecurity(context, orderForm) {
      context.dispatch('getOwnedSecurityIndex', orderForm.get('symbol')).then( securityIndex => {
        const newQuantity = context.state.ownedSecurities[securityIndex]['quantity'] - orderForm.get('quantity')

        if(newQuantity == 0) {
          context.commit('REMOVE_OWNED_SECURITY', securityIndex)
        } else {
          const payload = {
            'index': securityIndex,
            'quantity': newQuantity,
          }
          context.commit('SET_QUANTITY', payload)
        }
      })
    },

    getOwnedSecurityIndex(context, symbol) {
      var securityIndex = null
      context.state.ownedSecurities.forEach((item, index) => {
        if(Object.values(item).includes(symbol)) {
          securityIndex = index
        }
      })
      return securityIndex
    }
  }
};