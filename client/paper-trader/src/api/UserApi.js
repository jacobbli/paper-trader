import axios from "axios";
import store from '../store/store.js'

// export function getOwnedStocks() {
//   axios({
//     method: "GET", 
//     url: `${process.env.VUE_APP_API_URL}get-owned-stocks/${process.env.VUE_APP_TEST_USER}`
//   }).then(result => {
//     store.dispatch('getOwnedStocks', result.data)
//   }, error => {
//     console.error(error);
//   })
// }