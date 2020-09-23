<template>
  <div id="owned-stocks-table">
    <h2>Owned Stocks</h2>
    <table>
      <tr>
        <th>Stock Symbol</th>
        <th>Purchase Price</th>
        <th>Quantity</th>
      </tr>
      <tr v-for="stock in stocksOwned" :key='stock.symbol'>
        <td>{{stock.symbol}}</td>
        <td>{{stock.price}}</td>
        <td>{{stock.quantity}}</td>
        <td><button @click='incrementStock(stock)'>Buy</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'StockOwned',
    data() {
      return{
      }
    },
    mounted() {
      this.$store.dispatch('getOwnedStocks')
    },
    computed: {
        ...mapGetters({stocksOwned:'displayOwnedStocks'})
    },
    methods: {
      incrementStock(stock) {
        return this.$store.dispatch('purchase', stock)
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
