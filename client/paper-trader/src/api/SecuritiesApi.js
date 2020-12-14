import axios from "axios";
import store from '../store/store.js'

export function getOwnedStocks() {
  axios({
    method: "GET", 
    url: `${process.env.VUE_APP_API_URL}securities/get/${process.env.VUE_APP_TEST_USER}`
  }).then(result => {
    store.dispatch('getOwnedStocks', result.data)
  }, error => {
    console.error(error);
  })
}

export function getWatchlist() {
  axios({
    method: "GET", 
    url: `${process.env.VUE_APP_API_URL}watchlist/get/${process.env.VUE_APP_TEST_USER}`
  }).then(result => {
    store.dispatch('getWatchlist', result.data)
  }, error => {
    console.error(error);
  })
}

export function searchForStock(searchQuery){
  axios({
    method: 'GET', 
    url: `${process.env.VUE_APP_API_URL}securities/search`,
    params: {q: searchQuery}
    }).then(result => {
      store.dispatch('getSearchResults', result.data)
  }, error => {
    console.error(error);
  })
}

export function buySecurity(security, price, quantity, exchangeName){
  axios.post(
    `${process.env.VUE_APP_API_URL}securities/buy/${process.env.VUE_APP_TEST_USER}`,
    null,
    { 'params': {
        'symbol': security,
        'buy_quantity': quantity,
        'price': price,
        'exchange_name': exchangeName
      }
    }
  ).then(() => {
    store.dispatch('buy', {symbol: security, price: price, quantity: quantity, exchange_name: exchangeName})  }, error => {
    console.error(error);
  })
}

export function sellSecurity(security, price, sellQuantity, exchangeName){
  axios.post(
    `${process.env.VUE_APP_API_URL}securities/sell/${process.env.VUE_APP_TEST_USER}`,
    null,
    { 'params': {
        'symbol': security,
        'sell_quantity': sellQuantity,
        'price': price,
        'exchange_name': exchangeName
      }
    }
  ).then(() => {
    store.dispatch('sell', {symbol: security, price: price, sell_quantity: sellQuantity, exchange_name: exchangeName})  }, error => {
    console.error(error);
  })
}

export function addToWatchlist(security, price, sellQuantity, exchangeName){
  axios.post(
    `${process.env.VUE_APP_API_URL}securities/sell/${process.env.VUE_APP_TEST_USER}`,
    null,
    { 'params': {
        'symbol': security,
        'sell_quantity': sellQuantity,
        'price': price,
        'exchange_name': exchangeName
      }
    }
  ).then(() => {
    store.dispatch('sell', {symbol: security, price: price, sell_quantity: sellQuantity, exchange_name: exchangeName})  }, error => {
    console.error(error);
  })
}