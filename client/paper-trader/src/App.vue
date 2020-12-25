<template>
  <div id="app" class='main grid-container'>
    <a-layout>
      <div class='header' v-if="isLoggedIn">
        <a-layout-header>
          <div class="logo" >
          </div>
          <a-menu
            theme="dark"
            mode="horizontal"
            :default-selected-keys="['1']"
          >
            <a-menu-item key="1">
              <router-link to="/">Home</router-link>
            </a-menu-item>
            <a-menu-item key="2">
              <a @click='logout()'>Logout</a>
            </a-menu-item>
          </a-menu>
        </a-layout-header>
      </div>
      
      <a-layout-content :style="{ padding: '5em' }">
        <a-layout>
          <div class='content'>
            <a-layout-content>
              <router-view/>
            </a-layout-content>
          </div>
        </a-layout>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { logout } from './api/AuthenticationApi.js'

  export default {
    name: 'App',

    computed: {
      ...mapGetters(['isLoggedIn'])
    },

    methods: {
      logout() {
        logout()
      }
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
