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

// Axios only allows request body with POST/PUT requests
export function getOwnedStocks(access_token) {
    axios({
      method: 'POST',
      url: `${process.env.VUE_APP_API_URL}/securities/owned`,
      data: {
        'access_token': access_token,
        'token_type': 'bearer'
      }
    }).then(result => {
      store.dispatch('getOwnedStocks', result.data)
    }, error => {
      console.error(error);
    })
  }