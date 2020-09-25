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
        <td><button @click='buyStock(stock)'>Buy</button></td>
        <td><button @click='removeFromWatchlist(stock)'>Remove from watchlist</button></td>
      </tr>
    </table>
    <quantity-selector 
      v-if=showQuantitySelector
      :stock=stockToPass
      @close=closeQuantitySelector
    ></quantity-selector>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import QuantitySelector from '../modal/QuantitySelector.vue'
  import { getWatchlist } from '../../api/Api.js'

  export default {
    name: 'StockWatchlist',
    components: {
      QuantitySelector
    },

    data() {
      return{
        showQuantitySelector: false,
        stockToPass: {}
      }
    },

    mounted() {
        getWatchlist()
    },

    computed: {
        ...mapGetters({watchlist:'displayWatchlist'})
    },

    methods: {
      buyStock(stock) {
        this.stockToPass = stock
        this.openQuantitySelector()
      },

      removeFromWatchlist(stock) {
        return this.$store.dispatch('removeFromWatchlist', stock)
      },
      
      openQuantitySelector(){
        this.showQuantitySelector = true
      },

      closeQuantitySelector(){
        this.showQuantitySelector = false
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
