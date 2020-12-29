<template>
  <div id="search-results">
    <a-table :columns='columns' :data-source="getSearchResults" rowKey='symbol'>
      <span slot="actions" slot-scope="securityInfo">
        <a-button type="primary" @click="buyStock(securityInfo)">Buy</a-button>
        <a-divider type="vertical" />
        <a-button @click='addToWatchlist(securityInfo)'>Add to watchlist</a-button>
      </span>
    </a-table>
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

  const columns = [
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: 'Company Name',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Exchange',
      dataIndex: 'exchange',
      key: 'exchange'
    },
    {
      title: 'Price',
      key: 'price',
      dataIndex: 'price',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 250,
      scopedSlots: { customRender: 'actions' }
    }
  ]
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
        ownedQuantity: 0,
        action: String,
        columns
      }
    },

    computed: {
      ...mapGetters(['getSearchResults', 'getAccessToken'])
    },

    methods: {
      buyStock(securityInfo) {
        this.stockToPass = securityInfo['symbol']
        this.priceToPass = securityInfo['price']
        this.exchangeNameToPass = securityInfo['exchange']
        this.action = 'buy'
        this.openQuantitySelector()
      },

      addToWatchlist(securityInfo) {
        addToWatchlist(this.getAccessToken, securityInfo['symbol'], securityInfo['price'], securityInfo['exchange'])
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
