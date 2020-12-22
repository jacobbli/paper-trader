<template>
  <div id="search-results" v-if='showResults'>
    <h2>Search Results</h2>
      <table>
        <tr>
          <th>Stock Symbol</th>
          <th>Company Name</th>
          <th>Exchange</th>
          <th>Price</th>
        </tr>
        <tr v-for="stock in resultsToDisplay" :key="stock[0]">
          <td>{{stock[0]}}</td>
          <td>{{stock[1]}}</td>
          <td>{{stock[3]}}</td>
          <td>${{stock[2]}}</td>
          <td><a-button type="primary" @click='buyStock(stock[0], stock[2], stock[3])'>Buy</a-button></td>
          <td><a-button @click='addToWatchlist(stock[0], stock[2], stock[3] )'>Add to watchlist</a-button></td>
      </tr>
    </table>
    <footer class='page-number'>
      <button 
        class='prev-page'
        v-if='showPreviousPageButton'
        @click='currentPage--'
      >
      &lt;
      </button>
      {{currentPage + 1}} of {{totalPages}}
      <button 
        class='next-page'
        v-if='showNextPageButton'
        :ownedQuantity="ownedQuantity"
        :action="action"      
        @click='currentPage++'
      >
      &gt;
      </button>
    </footer>
    <quantity-selector 
      style="z-index: 100"
      v-if=showQuantitySelector
      :stock=stockToPass
      :price="priceToPass"
      :exchangeName=exchangeNameToPass
      :action="action"
      @close=closeQuantitySelector
    ></quantity-selector>
  </div>
</template>

<script>
  import QuantitySelector from '../modal/QuantitySelector.vue'
  import { mapGetters } from 'vuex'
  import { addToWatchlist } from '../../api/WatchlistApi.js'

  export default {
    
    name: 'TheSearchbarResults',
    components: {
      QuantitySelector
    },

    props: {
      firstPage: Number
    },

    data() {
      return{
        showQuantitySelector: false,
        stockToPass: String,
        priceToPass: Number,
        exchangeNameToPass: String,
        resultsPerPage: 5,
        currentPage: this.firstPage,
        ownedQuantity: 0,
        action: String
      }
    },

    computed: {
      ...mapGetters({allResults:'displayResults'}),
      ...mapGetters(['accessToken']),

      dividedResults: function() {
        var array = []
        for (var i = 0; i < this.allResults.length; i+=5) {
          array.push(this.allResults.slice(i,i+5))
        }
        return array
      },

      totalPages: function() {
        return this.dividedResults.length
      },

      resultsToDisplay: function() {
        return (this.dividedResults)[this.currentPage]
      },

      showPreviousPageButton: function() {
        if (this.currentPage === 0){
          return false;
        } else {
          return true;
        }
      },
      showNextPageButton: function() {
        if (this.currentPage === this.totalPages-1){
          return false;
        } else {
          return true;
        }
      },

      showResults: function() {
        return this.allResults.length > 0
      }
    },

    methods: {
      buyStock(stock, price, exchangeName) {
        this.stockToPass = stock
        this.priceToPass = price
        this.exchangeNameToPass = exchangeName
        this.action = 'buy'
        this.openQuantitySelector()
      },

      addToWatchlist(security, price, exchangeName) {
        addToWatchlist(this.accessToken, security, price, exchangeName)
      },

      openQuantitySelector() {
        this.showQuantitySelector = true
      },

      closeQuantitySelector() {
        this.showQuantitySelector = false
      },
    },

    watch: {
      allResults: function () {
        this.currentPage = 0;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-number {
  text-align: center;
  padding-top: 1em;
}
</style>
