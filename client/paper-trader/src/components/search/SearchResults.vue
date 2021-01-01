<template>
  <div id="search-results">
    <a-table :columns='columns' :data-source="getSearchResults" rowKey='symbol'>
      <span slot="price" slot-scope="price">${{ price.toFixed(2) }}</span>
      <span slot="actions" slot-scope="securityInfo">
        <a-button type="primary" @click="placeBuyOrder(securityInfo)">Buy</a-button>
        <a-divider type="vertical" />
        <a-button @click='addToWatchlist(securityInfo)'>Add to watchlist</a-button>
      </span>
    </a-table>
    <a-modal
      :visible='modalVisible'
      @ok='confirmOrder()'
      @cancel='closeQuantitySelector()'
    >
      <quantity-selector 
        :ownedQuantity='ownedQuantity'
        @changeOrderQuantity='changeOrderQuantity($event)'
      >
      </quantity-selector>
    </a-modal>
  </div>
</template>

<script>
  import QuantitySelector from '../modal/QuantitySelector.vue'
  import { mapGetters } from 'vuex'
  import { addToWatchlist } from '../../api/WatchlistsApi.js'
  import { buySecurity, sellSecurity } from '../../api/TradesApi.js'

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
      scopedSlots: { customRender: 'price' }

    },
    {
      title: 'Actions',
      key: 'actions',
      width: 250,
      scopedSlots: { customRender: 'actions' }
    }
  ]
  export default {
    
    name: 'SearchResults',
    components: {
      QuantitySelector
    },

    props: {
      firstPage: Number
    },

    data() {
      return{
        modalVisible: false,
        modalTitle: '',
        ownedQuantity: 0,
        orderType: '',
        columns,
        orderForm: new FormData()
      }
    },

    computed: {
      ...mapGetters(['getSearchResults', 'getAccessToken'])
    },

    methods: {
     placeBuyOrder(securityInfo) {
        this.orderForm.set('quantity', 1)
        this.orderForm.set('symbol', securityInfo['symbol'])
        this.orderForm.set('price', securityInfo['price'])
        this.orderForm.set('exchange', securityInfo['exchange'])
        this.ownedQuantity = securityInfo['quantity']
        this.orderType = 'buy'
        this.openQuantitySelector()
      },

      placeSellOrder(securityInfo) {
        this.orderForm.set('quantity', 1)
        this.orderForm.set('symbol', securityInfo['symbol'])
        this.orderForm.set('price', securityInfo['price'])
        this.orderForm.set('exchange', securityInfo['exchange'])
        this.ownedQuantity = securityInfo['quantity']
        this.orderType = 'sell'
        this.openQuantitySelector()
      },

      confirmOrder() {
        if (this.orderType == 'buy') {
          buySecurity(this.orderForm)
        } else if (this.orderType == 'sell') {
          sellSecurity(this.orderForm)
        }
        this.closeQuantitySelector()
      },

      openQuantitySelector(){
        this.modalVisible = true
      },

      closeQuantitySelector(){
        this.modalVisible = false
      },

      addToWatchlist(securityInfo) {
        addToWatchlist(this.getAccessToken, securityInfo['symbol'], securityInfo['price'], securityInfo['exchange'])
      },

      changeOrderQuantity(event) {
        this.orderForm.set('quantity', event)
      }
    },
  }
</script>
