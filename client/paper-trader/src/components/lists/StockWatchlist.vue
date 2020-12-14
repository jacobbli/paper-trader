<template>
  <div class="watchlist">
    <h2>Watchlist</h2>
    <table>
      <tr>
        <th>Stock Symbol</th>
        <th>Purchase Price</th>
      </tr>
      <tr v-for="(data, name) in watchlist" :key="name">
        <td>{{name}}</td>
        <td>${{data[0]}}</td>
        <td><a-button type="primary" @click="buyStock(name, data[0], data[1])">Buy</a-button></td>
        <td>
          <a-popconfirm
            title="Remove from watchlist?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="removeFromWatchlist(name, data[1])"
            @cancel="cancel"
          >
            <a-button>Remove from watchlist</a-button>
          </a-popconfirm>
        </td>
      </tr>
    </table>
    <quantity-selector 
      style="z-index: 100"
      v-if=showQuantitySelector
      :stock=stockToPass
      :price=priceToPass
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
  import { getWatchlist, removeSecurity } from '../../api/WatchlistApi.js'

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
        exchangeNameToPass: String,
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
      buyStock(stock, price, exchangeName) {
        this.stockToPass = stock
        this.priceToPass = price
        this.exchangeNameToPass = exchangeName
        this.action = 'buy'
        this.openQuantitySelector()
      },

      removeFromWatchlist(stock, exchangeName) {
        removeSecurity(stock, exchangeName)
      },
      
      openQuantitySelector(){
        this.showQuantitySelector = true
      },

      closeQuantitySelector(){
        this.showQuantitySelector = false
      },

      cancel(e){
        console.log(e)
        return;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
