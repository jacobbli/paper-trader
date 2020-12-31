import axios from "axios";
import store from '../store/store.js'


// Axios only allows request body with POST/PUT requests
export function getWatchlist(access_token) {
  axios({
    method: "POST",
    url: `${process.env.VUE_APP_API_URL}/watchlist/watched`,
    data: {
      'access_token': access_token,
      'token_type': 'bearer'
    }
  }).then(result => {
    store.dispatch('getWatchlist', result.data)
  }, error => {
    console.error(error);
  })
}


export function addToWatchlist(token, security, price, exchange){
  axios({
    method: 'POST',
    url: `${process.env.VUE_APP_API_URL}/watchlist/watch`,
    data: {
      'token': token,
      'symbol': security,
      'exchange': exchange
    }
  }).then(() => {
    store.dispatch('addToWatchlist', {symbol: security, price: price, exchange: exchange})
  }, error => {
    console.error(error);
  })
}


export function removeSecurity(token, security, exchange){
  axios({
    method: 'POST',
    url:`${process.env.VUE_APP_API_URL}/watchlist/unwatch`,
    data: {
      'token': token,
      'symbol': security,
      'exchange': exchange
    }
  }).then(() => {
    store.dispatch('removeFromWatchlist', {symbol: security, exchange: exchange})
  }, error => {
    console.error(error);
  })
}