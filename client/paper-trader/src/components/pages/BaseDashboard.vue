<template>
  <div id='dashboard' class='grid-container'>
    <div class='grid-item'><the-searchbar></the-searchbar></div>
    <div class='grid-item'><stock-owned></stock-owned></div>
    <div class='grid-item'><stock-watchlist></stock-watchlist></div>
  </div>
</template>

<script>
import StockWatchlist from '../lists/StockWatchlist.vue'
import StockOwned from '../lists/StockOwned.vue'
import TheSearchbar from '../tools/TheSearchbar.vue'

export default {
  name: 'BaseDashboard',
  components: {
    StockWatchlist,
    StockOwned,
    TheSearchbar
  },
  props: {
        
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid-container {
  display:grid;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
