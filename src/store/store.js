import Vuex from 'vuex'
import Vue from 'vue'
import watchlists from './modules/watchlists'
import owned from './modules/owned'
import search from './modules/search'
import users from './modules/users'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    watchlists,
    owned,
    search,
    users
  },
});