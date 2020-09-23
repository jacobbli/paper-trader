import Vue from 'vue'
import axios from "axios";

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
    getWatchlist(state, list){
      state.watchlist = list
    },

    addToWatchlist(state, stock) {
      var newStock = {};
      Vue.set(newStock, 'symbol', stock.symbol)
      Vue.set(newStock, 'price', stock.price)
      state.watchlist.push(newStock)
    },

    removeFromWatchlist(state, stock) {
      // state.watchlist.pop(stock)
      var newList = state.watchlist.filter( item => item.symbol !== stock.symbol)
      state.watchlist = newList
    }
  },
  
  actions: {
    getWatchlist(context){
      axios({
        method: "GET", 
        url: `${process.env.VUE_APP_API_URL}get-watchlist/${process.env.VUE_APP_TEST_USER}`
      }).then(result => {
        context.commit('getWatchlist', result.data)
      }, error => {
        console.error(error);
      })
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