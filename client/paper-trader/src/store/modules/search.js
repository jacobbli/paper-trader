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
      console.log(searchResults)
      state.searchResults = searchResults
    },
  },
  
  actions: {
    getSearchResults(context, searchResults){
      context.commit('getSearchResults', searchResults)
    },
  }
};