<template>
  <div id="owned-stocks-table" >
    <a-table :columns='columns' :data-source='getOwnedSecurities' rowKey='symbol'>
      <span slot="price" slot-scope="price">${{ price.toFixed(2) }}</span>
      <span slot="actions" slot-scope="securityInfo">
        <a-button type="primary" @click="placeBuyOrder(securityInfo)">Buy</a-button>
        <a-divider type="vertical" />
        <a-button @click='placeSellOrder(securityInfo)'>Sell</a-button>
      </span>
    </a-table>
    <a-modal
      :visible='modalVisible'
      @ok='confirmOrder()'
      @cancel='closeQuantitySelector()'
      :destroyOnClose='true'
    >
    <quantity-selector 
      :ownedQuantity='ownedQuantity'
      @changeOrderQuantity='changeOrderQuantity($event)'></quantity-selector>
    </a-modal>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import QuantitySelector from '../modal/QuantitySelector.vue'
  import { getOwnedStocks, buySecurity, sellSecurity } from '../../api/TradesApi.js'

const columns = [
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'Price',
      scopedSlots: { customRender: 'price' }
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
    name: 'OwnedSecurities',
    components: {
      QuantitySelector
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

    mounted() {
      getOwnedStocks(this.getAccessToken)
    },

    computed: {
        ...mapGetters(['getOwnedSecurities', 'getAccessToken', 'isLoggedIn']),
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
      
      changeOrderQuantity(event) {
        this.orderForm.set('quantity', event)
      }
    }
  }
</script>
