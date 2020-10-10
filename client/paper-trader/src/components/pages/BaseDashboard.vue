<template>
  <div id='dashboard' class='grid-container'>
    <a-row :gutter="[16,16]">
      <a-col :span="12">
        <div class='grid-item3' id='watchlist'><stock-watchlist></stock-watchlist></div>
      </a-col>
      <a-col :span="12">
        <div class='grid-item1' id='searchbar'><the-searchbar></the-searchbar></div>
      </a-col>
    </a-row>
    <a-row :gutter="[16,16]">
      <a-col :span="12">
        <div class='grid-item2' id='owned-stocks'><stock-owned></stock-owned></div>
      </a-col>
    </a-row>
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
</style>
