<template>
<div class='search-tool'>
  <div class='searchbar'>
    <form>
      <label for='stocks'>Enter a company name or ticker symbol:</label><br>
      <input 
        type='text' 
        id='stock' 
        name='stocks' 
        v-model='searchQuery'
      >
      <input 
        type='submit' 
        @click.prevent=searchForStock()
      >
    </form>
    </div>
    <div 
      class='search-results'
    >
      <the-searchbar-results></the-searchbar-results>
    </div>
  </div>
</template>

<script>
  import TheSearchbarResults from './TheSearchbarResults.vue'
  import { searchForStock } from '../../api/Api.js'
  export default {
    name: 'TheSearchbar',
    components:{
        TheSearchbarResults
    },
    data() {
      return {
        searchQuery: '',
      }
    },
    methods: {
      searchForStock() {
          searchForStock(this.searchQuery)
      }
    },
  }
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
