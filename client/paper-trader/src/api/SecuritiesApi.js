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

export function buySecurity(token, security, price, quantity, exchangeName){
  axios({
    method: 'POST',
    url: `${process.env.VUE_APP_API_URL}/securities/buy`,
    data: {
        'token': token,
        'symbol': security,
        'exchange': exchangeName,
        'quantity': quantity,
        'price': price
      }
    }).then(() => {
    store.dispatch('buySecurity', {symbol: security, price: price, quantity: quantity, exchange: exchangeName}) }, error => {
    console.error(error);
  })
}

export function sellSecurity(token, security, price, sellQuantity, exchangeName){
  axios({
    method: 'POST',
    url: `${process.env.VUE_APP_API_URL}/securities/sell`,
    data: {
        'token': token,
        'symbol': security,
        'quantity': sellQuantity,
        'price': price,
        'exchange': exchangeName
      }
    }
  ).then(() => {
    store.dispatch('sellSecurity', {symbol: security, price: price, sellQuantity: sellQuantity, exchange: exchangeName})  }, error => {
    console.error(error);
  })
}