import axios from "axios";
import store from '../store/store.js'
import { logout } from '../api/UsersApi.js'


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
    if (error.response.status == 401) {
      logout()
    }
  })
}


export function addToWatchlist(orderForm){
  axios({
    method: 'POST',
    url: `${process.env.VUE_APP_API_URL}/watchlists/watched-securities`,
    headers: {
      'Authorization': `Bearer ${store.getters.getAccessToken}`
    },
    data: {
      'symbol': orderForm.get('symbol'),
      'exchange': orderForm.get('exchange')
    }
  }).then(() => {
    store.dispatch('addToWatchlist', orderForm)
  }, error => {
    console.error(error);
    if (error.response.status == 401) {
      logout()
    }
  })
}


export function removeFromWatchlist(orderForm){
  axios({
    method: 'DELETE',
    url:`${process.env.VUE_APP_API_URL}/watchlists/watched-securities`,
    headers: {
      'Authorization': `Bearer ${store.getters.getAccessToken}`
    },
    data: {
      'symbol': orderForm.get('symbol'),
      'exchange': orderForm.get('exchange')
    }
  }).then(() => {
    store.dispatch('removeFromWatchlist', orderForm)
  }, error => {
    console.error(error);
    if (error.response.status == 401) {
      logout()
    }
  })
}