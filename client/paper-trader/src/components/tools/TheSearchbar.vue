<template>
    <div class='search'>
      <a-input-search
        placeholder="Enter a ticker symbol"
        enter-button="Search"
        size="large"
        style="width: 500px;"
        @search="searchForStock"
      />
    <a-modal :visible="resultsVisible" title="Search Results" @ok='closeSearchResults' @cancel='closeSearchResults' width='1000px'>
      <the-searchbar-results></the-searchbar-results>
    </a-modal>
    </div>
</template>

<script>
  import TheSearchbarResults from './TheSearchbarResults.vue'
  import { searchForStock } from '../../api/SecuritiesApi.js'
  export default {
    name: 'TheSearchbar',
    components:{
        TheSearchbarResults
    },

    data() {
      return {
        resultsVisible: false
      }
    },

    methods: {
      searchForStock(value) {
        searchForStock(value).then(() => {
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
