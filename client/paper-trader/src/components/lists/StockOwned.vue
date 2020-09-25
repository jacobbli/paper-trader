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
        <td><button @click='buyStock(stock)'>Buy</button></td>
        <td><button @click='sellStock(stock)'>Sell</button></td>
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
  import {getOwnedStocks} from '../../api/Api.js'

  export default {
    name: 'StockOwned',
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
      getOwnedStocks()
    },

    computed: {
        ...mapGetters({stocksOwned:'displayOwnedStocks'})
    },
    
    methods: {
      buyStock(stock) {
        this.stockToPass = stock
        this.openQuantitySelector()
      },

      sellStock(stock) {
        return this.$store.dispatch('sell', stock)
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
