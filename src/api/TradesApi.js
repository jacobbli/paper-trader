import axios from "axios";
import store from '../store/store.js'
import { forceLogout, requestTokens } from '../api/UsersApi.js'


export async function getOwnedStocks() {
  try {
    let response = await axios({
      method: 'GET',
      url: `${process.env.VUE_APP_API_URL}/trades/owned-securities`,
      headers: {
        'Authorization': `Bearer ${store.getters.getAccessToken}`
      }
    })
    store.dispatch('getOwnedStocks', response.data)
    return Promise.resolve('Retrieved owned securities')
  } catch(err) {
    try {
      await requestTokens()
      let response = await axios({
        method: 'GET',
        url: `${process.env.VUE_APP_API_URL}/trades/owned-securities`,
        headers: {
          'Authorization': `Bearer ${store.getters.getAccessToken}`
        }
      })
      store.dispatch('getOwnedStocks', response.data)
      return Promise.resolve('Retrieved owned securities')
    } catch(err) {
      forceLogout()
      return Promise.reject('Failed to retrieve owned securities')
    }
  }
}


export async function buySecurity(orderForm) {
  try {
    await axios({
      method: 'POST',
      url: `${process.env.VUE_APP_API_URL}/trades/owned-securities`,
      headers: {
        'Authorization': `Bearer ${store.getters.getAccessToken}`
      },
      data: {
          'symbol': orderForm.get('symbol'),
          'exchange': orderForm.get('exchange'),
          'quantity': orderForm.get('quantity'),
          'price': orderForm.get('price')
        }
    })
    store.dispatch('addOwnedSecurity', orderForm) 
    return Promise.resolve('Order successful')
  } catch(error) {
    try {
      await requestTokens();
      await axios({
        method: 'POST',
        url: `${process.env.VUE_APP_API_URL}/trades/owned-securities`,
        headers: {
          'Authorization': `Bearer ${store.getters.getAccessToken}`
        }
      })
      store.dispatch('addOwnedSecurity', orderForm)
      return Promise.resolve('Order completed')
    } catch(error) {
      forceLogout()
      return Promise.reject('Order failed')
    }
  }
}


export async function sellSecurity(orderForm) {
  try {
    await axios({
    method: 'DELETE',
    url: `${process.env.VUE_APP_API_URL}/trades/owned-securities`,
    headers: {
      'Authorization': `Bearer ${store.getters.getAccessToken}`
    },
    data: {
        'symbol': orderForm.get('symbol'),
        'exchange': orderForm.get('exchange'),
        'quantity': orderForm.get('quantity'),
        'price': orderForm.get('price')
      }
    })
    store.dispatch('removeOwnedSecurity', orderForm)
    return Promise.resolve('Order completed')
  } catch(error) {
    try {
      await requestTokens()
      axios({
        method: 'DELETE',
        url: `${process.env.VUE_APP_API_URL}/trades/owned-securities`,
        headers: {
          'Authorization': `Bearer ${store.getters.getAccessToken}`
        },
        data: {
          'symbol': orderForm.get('symbol'),
          'exchange': orderForm.get('exchange'),
          'quantity': orderForm.get('quantity'),
          'price': orderForm.get('price')
        }
      })
      store.dispatch('removeOwnedSecurity', orderForm)
      return Promise.resolve('Order completed')
    } catch {
      forceLogout()
      return Promise.reject('Order failed')
    }
  }
}