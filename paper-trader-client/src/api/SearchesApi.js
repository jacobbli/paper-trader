import axios from "axios";
import store from '../store/store.js'

export function getSearchResults(searchQuery){
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET', 
        url: `${process.env.VUE_APP_API_URL}/search/query`,
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