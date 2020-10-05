<template>
  <div class='watchlist'>
    <h2>Watchlist</h2>
    <table>
      <tr>
        <th>Stock Symbol</th>
        <th>Purchase Price</th>
      </tr>
      <tr v-for="(value, name) in watchlist" :key='name'>
        <td>{{name}}</td>
        <td>{{value}}</td>
        <td><button @click='buyStock(name, value)'>Buy</button></td>
        <td><button @click='removeFromWatchlist(stock)'>Remove from watchlist</button></td>
      </tr>
    </table>
    <quantity-selector 
      v-if=showQuantitySelector
      :stock=stockToPass
      :price=priceToPass
      :ownedQuantity="ownedQuantity"
      :action="action"      
      @close=closeQuantitySelector
    ></quantity-selector>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import QuantitySelector from '../modal/QuantitySelector.vue'
  import { getWatchlist } from '../../api/StockApi.js'

  export default {
    name: 'StockWatchlist',
    components: {
      QuantitySelector
    },

    data() {
      return{
        showQuantitySelector: false,
        stockToPass: String,
        priceToPass: Number,
        ownedQuantity: 0,
        action: String
      }
    },

    mounted() {
        getWatchlist()
    },

    computed: {
        ...mapGetters({watchlist:'displayWatchlist'})
    },

    methods: {
      buyStock(stock, price) {
        this.stockToPass = stock
        this.priceToPass = price
        this.action = 'buy'
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
