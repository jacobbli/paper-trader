import Vuex from 'vuex'
import Vue from 'vue'
import watchlist from './modules/watchlist'
import owned from './modules/owned'
import search from './modules/search'
import users from './modules/users'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    watchlist,
    owned,
    search,
    users
  },
});