import axios from "axios";
import store from '../store/store.js'
import { forceLogout, requestTokens } from '../api/UsersApi.js'


export async function getWatchlist() {
  try {
    let response = await axios({
      method: 'GET',
      url: `${process.env.VUE_APP_API_URL}/watchlists/watched-securities`,
      headers: {
        'Authorization': `Bearer ${store.getters.getAccessToken}`
      }
    })
    store.dispatch('getWatchlist', response.data)
    return Promise.resolve('Retrieved waitlist')
  } catch(error) {
    try {
      await requestTokens()
      let response = axios({
        method: 'GET',
        url: `${process.env.VUE_APP_API_URL}/watchlists/watched-securities`,
        headers: {
          'Authorization': `Bearer ${store.getters.getAccessToken}`
        }
      })
      store.dispatch('getOwnedStocks', response.data)
      return Promise.resolve('Retrieved waitlist')
    } catch(error) {
      forceLogout()
      return Promise.reject('Failed to retrieve waitlist')
    }
  }
}


export async function addToWatchlist(orderForm){
  try{
    await axios({
      method: 'POST',
      url: `${process.env.VUE_APP_API_URL}/watchlists/watched-securities`,
      headers: {
        'Authorization': `Bearer ${store.getters.getAccessToken}`
      },
      data: {
        'symbol': orderForm.get('symbol'),
        'exchange': orderForm.get('exchange')
      }
    })
    store.dispatch('addToWatchlist', orderForm)
    return Promise.resolve('Added to watchlist successfully')
  } catch(error) {
    try {
      await requestTokens()
      await axios({
        method: 'POST',
        url: `${process.env.VUE_APP_API_URL}/watchlists/watched-securities`,
        headers: {
          'Authorization': `Bearer ${store.getters.getAccessToken}`
        },
        data: {
          'symbol': orderForm.get('symbol'),
          'exchange': orderForm.get('exchange')
        }
      })
      store.dispatch('addToWatchlist', orderForm)
      return Promise.resolve('Added to watchlist successfully')
    } catch(err) {
      forceLogout()
      return Promise.reject('Failed to add to watchlist')
    }
  }
}


export async function removeFromWatchlist(orderForm){
  try {
    await axios({
      method: 'DELETE',
      url:`${process.env.VUE_APP_API_URL}/watchlists/watched-securities`,
      headers: {
        'Authorization': `Bearer ${store.getters.getAccessToken}`
      },
      data: {
        'symbol': orderForm.get('symbol'),
        'exchange': orderForm.get('exchange')
      }
    })
    store.dispatch('removeFromWatchlist', orderForm)
    return Promise.resolve('Remove from watchlist successfully')
  } catch(error) {
    try{
      await requestTokens()
      await axios({
        method: 'DELETE',
        url:`${process.env.VUE_APP_API_URL}/watchlists/watched-securities`,
        headers: {
          'Authorization': `Bearer ${store.getters.getAccessToken}`
        },
        data: {
          'symbol': orderForm.get('symbol'),
          'exchange': orderForm.get('exchange')
        }
      })
      store.dispatch('removeFromWatchlist', orderForm)
      return Promise.resolve('Remove from watchlist successfully')
    } catch(err) {
      forceLogout()
      return Promise.reject('Failed to remove from watchlist')
    }
  }
}