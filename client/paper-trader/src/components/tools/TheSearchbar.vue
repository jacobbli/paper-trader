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
      v-if="resultsLength"
    >
      <the-searchbar-results :results=searchResults></the-searchbar-results>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import TheSearchbarResults from './TheSearchbarResults.vue'

export default {
  name: 'TheSearchbar',
  components:{
      TheSearchbarResults
  },
  data() {
    return {
      searchQuery: '',
      searchResults: []
    }
  },
  methods: {
    searchForStock(){
      axios({
        method: 'GET', 
        url: `${process.env.VUE_APP_API_URL}search-stocks/${this.searchQuery}`
        }).then(result => {
        this.searchResults=result.data
      }, error => {
        console.error(error);
      })
    }
  },

  computed: {
    resultsLength(){
      return this.searchResults.length > 0
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
