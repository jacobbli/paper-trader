import axios from "axios";
import store from '../store/store.js'


export function getWatchlist() {
  axios({
    method: "GET", 
    url: `${process.env.VUE_APP_API_URL}/watchlist/get/${process.env.VUE_APP_TEST_USER}`
  }).then(result => {
    store.dispatch('getWatchlist', result.data)
  }, error => {
    console.error(error);
  })
}


export function addToWatchlist(security, price, exchangeName){
  axios.post(
    `${process.env.VUE_APP_API_URL}/watchlist/add/${process.env.VUE_APP_TEST_USER}`,
    null,
    { 'params': {
        'symbol': security,
        'exchange_name': exchangeName
      }
    }
  ).then(() => {
    store.dispatch('addToWatchlist', {symbol: security, price: price, exchange_name: exchangeName})  }, error => {
    console.error(error);
  })
}


export function removeSecurity(security, exchangeName){
  axios.post(
    `${process.env.VUE_APP_API_URL}/watchlist/delete/${process.env.VUE_APP_TEST_USER}`,
    null,
    { 'params': {
        'symbol': security,
        'exchange_name': exchangeName
      }
    }
  ).then(() => {
    store.dispatch('removeFromWatchlist', {symbol: security, exchange_name: exchangeName})  }, error => {
    console.error(error);
  })
}