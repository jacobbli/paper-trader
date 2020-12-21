import axios from "axios";
import router from "../router";
import store from '../store/store.js'

export function login(login_form) {
    axios({
      method: "POST", 
      url: `${process.env.VUE_APP_API_URL}/users/login`,
      data: login_form,
      headers: {'Content-Type': 'multipart/form-data' }
    }).then(result => {
      router.push('/dashboard')
      store.dispatch('setAccessToken', result.data['access_token'])
    }, error => {
      console.error(error);
    })
  }