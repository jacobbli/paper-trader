<template>
  <div class='search-tool'>
    <div class='searchbar'>
      <a-input-search
        placeholder="Enter a ticker symbol"
        enter-button="Search"
        size="large"
        style="width: 500px;"
        @search="searchForStock"
      />
    </div>
    <div 
      class='search-results'
    >
      <the-searchbar-results :firstPage="0"></the-searchbar-results>
    </div>
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

    methods: {
      searchForStock(value) {
        searchForStock(value)
      }
    },
  }
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
