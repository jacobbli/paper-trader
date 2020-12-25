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
  axios({
    method: 'POST',
    url:`${process.env.VUE_APP_API_URL}/users/authenticated`,
    data: {
      'access_token': store.getters.accessToken,
      'token_type': 'bearer'
    }
  }).then(result => {
    return result
  })
}

export function logout() {
  store.dispatch('logout').then(() =>
    router.push('/')
  )
}