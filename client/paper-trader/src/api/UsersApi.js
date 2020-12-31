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
      store.dispatch('setCurrentUser', result.data).then(() =>
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
        method: 'POST',
        url:`${process.env.VUE_APP_API_URL}/users/authenticated`,
        data: {
          'access_token': store.getters.getAccessToken,
          'token_type': 'bearer'
        }
      }).then(result => {
        store.dispatch('setCurrentUser', result.data);
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