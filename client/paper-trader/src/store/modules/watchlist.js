import Vue from 'vue'

export default {
  state: {
    watchlist: {},
  },
  
  getters: {
    displayWatchlist(state) {
      return state.watchlist
    }
  },
  
  mutations: {
    getWatchlist(state, watchList){
      state.watchlist = watchList
    },

    addToWatchlist(state, payload) {
      Vue.set(state.watchlist, payload.symbol, [payload.price, payload.exchange_name])
    },

    removeFromWatchlist(state, payload) {
      Vue.delete(state.watchlist, payload.symbol)
    }
  },
  
  actions: {
    getWatchlist(context, watchList) {
      context.commit('getWatchlist', watchList)
    },

    addToWatchlist(context, payload){
      context.dispatch('stockAlreadyInWatchlist', payload).then( result => {
        if(result===false) {
          context.commit('addToWatchlist', payload)
        }
      })    
    },
    
    stockAlreadyInWatchlist(context, payload) {
      var security_exists = false
      if(Object.keys(context.state.watchlist).includes(payload.symbol)) {
        if(context.state.watchlist[payload.symbol][1] == payload.exchange_name) {
          security_exists = true
        }
      }
      return security_exists
    },

    removeFromWatchlist(context,payload) {
      return context.commit('removeFromWatchlist', payload)
    }
  }
};