<template>
  <div id="owned-stocks-table" >
    <a-table :columns='columns' :data-source='getOwnedSecurities' rowKey='symbol'>
      <span slot="avg-price" slot-scope="price">{{ price.toFixed(2)}} </span>
      <span slot="actions" slot-scope="stockInfo">
        <a-button type="primary" @click="buyStock(stockInfo)">Buy</a-button>
        <a-divider type="vertical" />
        <a-button @click='sellStock(stockInfo)'>Sell</a-button>
      </span>
    </a-table>
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
  import { getOwnedStocks } from '../../api/UsersApi.js'

  const columns = [
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: 'Average Price',
      dataIndex: 'avg_price',
      key: 'averagePrice',
      scopedSlots: { customRender: 'avg-price' }
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: 'Exchange',
      dataIndex: 'exchange',
      key: 'exchange'
    },
    {
      title: 'Actions',
      key: 'actions',
      scopedSlots: { customRender: 'actions' }
    }
  ]
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
        action: String,
        columns
      }
    },

    mounted() {
      getOwnedStocks(this.getAccessToken)
    },

    computed: {
        ...mapGetters(['getOwnedSecurities', 'getAccessToken', 'isLoggedIn']),
    },
    
    methods: {
      buyStock(stockInfo) {
        this.stockToPass = stockInfo['symbol']
        this.priceToPass = stockInfo['avg_price']
        this.exchangeNameToPass = stockInfo['exchange']
        this.action = 'buy'
        this.openQuantitySelector()
      },

      sellStock(stockInfo) {
        this.stockToPass = stockInfo['symbol']
        this.priceToPass = stockInfo['avg_price']
        this.ownedQuantity = stockInfo['quantity']
        this.exchangeNameToPass = stockInfo['exchange']
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
