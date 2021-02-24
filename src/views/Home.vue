<template>
  <div class='main grid-container'>
    <a-layout class='main-layout'>
        <a-layout-header class='header'>
          <a-row>
            <a-col :span="5">
              <a-avatar v-if='isLoggedIn' size='large' style='backgroundColor:#1890ff'>
                {{ this.getFirstName[0] + this.getLastName[0] }}
              </a-avatar>
              <span style='color:white;'>
                You currently have: ${{ this.getFunds }}
              </span>
            </a-col>
            <a-col :span="8" :offset='3'>
              <div class="searchbar">
                <search-bar></search-bar>
              </div>
            </a-col>
            <a-col :span="2" :offset='6'>
              <a-menu
                theme="dark"
                mode="horizontal"
                :default-selected-keys="['1']"
              >
                <a-menu-item key="1">
                  <a @click='logout()'>Logout</a>
                </a-menu-item>
              </a-menu>
            </a-col>
          </a-row>
        </a-layout-header>
      <a-layout>
        <a-layout-sider class='sidebar' width="150">
          <a-menu
            mode="inline"
            :default-selected-keys="['1']"
            :default-open-keys="['sub1']"
            :style="{ height: '100%', borderRight: 0 }"
          >
            <a-menu-item key="1">
              <router-link to="/">Dashboard</router-link>
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout-content>
          <router-view/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { logout } from '../api/UsersApi.js'
  import SearchBar from '../components/search/SearchBar.vue'

  export default {
    name: 'Home',
    components: {
      SearchBar
    },

    computed: {
      ...mapGetters(['isLoggedIn', 'getFirstName', 'getLastName', 'getFunds'])
    },

    methods: {
      logout() {
        logout()
      }
    }
  }
</script>

<style scoped>
/* .main{
  height: inherit;
} */

.main-layout{
  min-height: 100vh
}
</style>