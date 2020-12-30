import axios from "axios";
import store from '../store/store.js'

export function searchForStock(searchQuery){
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET', 
      url: `${process.env.VUE_APP_API_URL}/securities/search`,
      params: {q: searchQuery}
      }).then(result => {
        store.dispatch('getSearchResults', result.data)
        resolve()
    }, error => {
      console.error(error);
      reject(error)
    })
  })
}

export function buySecurity(orderForm){
  axios({
    method: 'POST',
    url: `${process.env.VUE_APP_API_URL}/securities/buy`,
    data: {
        'token': store.getters.getAccessToken,
        'symbol': orderForm.get('symbol'),
        'exchange': orderForm.get('exchange'),
        'quantity': orderForm.get('quantity'),
        'price': orderForm.get('price')
      }
    }).then(() => {
    store.dispatch('buySecurity', {symbol: orderForm.get('symbol'), price: orderForm.get('price'), quantity: orderForm.get('quantity'), exchange: orderForm.get('exchange')}) }, error => {
    console.error(error);
  })
}

export function sellSecurity(orderForm){
  axios({
    method: 'POST',
    url: `${process.env.VUE_APP_API_URL}/securities/sell`,
    data: {
        'token': store.getters.getAccessToken,
        'symbol': orderForm.get('symbol'),
        'exchange': orderForm.get('exchange'),
        'quantity': orderForm.get('quantity'),
        'price': orderForm.get('price')
      }
    }
  ).then(() => {
    store.dispatch('sellSecurity', {symbol: orderForm.get('symbol'), price: orderForm.get('price'), sellQuantity: orderForm.get('quantity'), exchange: orderForm.get('exchange')})  }, error => {
    console.error(error);
  })
}