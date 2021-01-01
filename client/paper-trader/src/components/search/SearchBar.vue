<template>
    <div class='search'>
      <a-input-search
        placeholder="Enter a ticker symbol"
        enter-button="Search"
        size="large"
        style="width: 500px;"
        @search="search"
      />
    <a-modal 
      :visible="resultsVisible"
      :title='this.modalTitle'
      @ok='closeSearchResults'
      @cancel='closeSearchResults'
      :footer='null'
      width='1000px'>
      <search-results></search-results>
    </a-modal>
    </div>
</template>

<script>
  import SearchResults from './SearchResults.vue'
  import { getSearchResults } from '../../api/SearchesApi.js'
  export default {
    name: 'SearchBar',
    components:{
        SearchResults
    },

    data() {
      return {
        resultsVisible: false,
        modalTitle: ''
      }
    },

    methods: {
      search(value) {
        getSearchResults(value).then(() => {
          this.modalTitle = `Search Results for "${ value }":`
          this.resultsVisible = true
        })
      },
      closeSearchResults() {
        this.resultsVisible = false;
      }
    },
  }
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
