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
        <tr v-for="stock in resultsToDisplay" :key=stock.symbol>
          <td>{{stock.symbol}}</td>
          <td>{{stock.name}}</td>
          <td>{{stock.exchange}}</td>
          <td>${{stock.price}}</td>
          <td><button @click='buyStock(stock)'>Buy</button></td>
          <td><button @click='addToWatchlist(stock)'>Add to watchlist</button></td>
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
        @click='currentPage++'
      >
      &gt;
      </button>
    </footer>
    <quantity-selector 
      v-if=showQuantitySelector
      :stock=stockToPass
      @close=closeQuantitySelector
    ></quantity-selector>
  </div>
</template>

<script>
  import QuantitySelector from '../modal/QuantitySelector.vue'
  import { mapGetters } from 'vuex'

  export default {
    
    name: 'TheSearchbarResults',
    components: {
      QuantitySelector
    },

    props: {
      results: Array
    },

    data() {
      return{
        showQuantitySelector: false,
        stockToPass: {},
        currentPage: 0,
        resultsPerPage: 5,
      }
    },

    computed: {
      ...mapGetters({allResults:'displayResults'}),

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
        if (this.currentPage === this.totalPages){
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
      buyStock(stock) {
        this.stockToPass = stock
        this.openQuantitySelector()
      },

      addToWatchlist(stock) {
        return this.$store.dispatch('addToWatchlist', stock)
      },

      openQuantitySelector() {
        this.showQuantitySelector = true
      },

      closeQuantitySelector() {
        this.showQuantitySelector = false
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-number {
  text-align: center;
  padding-top: 1em;
}
</style>
