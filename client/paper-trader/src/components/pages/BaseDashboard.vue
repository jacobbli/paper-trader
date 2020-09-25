<template>
  <div id='dashboard' class='grid-container'>
    <div class='grid-item1' id='searchbar'><the-searchbar></the-searchbar></div>
    <div class='grid-item2' id='owned-stocks'><stock-owned></stock-owned></div>
    <div class='grid-item3' id='watchlist'><stock-watchlist></stock-watchlist></div>
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
  background-color: #2196F3;
  grid-gap: 10px;
  padding: 10px;
}

#searchbar {
  max-width:inherit;
  padding: 20px;
  grid-row: 1 / 3;
  grid-column: 2;
  background-color: rgba(255, 255, 255, .8);

}

#owned-stocks {
  padding: 20px;
  grid-row: 1;
  grid-column: 1;
  background-color: rgba(255, 255, 255, .8);

}

#watchlist {
  padding: 20px;
  grid-row: 2;
  grid-column: 1;
  background-color: rgba(255, 255, 255, .8);

} 

</style>
