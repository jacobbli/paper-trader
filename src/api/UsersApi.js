import axios from "axios";
import router from "../router";
import store from '../store/store.js'


export async function login(login_form) {
  try {
    let response = await axios({
      method: "POST", 
      url: `${process.env.VUE_APP_API_URL}/users/token`,
      data: login_form,
      headers: {'Content-Type': 'multipart/form-data' },
      withCredentials: true
    })
    await store.dispatch('login', response.data)
    router.push('/dashboard')
    return Promise.resolve('Login successful')
  } catch(err) {
    return Promise.reject('Login failed')
  }
}


export async function isAuthenticated() {
  if (store.getters.getAccessToken !== null) {
    try {
      let response = await axios({
        method: 'GET',
        url:`${process.env.VUE_APP_API_URL}/users/authenticated`,
        headers: {
          'Authorization': `Bearer ${store.getters.getAccessToken}`
        }
      })
      store.dispatch('authenticate', response.data);
      return Promise.resolve('User is authenticated')
    } catch(err) {
      try {
        await requestTokens();
        await axios({
          method: 'GET',
          url:`${process.env.VUE_APP_API_URL}/users/authenticated`,
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${store.getters.getAccessToken}`
          }
        });
        return Promise.resolve('User is authenticated')
      } catch(err) {
        return Promise.reject('User is not authenticated')
      }
    }
  } else {
    try{
      await requestTokens()
      await axios({
        method: 'GET',
        url:`${process.env.VUE_APP_API_URL}/users/authenticated`,
        withCredentials: true
      })
      return Promise.resolve('User is authenticated')
    } catch(err) {
      return Promise.reject('User is not authenticated')
    }
  }
}
  

export async function requestTokens() {
  try{
    let response = await axios({
      method: "POST", 
      url: `${process.env.VUE_APP_API_URL}/users/refresh-token`,
      withCredentials: true
    })
    store.dispatch('login', response.data)
    return Promise.resolve('Refreshed tokens')
  } catch(err) {
    return Promise.reject('Failed to refresh tokens')
  }
}


export function logout() {
  axios({
    method: 'PATCH',
    url:`${process.env.VUE_APP_API_URL}/users/logout`,
    data: {
      'username': store.getters.getUsername
    },
    withCredentials: true
  })
  store.dispatch('logout').then(() =>
    router.push('/login')
  )
}


export function forceLogout() {
  store.dispatch('logout').then(() =>
    router.push('/login')
  )
}
