<template>
  <div id="owned-stocks-table">
    <h2>Owned Stocks</h2>
    <table>
      <tr>
        <th>Stock Symbol</th>
        <th>Purchase Price</th>
        <th>Quantity</th>
      </tr>
      <tr v-for="(data, name) in stocksOwned" :key='name'>
        <td>{{name}}</td>
        <td>${{data[0].toFixed(2)}}</td>
        <td>{{data[1]}}</td>
        <td><a-button type="primary" @click='buyStock(name, data[0], data[2])'>Buy</a-button></td>
        <td><a-button @click='sellStock(name, data[1], data[0], data[2])'>Sell</a-button></td>
      </tr>
    </table>
    <quantity-selector 
      style="z-index: 100"
      v-if=showQuantitySelector
      :stock="stockToPass"
      :price="priceToPass"
      :exchangeName=exchangeNameToPass
      :ownedQuantity="ownedQuantity"
      :action="action"
      @close=closeQuantitySelector
    ></quantity-selector>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import QuantitySelector from '../modal/QuantitySelector.vue'
  import {getOwnedStocks} from '../../api/SecuritiesApi.js'

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
        exchangeNameToPass: String,
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
      buyStock(stock, price, exchangeName) {
        this.stockToPass = stock
        this.priceToPass = price
        this.exchangeNameToPass = exchangeName
        this.action = 'buy'
        this.openQuantitySelector()
      },

      sellStock(stock, ownedQuantity, price, exchangeName) {
        this.stockToPass = stock
        this.priceToPass = price
        this.ownedQuantity = ownedQuantity
        this.exchangeNameToPass = exchangeName
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
