import axios from "axios";
import store from '../store/store.js'
import { logout } from '../api/UsersApi.js'


export function getOwnedStocks() {
  axios({
    method: 'GET',
    url: `${process.env.VUE_APP_API_URL}/trades/owned-securities`,
    headers: {
      'Authorization': `Bearer ${store.getters.getAccessToken}`
    }
  }).then(result => {
    store.dispatch('getOwnedStocks', result.data)
  }, error => {
    console.error(error);
    if (error.response.status == 401) {
      logout()
    }
  })
}


export function buySecurity(orderForm){
  return new Promise( (resolve, reject) => {
    axios({
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
    }).then(() => {
      store.dispatch('addOwnedSecurity', orderForm) 
      resolve()
    }, error => {
      console.error(error);
      if (error.response.status == 401) {
        logout()
      }
      reject()
    })
  })
}

export function sellSecurity(orderForm){
  return new Promise((resolve, reject) => {
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
      }
    ).then(() => {
      store.dispatch('removeOwnedSecurity', orderForm)
      resolve()
    }, error => {
      console.error(error);
      if (error.response.status == 401) {
        logout()
      }
      reject()
    })
  })
}