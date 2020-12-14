import Vuex from 'vuex'
import Vue from 'vue'
import watchlist from './modules/watchlist'
import owned from './modules/owned'
import search from './modules/search'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    watchlist,
    owned,
    search,
  },
});