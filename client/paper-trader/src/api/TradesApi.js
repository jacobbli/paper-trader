import axios from "axios";
import store from '../store/store.js'

// Axios only allows request body with POST/PUT requests
export function getOwnedStocks(access_token) {
  axios({
    method: 'POST',
    url: `${process.env.VUE_APP_API_URL}/trades/owned`,
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

export function buySecurity(orderForm){
  return new Promise( (resolve, reject) => {
    axios({
      method: 'POST',
      url: `${process.env.VUE_APP_API_URL}/trades/bought`,
      data: {
          'token': store.getters.getAccessToken,
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
      reject()
    })
  })
}

export function sellSecurity(orderForm){
  return new Promise( (resolve, reject) => {
    axios({
      method: 'POST',
      url: `${process.env.VUE_APP_API_URL}/trades/sold`,
      data: {
          'token': store.getters.getAccessToken,
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
      reject()
    })
  })
}