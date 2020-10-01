<template>
  <div id="owned-stocks-table">
    <h2>Owned Stocks</h2>
    <table>
      <tr>
        <th>Purchase Price</th>
        <th>Stock Symbol</th>
        <th>Quantity</th>
      </tr>
      <tr v-for="(value, name) in stocksOwned" :key='name'>
        <td>{{name}}</td>
        <td>{{value[0]}}</td>
        <td>{{value[1]}}</td>
        <td><button @click='buyStock(name, value[1])'>Buy</button></td>
        <td><button @click='sellStock(name, value[0], value[1])'>Sell</button></td>
      </tr>
    </table>
    <quantity-selector 
      v-if=showQuantitySelector
      :stock="stockToPass"
      :price="priceToPass"
      :ownedQuantity="ownedQuantity"
      :action="action"
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
        stockToPass: {},
        priceToPass: Number,
        ownedQuantity: 0,
        action: String
      }
    },

    mounted() {
      getOwnedStocks()
    },

    computed: {
        ...mapGetters({stocksOwned:'displayOwnedStocks'})
    },
    
    methods: {
      buyStock(stock, price) {
        this.stockToPass = stock
        this.priceToPass = price
        this.action = 'buy'
        this.openQuantitySelector()
      },

      sellStock(stock, ownedQuantity, price) {
        this.stockToPass = stock
        this.priceToPass = price
        this.ownedQuantity = ownedQuantity
        this.action = 'sell'
        this.openQuantitySelector()
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
