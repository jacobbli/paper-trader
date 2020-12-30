<template>
  <div id='dashboard' class='grid-container'>
    <a-row :gutter="[16,16]">
      <a-col :span="16">
        <a-card title='My Portfolio'>
          <stock-owned></stock-owned>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title='My Watchlist'>
          <stock-watchlist></stock-watchlist>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import StockWatchlist from '../components/lists/StockWatchlist.vue'
import StockOwned from '../components/lists/StockOwned.vue'

export default {
  name: 'Dashboard',
  components: {
    StockWatchlist,
    StockOwned,
  },
  props: {
        
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
