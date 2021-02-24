import Vue from 'vue'

export default {
  state: {
    watchlist: [],
  },
  
  getters: {
    getWatchlist(state) {
      return state.watchlist
    },
  },
  
  mutations: {
    getWatchlist(state, watchList){
      state.watchlist = watchList
    },

    ADD_WATCHED_SECURITY(state, payload) {
      state.watchlist.push({
        'symbol': payload.symbol,
        'price': payload.price,
        'exchange': payload.exchange
      })
    },

    REMOVE_WATCHED_SECURITY(state, payload) {
      Vue.delete(state.watchlist, payload)
    }
  },
  
  actions: {
    getWatchlist(context, watchList) {
      context.commit('getWatchlist', watchList)
    },

    addToWatchlist(context, orderForm){
      context.dispatch('getWatchedSecurityIndex', orderForm.get('symbol')).then( securityIndex => {
        if (securityIndex===null) {
          const payload = {
            'symbol': orderForm.get('symbol'),
            'price': parseFloat(orderForm.get('price')),
            'exchange': orderForm.get('exchange')
          }
          context.commit('ADD_WATCHED_SECURITY', payload)
        }
      })    
    },

    removeFromWatchlist(context,orderForm) {
      context.dispatch('getWatchedSecurityIndex', orderForm.get('symbol')).then( securityIndex => {
        if (securityIndex!==null) {
          context.commit('REMOVE_WATCHED_SECURITY', securityIndex)
        }
      })
    },

    getWatchedSecurityIndex(context, symbol) {
      var securityIndex = null
      context.state.watchlist.forEach( (item, index) => {
        if(Object.values(item).includes(symbol)) {
          securityIndex = index
        }
      })
      return securityIndex
    }
  }
};