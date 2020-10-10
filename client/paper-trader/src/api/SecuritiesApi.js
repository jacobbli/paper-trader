import axios from "axios";
import store from '../store/store.js'

export function getOwnedStocks() {
  axios({
    method: "GET", 
    url: `${process.env.VUE_APP_API_URL}securities/get-owned-stocks/${process.env.VUE_APP_TEST_USER}`
  }).then(result => {
    store.dispatch('getOwnedStocks', result.data)
  }, error => {
    console.error(error);
  })
}

export function getWatchlist() {
  axios({
    method: "GET", 
    url: `${process.env.VUE_APP_API_URL}securities/get-watchlist/${process.env.VUE_APP_TEST_USER}`
  }).then(result => {
    store.dispatch('getWatchlist', result.data)
  }, error => {
    console.error(error);
  })
}

export function searchForStock(searchQuery){
  axios({
    method: 'GET', 
    url: `${process.env.VUE_APP_API_URL}securities/search/${searchQuery}`
    }).then(result => {
      store.dispatch('getSearchResults', result.data)
  }, error => {
    console.error(error);
  })
}

export function buySecurity(security, price, quantity){
  axios.post(
    `${process.env.VUE_APP_API_URL}securities/buy/${process.env.VUE_APP_TEST_USER}`,
    null,
    { 'params': {
        'symbol': security,
        'buy_quantity': quantity,
        'price': price
      }
    }
  ).then(() => {
    store.dispatch('buy', {symbol: security, price: price, quantity: quantity})  }, error => {
    console.error(error);
  })
}

export function sellSecurity(security, price, sellQuantity){
  axios.post(
    `${process.env.VUE_APP_API_URL}securities/sell/${process.env.VUE_APP_TEST_USER}`,
    null,
    { 'params': {
        'symbol': security,
        'sell_quantity': sellQuantity,
        'price': price
      }
    }
  ).then(() => {
    store.dispatch('sell', {symbol: security, price: price, sell_quantity: sellQuantity})  }, error => {
    console.error(error);
  })
}