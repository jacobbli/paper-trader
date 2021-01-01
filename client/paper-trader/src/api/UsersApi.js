import axios from "axios";
import router from "../router";
import store from '../store/store.js'


export function login(login_form) {
    axios({
      method: "POST", 
      url: `${process.env.VUE_APP_API_URL}/users/token`,
      data: login_form,
      headers: {'Content-Type': 'multipart/form-data' }
    }).then(result => {
      store.dispatch('login', result.data).then(() =>
        router.push('/dashboard')
      )
    }, error => {
      console.error(error);
    })
  }


export function isAuthenticated() {
  return new Promise( (resolve, reject) => {
    if (store.getters.getAccessToken !== null) {
      axios({
        method: 'GET',
        url:`${process.env.VUE_APP_API_URL}/users/authenticated`,
        headers: {
          'Authorization': `Bearer ${store.getters.getAccessToken}`
        }
      }).then(result => {
        store.dispatch('authenticate', result.data);
        resolve();
      },
      () => {
        store.dispatch('logout');
        reject();
      })
    } else {
      store.dispatch('logout');
      reject();
    }
  })
}


export function logout() {
  store.dispatch('logout').then(() =>
    router.push('/login')
  )
}