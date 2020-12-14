export default {
  state: {
    searchResults: [],
  },
  
  getters: {
    displayResults(state) {
      return state.searchResults
    }
  },
  
  mutations: {
    getSearchResults(state, searchResults){
      state.searchResults = searchResults
    },
  },
  
  actions: {
    getSearchResults(context, searchResults){
      context.commit('getSearchResults', searchResults)
    },
  }
};