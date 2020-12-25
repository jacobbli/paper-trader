import axios from "axios";
import store from '../store/store.js'


export function addToWatchlist(token, security, price, exchangeName){
  axios({
    method: 'POST',
    url: `${process.env.VUE_APP_API_URL}/watchlist/watch`,
    data: {
      'token': token,
      'symbol': security,
      'exchange': exchangeName
    }
  }).then(() => {
    store.dispatch('addToWatchlist', {symbol: security, price: price, exchange_name: exchangeName})  }, error => {
    console.error(error);
  })
}


export function removeSecurity(token, security, exchangeName){
  axios({
    method: 'POST',
    url:`${process.env.VUE_APP_API_URL}/watchlist/unwatch`,
    data: {
      'token': token,
      'symbol': security,
      'exchange': exchangeName
    }
  }).then(() => {
    store.dispatch('removeFromWatchlist', {symbol: security, exchange_name: exchangeName})  }, error => {
    console.error(error);
  })
}