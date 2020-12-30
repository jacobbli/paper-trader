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
      Vue.delete(state.watchlist, payload.index)
    }
  },
  
  actions: {
    getWatchlist(context, watchList) {
      context.commit('getWatchlist', watchList)
    },

    addToWatchlist(context, payload){
      context.dispatch('getWatchedSecurityIndex', payload.symbol).then( securityIndex => {
        if (securityIndex===null) {
          context.commit('ADD_WATCHED_SECURITY', payload)
        }
      })    
    },

    removeFromWatchlist(context,payload) {
      context.dispatch('getWatchedSecurityIndex', payload.symbol).then( securityIndex => {
        if (securityIndex!==null) {
          payload['index'] = securityIndex
          context.commit('REMOVE_WATCHED_SECURITY', payload)
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