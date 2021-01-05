import axios from "axios";
import store from '../store/store.js'
import { forceLogout, requestTokens } from '../api/UsersApi.js'


export function getOwnedStocks() {
  axios({
    method: 'GET',
    url: `${process.env.VUE_APP_API_URL}/trades/owned-securities`,
    headers: {
      'Authorization': `Bearer ${store.getters.getAccessToken}`
    }
  }).then(
    result => {
      store.dispatch('getOwnedStocks', result.data)
    }, 
    error => {
      if (error.response.status == 401) {
        requestTokens()
        .then(
          () => {
            axios({
              method: 'GET',
              url: `${process.env.VUE_APP_API_URL}/trades/owned-securities`,
              headers: {
                'Authorization': `Bearer ${store.getters.getAccessToken}`
              }
            }).then(
              result=> {
                store.dispatch('getOwnedStocks', result.data)
              },
              () => forceLogout()
            )
          }, 
          error => {
            if (error.response.status == 401) {
              forceLogout()
            }
          }
        )
      } else {
        forceLogout()
      }
    }
  )
}


export function buySecurity(orderForm){
  return new Promise((resolve, reject) => {
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
    }).then(
      () => {
        store.dispatch('addOwnedSecurity', orderForm) 
        return resolve('Order successful')
      },
      error => {
        if (error.response.status == 401) {
          requestTokens()
          .then(
            () => {
              axios({
                method: 'POST',
                url: `${process.env.VUE_APP_API_URL}/trades/owned-securities`,
                headers: {
                  'Authorization': `Bearer ${store.getters.getAccessToken}`
                }
              }).then(
                result=> {
                  store.dispatch('addOwnedSecurity', result.data)
                  return resolve('Order successful')
                },
                () => {
                  forceLogout()
                  return reject('User is not authenticated')
                }
              )
            }, 
            error => {
              if (error.response.status == 401) {
                forceLogout()
                return reject('User is not authenticated')
              }
            }
          )
        } else {
          forceLogout()
          return reject('Order failed')
        }
      }
    )
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
    ).then(
      () => {
        store.dispatch('removeOwnedSecurity', orderForm)
        resolve()
      }, 
      error => {
        if (error.response.status == 401) {
          requestTokens()
          .then(
            () => {
              axios({
                method: 'DELETE',
                url: `${process.env.VUE_APP_API_URL}/trades/owned-securities`,
                headers: {
                  'Authorization': `Bearer ${store.getters.getAccessToken}`
                }
              }).then(
                result=> {
                  store.dispatch('removeOwnedSecurity', result.data)
                  return resolve('Order successful')
                },
                () => {
                  forceLogout()
                  return reject('User is not authenticated')
                }
              )
            }, 
            error => {
              if (error.response.status == 401) {
                forceLogout()
                return reject('User is not authenticated')
              }
            }
          )
        } else {
          forceLogout()
          return reject('Order failed')
        }
      }
    )
  })
}