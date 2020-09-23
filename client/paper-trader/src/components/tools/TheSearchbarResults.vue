<template>
  <div id="search-results">
    <h2>Search Results</h2>
      <table>
        <tr>
          <th>Stock Symbol</th>
          <th>Company Name</th>
          <th>Exchange</th>
          <th>Price</th>
        </tr>
        <tr v-for="stock in results" :key=stock.symbol>
          <td>{{stock.symbol}}</td>
          <td>{{stock.name}}</td>
          <td>{{stock.exchange}}</td>
          <td>${{stock.price}}</td>
          <td><button @click='purchaseStock(stock)'>Buy</button></td>
          <td><button @click='addToWatchlist(stock)'>Add to watchlist</button></td>
      </tr>
    </table>
  </div>
</template>

<script>


export default {
  name: 'TheSearchbarResults',
  props: {
    results: Array
  },

  methods: {
    purchaseStock(stock) {
      return this.$store.dispatch('purchase', stock)
    },

    addToWatchlist(stock) {
      return this.$store.dispatch('addToWatchlist', stock)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
