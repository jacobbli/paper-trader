import Vue from 'vue'

export default {
  state: {
    watchlist: [],
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

    addToWatchlist(state, stock) {
      var newStock = {};
      Vue.set(newStock, 'symbol', stock.symbol)
      Vue.set(newStock, 'price', stock.price)
      state.watchlist.push(newStock)
    },

    removeFromWatchlist(state, stock) {
      var newList = state.watchlist.filter( item => item.symbol !== stock.symbol)
      state.watchlist = newList
    }
  },
  
  actions: {
    getWatchlist(context, watchList){
      context.commit('getWatchlist', watchList)
    },

    addToWatchlist(context, stock){
      context.dispatch('stockAlreadyInWatchlist', stock.symbol).then( result => {
        if(result===false) {
          context.commit('addToWatchlist', stock)
        }
      })    
    },
    
    stockAlreadyInWatchlist(context, symbol) {
      return context.state.watchlist.filter( function (item) { return item.symbol == symbol }).length > 0
    },

    removeFromWatchlist(context,stock) {
      return context.commit('removeFromWatchlist', stock)
    }
  }
};