import axios from "axios";
import store from '../store/store.js'


export function getWatchlist() {
  axios({
    method: 'GET',
    url: `${process.env.VUE_APP_API_URL}/watchlists/watched-securities`,
    headers: {
      'Authorization': `Bearer ${store.getters.getAccessToken}`
    }
  }).then(result => {
    store.dispatch('getWatchlist', result.data)
  }, error => {
    console.error(error);
  })
}


export function addToWatchlist(security, price, exchange){
  axios({
    method: 'POST',
    url: `${process.env.VUE_APP_API_URL}/watchlists/watched-securities`,
    headers: {
      'Authorization': `Bearer ${store.getters.getAccessToken}`
    },
    data: {
      'symbol': security,
      'exchange': exchange
    }
  }).then(() => {
    store.dispatch('addToWatchlist', {symbol: security, price: price, exchange: exchange})
  }, error => {
    console.error(error);
  })
}


export function removeFromWatchlist(security, exchange){
  axios({
    method: 'DELETE',
    url:`${process.env.VUE_APP_API_URL}/watchlists/watched-securities`,
    headers: {
      'Authorization': `Bearer ${store.getters.getAccessToken}`
    },
    data: {
      'symbol': security,
      'exchange': exchange
    }
  }).then(() => {
    store.dispatch('removeFromWatchlist', {symbol: security, exchange: exchange})
  }, error => {
    console.error(error);
  })
}