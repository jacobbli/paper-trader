import axios from "axios";
import router from "../router";
import store from '../store/store.js'


export function login(login_form) {
    axios({
      method: "POST", 
      url: `${process.env.VUE_APP_API_URL}/users/token`,
      data: login_form,
      headers: {'Content-Type': 'multipart/form-data' },
      withCredentials: true
    }).then(result => {
      store.dispatch('login', result.data).then(() =>
        router.push('/dashboard')
      )
    }, error => {
      console.error(error);
    })
  }


export function isAuthenticated() {
  return new Promise((resolve, reject) => {
    if (store.getters.getAccessToken !== null) {
      axios({
        method: 'GET',
        url:`${process.env.VUE_APP_API_URL}/users/authenticated`,
        headers: {
          'Authorization': `Bearer ${store.getters.getAccessToken}`
        }
      }).then(
        result => {
          store.dispatch('authenticate', result.data);
          resolve('User is authenticated');
        },
        error => {
          if (error.response.status == 401) {
            requestTokens().then(
              () => {
                axios({
                  method: 'GET',
                  url:`${process.env.VUE_APP_API_URL}/users/authenticated`,
                  headers: {
                    'Authorization': `Bearer ${store.getters.getAccessToken}`
                  }
                }).then(
                  result => {
                    store.dispatch('authenticate', result.data);
                    resolve('User is authenticated');
                  },
                  () => {
                    reject('User is not authenticated')
                  })
              },
              () => {
                reject('User is not authenticated')
              }
            )
          } else {
            reject('User is not authenticated')
          }
        }
      )
    } else {
      requestTokens()
        .then(
          () => {
            axios({
              method: 'GET',
              url:`${process.env.VUE_APP_API_URL}/users/authenticated`,
              withCredentials: true
            }).then(
              () => {
                resolve('User is authenticated');
              },
              () => {
                reject('User is not authenticated');
              }
            )
          },
          () => {
            reject('User is not authenticated')
          }
        )
      }
    }
  )
}


export function logout() {
  store.dispatch('logout').then(() =>
    router.push('/login')
  )
}


export function forceLogout() {
  store.dispatch('logout').then(() =>
    router.push('/login')
  )
}


export function requestTokens() {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST", 
      url: `${process.env.VUE_APP_API_URL}/users/refresh-token`,
      withCredentials: true
    })
      .then(
        result => {
          store.dispatch('login', result.data).then(() => 
            resolve('Obtained new tokens')
          )
        }, 
        () => {
          reject('Authentication failed')
        }
      )
    }
  )
}