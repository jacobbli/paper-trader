<template>
  <div class='watchlist'>
    <h2>Watchlist</h2>
    <table>
      <tr>
        <th>Stock Symbol</th>
        <th>Purchase Price</th>
      </tr>
      <tr v-for="stock in watchlist" :key=stock.symbol>
        <td>{{stock.symbol}}</td>
        <td>{{stock.price}}</td>
        <td><button @click='purchaseStock(stock)'>Buy</button></td>
        <td><button @click='removeFromWatchlist(stock)'>Remove from watchlist</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'StockWatchlist',
    data() {
      return{
      }
    },
    mounted() {
        this.$store.dispatch('getWatchlist')
    },
    computed: {
        ...mapGetters({watchlist:'displayWatchlist'})
    },
    methods: {
      purchaseStock(stock) {
        return this.$store.dispatch('purchase', stock)
      },

      removeFromWatchlist(stock) {
        return this.$store.dispatch('removeFromWatchlist', stock)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
