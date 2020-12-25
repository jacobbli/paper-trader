import axios from "axios";
import store from '../store/store.js'

export function searchForStock(searchQuery){
  axios({
    method: 'GET', 
    url: `${process.env.VUE_APP_API_URL}/securities/search`,
    params: {q: searchQuery}
    }).then(result => {
      store.dispatch('getSearchResults', result.data)
  }, error => {
    console.error(error);
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
    store.dispatch('buy', {symbol: security, price: price, quantity: quantity, exchange_name: exchangeName})  }, error => {
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
    store.dispatch('sell', {symbol: security, price: price, sell_quantity: sellQuantity, exchange_name: exchangeName})  }, error => {
    console.error(error);
  })
}