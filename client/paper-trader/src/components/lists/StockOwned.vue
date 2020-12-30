<template>
  <div id="owned-stocks-table" >
    <a-table :columns='columns' :data-source='getOwnedSecurities' rowKey='symbol'>
      <span slot="avg-price" slot-scope="price">{{ price.toFixed(2)}} </span>
      <span slot="actions" slot-scope="stockInfo">
        <a-button type="primary" @click="placeBuyOrder(stockInfo)">Buy</a-button>
        <a-divider type="vertical" />
        <a-button @click='placeSellOrder(stockInfo)'>Sell</a-button>
      </span>
    </a-table>
    <a-modal
      :visible='modalVisible'
      @ok='confirmOrder()'
      @cancel='closeQuantitySelector()'
    >
    <quantity-selector 
      :ownedQuantity='ownedQuantity'
      @changeOrderQuantity='orderQuantity = $event'></quantity-selector>
    </a-modal>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import QuantitySelector from '../modal/QuantitySelector.vue'
  import { getOwnedStocks } from '../../api/UsersApi.js'
  import { buySecurity, sellSecurity } from '../../api/SecuritiesApi.js'

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
        modalVisible: false,
        modalTitle: '',
        ownedQuantity: 0,
        orderQuantity: 1,
        orderType: '',
        columns,
        orderForm: new FormData()
      }
    },

    mounted() {
      getOwnedStocks(this.getAccessToken)
    },

    computed: {
        ...mapGetters(['getOwnedSecurities', 'getAccessToken', 'isLoggedIn']),
    },
    
    methods: {
      placeBuyOrder(stockInfo) {
        this.orderForm.append('symbol', stockInfo['symbol'])
        this.orderForm.append('price', stockInfo['avg_price'])
        this.orderForm.append('exchange', stockInfo['exchange'])
        this.ownedQuantity = stockInfo['quantity']
        this.orderType = 'buy'
        this.openQuantitySelector()
      },

      placeSellOrder(stockInfo) {
        this.orderForm.append('symbol', stockInfo['symbol'])
        this.orderForm.append('price', stockInfo['avg_price'])
        this.orderForm.append('exchange', stockInfo['exchange'])
        this.ownedQuantity = stockInfo['quantity']
        this.orderType = 'sell'
        this.openQuantitySelector()
      },

      confirmOrder() {
        this.orderForm.append('quantity', this.orderQuantity)
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
      }
    }
  }
</script>
