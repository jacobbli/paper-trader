import Vue from 'vue'
import axios from "axios";

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
    getOwnedStocks(state, list){
      state.owned = list
    },

    purchaseStock(state, stock) {
      var newStock = {};
      Vue.set(newStock, 'symbol', stock.symbol)
      Vue.set(newStock, 'price', stock.price)
      Vue.set(newStock, 'quantity', 1)
      state.owned.push(newStock)
    },

    updateQuantity(state, payload) {
      state.owned[payload.index].quantity++
    }
  },
  
  actions: {
    getOwnedStocks(context){
      axios({
        method: "GET", 
        url: `${process.env.VUE_APP_API_URL}get-owned-stocks/${process.env.VUE_APP_TEST_USER}`
      }).then(result => {
        context.commit('getOwnedStocks', result.data)
      }, error => {
        console.error(error);
      })
    },

    purchase(context, stock) {
      context.dispatch('stockAlreadyOwned', stock.symbol).then( result => {
        if(result===false) {
          context.commit('purchaseStock', stock)
        } else {
          context.dispatch('findOwnedStock', stock.symbol).then( result => {
            context.commit('updateQuantity', {index: result, quantity: 1})
          })
        }
      })
    },

    stockAlreadyOwned(context, symbol) {
      return context.state.owned.filter( function (item) { return item.symbol == symbol }).length > 0
    },

    findOwnedStock(context, symbol){
      return context.state.owned.findIndex( 
        function (item) { return item.symbol == symbol })
    }
  }
};